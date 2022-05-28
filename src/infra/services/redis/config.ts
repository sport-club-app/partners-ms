import redis from "redis"

export const clientRedis = redis.createClient({
  host: process.env.DB_REDIS_HOST,
  port: process.env.DB_REDIS_PORT,
  password: process.env.DB_REDIS_PASSWORD
})

clientRedis.on("error", err => {
  console.log("Error " + err)
})
