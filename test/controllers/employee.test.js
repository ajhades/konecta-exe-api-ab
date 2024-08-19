const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const pool = require('../../db/db');
const User = require('../../models/user'); // Modelo de usuario

let server;
let token;

beforeAll(async () => {
  server = app.listen(process.env.TEST_PORT || 3002); // Usar un puerto de prueba

  // Crear un usuario de prueba o usa uno existente
  const user = await User.createUser({
    username: 'testuser',
    email: 'a@a.co',
    password: 'testpassword',
    role_id: 1, // O cualquier rol que necesites para las pruebas
  });

  // Generar un token JWT para ese usuario
  token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '1h',
    }
  );
});

afterAll(async () => {
  await server.close(); // Asegúrate de cerrar el servidor después de las pruebas
});

describe('Employee API', () => {
  let employeeId;

  test('Create an employee', async () => {
    const response = await request(server)
      .post('/api/v1/employees')
      .set('Authorization', `Bearer ${token}`)
      .send({
        first_name: 'John',
        last_name: 'Doe',
        hire_date: '2020-20-01',
        salary: 500,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    employeeId = response.body.id;
  });

  test('Get an employee by ID', async () => {
    const response = await request(server)
      .get(`/api/v1/employees/${employeeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'John Doe');
  });

  test('Update an employee', async () => {
    const response = await request(server)
      .set('Authorization', `Bearer ${token}`)
      .put(`/api/v1/employees/${employeeId}`)
      .send({
        name: 'Jane Doe',
        position: 'Senior Developer',
        salary: 60000,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Jane Doe');
  });

  test('Delete an employee', async () => {
    const response = await request(server)
      .set('Authorization', `Bearer ${token}`)
      .delete(`/api/v1/employees/${employeeId}`);

    expect(response.status).toBe(204);
  });

  test('Get deleted employee', async () => {
    const response = await request(server).get(
      `/api/v1/employees/${employeeId}`
    );

    expect(response.status).toBe(404);
  });
});
