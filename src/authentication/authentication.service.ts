import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { join } from 'path';

@Injectable()
export class AuthenticationService {
  private static instance: admin.app.App;

  public static getInstance() {
    if (!AuthenticationService.instance) {
      try {
        const path = join(__dirname, '../../serviceAccountKey.json');
        AuthenticationService.instance = admin.initializeApp({
          credential: admin.credential.cert(path),
        });
      } catch (error) {
        throw error;
      }
    }

    return AuthenticationService.instance;
  }
  async verifyToken(token: string) {
    try {
      const decodedToken = await AuthenticationService.getInstance().auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      return null;
    }
  }
}
