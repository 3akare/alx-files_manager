const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const AppController = {
  getStatus: async (req, res) => {
    const redisStatus = await redisClient.isAlive();
    const dbStatus = await dbClient.isAlive();
    const status = {
      redis: redisStatus,
      db: dbStatus,
    };
    return res.status(200).json(status);
  },

  getStats: async (req, res) => {
    try {
      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();
      const stats = {
        users: usersCount,
        files: filesCount,
      };
      return res.status(200).json(stats);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = AppController;
