import { ResponseServer } from './responseServer';

export class ApiResponse {
  static send<T>(message: string, data?: T): ResponseServer<T> {
    return data
      ? {
          message,
          data,
        }
      : {
          message,
        };
  }
}
