const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.client = new MongoClient(`mongodb://${this.host}:${this.port}`);
  }

  async isAlive() {
    try {
      await this.client.connect();
      return true;
    } catch (error) {
      return false;
    }
  }

  async nbUsers() {
    try {
      await this.client.connect();
      const db = this.client.db(this.database);
      const count = await db.collection('users').countDocuments();
      return count;
    } catch (error) {
      throw error;
    }
  }

  async nbFiles() {
    try {
      await this.client.connect();
      const db = this.client.db(this.database);
      const count = await db.collection('files').countDocuments();
      return count;
    } catch (error) {
      throw error;
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
