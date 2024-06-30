const { v4: uuidv4 } = require('uuid');
const { promises: fsPromises } = require('fs');
const path = require('path');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

const FOLDER_PATH = process.env.FOLDER_PATH || '/tmp/files_manager';

class FilesController {
  static async postUpload(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).send('Unauthorized');
    }

    const { name, type, parentId = 0, isPublic = false, data } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Missing name' });
    }
    if (!type) {
      return res.status(400).json({ error: 'Missing type' });
    }
    if (type !== 'folder' && !data) {
      return res.status(400).json({ error: 'Missing data' });
    }

    const filesCollection = dbClient.db.collection('files');

    if (parentId !== 0) {
      const parentFile = await filesCollection.findOne({
        _id: dbClient.ObjectId(parentId),
      });
      if (!parentFile) {
        return res.status(400).json({ error: 'Parent not found' });
      }
    }

    const newFile = {
      userId,
      name,
      type,
      isPublic,
      parentId: parentId === 0 ? 0 : dbClient.ObjectID(parentId),
    };
    if (type === 'folder') {
      const result = await filesCollection.insertOne(newFile);
      return res.status(201).json(result.ops[0]);
    } else {
      const filePath = path.join(FOLDER_PATH, uuidv4());
      await fsPromises.mkdir(path.dirname(filePath), { recursive: true });
      await fsPromises.writeFile(filePath, Buffer.from(data, 'base64'));

      newFile.localPath = filePath;

      const result = await filesCollection.insertOne(newFile);
      return res.status(201).json(result.ops[0]);
    }
  }
}

module.exports = FilesController;
