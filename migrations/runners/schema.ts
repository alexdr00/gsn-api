import MigrationsRunner from '../MigrationsRunner';

const migrationType = 'schema';

const migrationFileNames = [
  'user',
];

const migrationRunnerConfig = {
  migrationFileNames,
  migrationType,
};

MigrationsRunner.run(migrationRunnerConfig);
