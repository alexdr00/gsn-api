import MigrationsRunner from '../MigrationsRunner';

const migrationType = 'trigger';

const migrationFileNames = [
  'set-updated-at-to-current-timestamp',
];

const migrationRunnerConfig = {
  migrationFileNames,
  migrationType,
};

MigrationsRunner.run(migrationRunnerConfig);
