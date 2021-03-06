import MigrationsRunner from '../MigrationsRunner';

const migrationType = 'trigger';

// NOTE: the these strings should match exactly the filename
// NOTE 2: The order matters, the first migrations in the array will be executed first
const migrationFileNames = [
  'set-updated-at-to-current-timestamp',
];

const migrationRunnerConfig = {
  migrationFileNames,
  migrationType,
};

MigrationsRunner.run(migrationRunnerConfig);
