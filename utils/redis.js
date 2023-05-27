#!/usr/bin/env node

import { createClient } from 'redis';

class RedisClient {
  constructor () {
    this.client = createClient();
    this.clientConnected = true;
    this.client.on('error', (err) => {
      console.log('Redis client error', err);
      this.clientConnected = false;
    });
    this.client.on('connect', () => {
      this.clientConnected = true;
    });
  }
    // Checks if the redis client is connected
    isAlive(){
        return(this.clientConnected);
    }

    // Async function that gets a value based on a key from redis
    async function get(key){
        const value = await client.get(key);
        return(value);
    }

    // Async function that sets a key, value pair
    async function set(key, values, duration){
        await client.set(key, values, 'EX', duration);
    }

    // Async function to delete a key, vlaue pair
    async function del(key){
        await client.del(key);
    }
}


export const redisClient = new RedisClient();
export default redisClient;
