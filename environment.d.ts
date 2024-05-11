export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // neon db url
      DATABASE_URL: string;
    }
  }
}
