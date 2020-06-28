import { Pool, QueryResult } from 'pg';

class Pg {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.POSTGRES_PORT),
    });
  }

  public query<T>(queryStatement: string, queryProperties: T[]): Promise<QueryResult> {
    return this.pool.query(queryStatement, queryProperties);
  }
}

export default new Pg();
