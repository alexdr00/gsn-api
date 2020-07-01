/* eslint-disable import/first */
require('dotenv').config();

import pg from '../src/proxies/db/pg';
import Logger from '../src/lib/Logger';

interface MigrationRunnerConfig {
  migrationFileNames: string[],
  migrationType: string
}

class MigrationsRunner {
  public static async run({ migrationFileNames, migrationType }: MigrationRunnerConfig): Promise<void> {
    await MigrationsRunner.init();

    const migrationProcesses = migrationFileNames.map((migrationFileName: string) => async () => {
      const migrationPath = `./types/${migrationType}/${migrationFileName}`;
      const migrationName = `${migrationType}_${migrationFileName}`;

      const hasMigrationBeenExecuted = await MigrationsRunner.checkMigrationHasBeenExecuted(migrationName);
      if (hasMigrationBeenExecuted) {
        return;
      }

      await MigrationsRunner.runMigration(migrationPath);
      await MigrationsRunner.markMigrationAsExecuted(migrationName);
      Logger.success(`Migration executed successfully: ${migrationName}`);
    });

    // eslint-disable-next-line
    for (const migrate of migrationProcesses) {
      // eslint-disable-next-line
      await migrate();
    }

    Logger.success('All migrations have been executed');
    process.exit(0);
  }

  private static async init(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        migration_name VARCHAR(255),
        executed_on TIMESTAMP DEFAULT NOW()
      );
    `;

    try {
      await pg.query(query, [], { queryId: 'InitMigrations' });
    } catch (error) {
      const detail = 'Failed to create "migrations" table';
      Logger.error(error, detail);
      process.exit(1);
    }
  }

  private static async runMigration(migrationPath: string): Promise<void> {
    try {
      // eslint-disable-next-line
      const Migration = require(migrationPath).default;
      await Migration.run();
    } catch (error) {
      const detail = `Failed to run migration: ${migrationPath}`;
      const debugParams = { migrationPath };
      Logger.error(error, detail, debugParams);
      process.exit(1);
    }
  }

  private static async markMigrationAsExecuted(migrationName: string): Promise<void> {
    const query = `
      INSERT INTO migrations (migration_name)
      VALUES ($1);
    `;

    const values = [migrationName];
    try {
      await pg.query(query, values, { queryId: 'MarkMigrationAsExecuted' });
    } catch (error) {
      const detail = `Failed to mark migration as executed: ${migrationName}`;
      const debugParams = { migrationName };
      Logger.error(error, detail, debugParams);
      process.exit(1);
    }
  }

  private static async checkMigrationHasBeenExecuted(migrationName: string): Promise<boolean> {
    const query = `
      SELECT * FROM migrations WHERE migration_name = $1
    `;

    const values = [migrationName];
    try {
      const executedMigrations = await pg.query(query, values, { queryId: 'CheckMigrationHasBeenExecuted' });
      return executedMigrations.length > 0;
    } catch (error) {
      const detail = `Failed to mark migration as executed: ${migrationName}`;
      const debugParams = { migrationName };
      Logger.error(error, detail, debugParams);
      return process.exit(1);
    }
  }
}

export default MigrationsRunner;
