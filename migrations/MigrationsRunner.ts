/* eslint-disable import/first */
require('dotenv').config();

import { serializeError } from 'serialize-error';
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
      const hasMigrationBeenExecuted = await MigrationsRunner.checkMigrationHasBeenExecuted(migrationFileName);
      if (hasMigrationBeenExecuted) {
        return;
      }

      const migrationPath = `./types/${migrationType}/${migrationFileName}`;
      const migrationName = `${migrationType}_${migrationFileName}`;

      try {
        await MigrationsRunner.runMigration(migrationPath);
        await MigrationsRunner.markMigrationAsExecuted(migrationName);
        console.log('all good');
      } catch (error) {
        console.log(error);
      }
    });

    // eslint-disable-next-line
    for (const migrate of migrationProcesses) {
      // eslint-disable-next-line
      await migrate();
    }

    console.log('all migrations run');
    process.exit(0);
  }

  private static async init(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS migrations (
        id INT PRIMARY KEY,
        migration_name VARCHAR(255),
        executed_on TIMESTAMP DEFAULT NOW()
      );
    `;

    try {
      await pg.query(query);
    } catch (error) {
      const serializedError = serializeError(error);
      // Logger.error(serializedError);
      console.log(serializedError);
      process.exit(1);
    }
  }

  private static async runMigration(migrationPath: string): Promise<void> {
    try {
      // eslint-disable-next-line
      const Migration = require(migrationPath).default;
      await Migration.run();
    } catch (error) {
      // console.log(error);
      // Logger.warn(`Failed to run: ${migrationPath}`);
      const e = serializeError(error);
      Logger.error(e);
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
      await pg.query(query, values);
    } catch (error) {
      console.log(error);
      // logger.warn(`Failed to mark as executed: ${migrationIdentifier}`);
      // logger.error(error);
      process.exit(1);
    }
  }

  private static async checkMigrationHasBeenExecuted(migrationName: string): Promise<boolean> {
    try {
      const query = `
        SELECT * FROM migrations WHERE migration_name = $1
      `;

      const values = [migrationName];
      const executedMigrations = await pg.query(query, values);
      return executedMigrations.length > 0;
    } catch (error) {
      console.log(error);
      // logger.error(error);
      return process.exit(1);
    }
  }
}

export default MigrationsRunner;
