import MigrationsRunner from '../MigrationsRunner';

const migrationType = 'seed';

// NOTE: the these strings should match exactly the filename
// NOTE 2: The order matters, the first migrations in the array will be executed first
const migrationFileNames = [
  'country',
  'set-default-country-to-user',
  'platform',
];

const migrationRunnerConfig = {
  migrationFileNames,
  migrationType,
};

MigrationsRunner.run(migrationRunnerConfig);
