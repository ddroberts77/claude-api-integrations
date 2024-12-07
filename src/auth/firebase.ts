import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

export class FirebaseAuth {
  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }
  }

  async verifyToken(token: string) {
    try {
      const decodedToken = await getAuth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      console.error('Error verifying token:', error);
      throw error;
    }
  }

  async createUser(email: string, password: string) {
    try {
      const user = await getAuth().createUser({
        email,
        password,
        emailVerified: false
      });
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async generateCustomToken(uid: string) {
    try {
      const customToken = await getAuth().createCustomToken(uid);
      return customToken;
    } catch (error) {
      console.error('Error generating custom token:', error);
      throw error;
    }
  }
}