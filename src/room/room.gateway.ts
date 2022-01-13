import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import envConfig from '../app/envConfig';
import { SocketResponse } from './dto/socket-response.dto';

@WebSocketGateway(Number(envConfig().SOCKET_PORT), {
  cors: { origin: envConfig().FRONTEND_URL, credentials: true },
})
@Injectable()
export class RoomGateway {
  @WebSocketServer()
  server: Server;

  async sendMessage(message: SocketResponse) {
    this.server.sockets.emit('events', { message });
  }
}
