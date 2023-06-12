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
      const connected = await this.client.isConnected();
      return connected;
    } catch (error) {
      return false;
    }
  }

  async nbUsers() {
    await this.client.connect();
    const db = this.client.db(this.database);
    const count = await db.collection('users').countDocuments();
    return count;
  }

  async nbFiles() {
    await this.client.connect();
    const db = this.client.db(this.database);
    const count = await db.collection('files').countDocuments();
    return count;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
