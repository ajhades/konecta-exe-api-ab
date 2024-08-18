const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

const runSeeder = async (script) => {
  try {
    console.log(`Running ${script}...`);
    const { stdout, stderr } = await execPromise(
      `node ./db/seeders/${script}.js`
    );
    if (stderr) {
      console.error(`Error executing ${script}: ${stderr}`);
    } else {
      console.log(`${script} output: ${stdout}`);
    }
  } catch (error) {
    console.error(`Failed to execute ${script}: ${error.message}`);
    throw error;
  }
};

const seed = async () => {
  try {
    await runSeeder('seedRoles');
    await runSeeder('seedUsers');
    await runSeeder('seedEmployees');
    await runSeeder('seedApplications');
    console.log('All seeders completed successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
};

seed();
