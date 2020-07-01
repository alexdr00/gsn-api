import { Pool } from 'pg';

interface QueryParams {
  types?: string[],
  rowMode?: 'array',
  queryId: string
}

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

  public async query<T>(queryText: string, queryValues: T[], queryParams: QueryParams): Promise<object[] | [][]> {
    const queryConfig = {
      text: queryText,
      values: queryValues,
      ...queryParams,
    };

    try {
      const result = await this.pool.query(queryConfig);

      return result.rows;
    } catch (error) {
      const { queryId } = queryParams;
      error.queryId = queryId;
      throw error;
    }
  }
}

export default new Pg();
