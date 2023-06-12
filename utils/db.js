const { MongoClient } = require('mongodb');

class DBclient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.client = new MongoClient(`monogodb://${this.host}:${this.port}`);
    this.client.connect();
  }

  isAlive() {
    return this.client.connected();
  }

  async nbUser() {
    return new Promise((resolve, reject) => {
      this.client.db(this.database).collection('users').countDocuments((error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

  async nbFiles() {
    return new Promise((resolve, reject) => {
      this.client.db(this.database).collection('files').countDocuments()((error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }
}

const dbClient = new DBclient();
module.exports = dbClient;
