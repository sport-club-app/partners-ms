
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: "development" | "production"
        APP_PORT?: number
        APP_HOST: string
        DB_ENGINE: "mysql"
        DB_HOST: string
        DB_PORT: number
        DB_USER: string
        DB_DATABASE: string
        DB_PASSWORD: string
        CLIENT_SECRET: string
        AUTH_API_URL: string
        CLIENT_ID: string
        KEYCLOAK_HELM: string
        TOKEN_PARTNER_USER: string
        PARTNER_TOPIC_CONTACT: string
        DB_REDIS_HOST: string
        DB_REDIS_PORT: string
        DB_REDIS_PASSWORD: string
        TIMEZONE: string
      }
    }
  }

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }
