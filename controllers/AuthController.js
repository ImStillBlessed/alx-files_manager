const { v4: uuidv4 } = require('uuid');
const redisClient = require('../utils/redis');

class AuthController {
  static async getConnect(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).send('Unauthorized');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'ascii'
    );
    const [email, password] = credentials.split(':');

    if (!email || !password) {
      return res.status(401).send('Unauthorized');
    }
    const token = uuidv4();
    const key = `auth_${token}`;
    await redisClient.set(key, email, 86400);

    return res.status(200).send({ token });
  }

  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    const key = `auth_${token}`;
    const userId = await redisClient.get(key);

    if (!userId) {
      return res.status(401).send('Unauthorized');
    }

    await redisClient.del(key);
    return res.status(204).end();
  }
}

module.exports = AuthController;
