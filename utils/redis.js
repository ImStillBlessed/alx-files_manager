const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient({
      host: 'localhost',
      port: 6379,
    });

    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(string_key) {
    return new Promise((resolve, reject) => {
      this.client.get(string_key, (error, reply) => {
        if (error) return reject(error);
        resolve(reply);
      });
    });
  }

  async set(string_key, string_value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(string_key, duration, string_value, (error, reply) => {
        if (error) return reject(error);
        resolve(reply);
      });
    });
  }

  async del(string_key) {
    return new Promise((resolve, reject) => {
      this.client.del(string_key, (error, reply) => {
        if (error) return reject(error);
        resolve(reply);
      });
    });
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
