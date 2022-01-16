import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import envConfig from '../app/envConfig';
import { BetResponse } from './response/bet.response';
import { RollResponse } from './response/roll.response';
import { SocketResponse } from './response/socket.response';

@WebSocketGateway(Number(envConfig().SOCKET_PORT), {
  cors: { origin: envConfig().FRONTEND_URL, credentials: true },
})
@Injectable()
export class RoomGateway {
  @WebSocketServer()
  server: Server;

  async sendBet(message: BetResponse) {
    const response: SocketResponse<BetResponse> = {
      type: 'bet',
      data: message,
    };
    this.server.sockets.emit('events', response);
  }

  async sendRoll(message: RollResponse) {
    const response: SocketResponse<RollResponse> = {
      type: 'roll',
      data: message,
    };
    this.server.sockets.emit('events', response);
  }
}
