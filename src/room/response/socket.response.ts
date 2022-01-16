export class SocketResponse<T> {
  type: 'bet' | 'roll';
  data: T;
}
