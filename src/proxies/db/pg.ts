import { Pool, QueryResult } from 'pg';

type QueryConfig = {
  types?: string[],
  rowMode?: 'array'
};

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

  public async query<T>(queryText: string, queryValues?: T[], queryConfig?: QueryConfig): Promise<object[] | [][]> {
    const result = await this.pool.query({
      text: queryText,
      values: queryValues,
      ...queryConfig,
    });

    return result.rows;
  }
}

export default new Pg();
