import { SQL, sql } from 'drizzle-orm';

export const jsonBuildObject = (obj: Record<string, unknown>) =>
  sql`json_build_object(${sql.join(
    Object.entries(obj).map(([key, value]) => sql`'${sql.raw(key)}', ${value}`),
    sql.raw(', ')
  )})`;

export const jsonAgg = (aggSql: SQL, orderBy?: SQL) =>
  sql`json_agg(${sql.join(
    [aggSql, orderBy && sql`ORDER BY ${orderBy}`].filter(Boolean),
    sql.raw(' ')
  )})`;
