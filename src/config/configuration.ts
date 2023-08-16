export interface Configs {
  PORT: number;
  DATABASE_URL: string;
}

export default (): Configs => ({
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL,
});
