import { IoAdapter } from '@nestjs/platform-socket.io';
import { createClient } from 'redis';
import { ServerOptions } from 'socket.io';
import { createAdapter } from 'socket.io-redis';
import envConfig from './app/envConfig';

const pubClient = createClient({ url: envConfig().REDIS_URI });
const subClient = pubClient.duplicate();
const redisAdapter = createAdapter({ pubClient, subClient });

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}
