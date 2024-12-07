import { FirebaseAuth } from './firebase';

export const authMiddleware = (firebaseAuth: FirebaseAuth) => {
  return async (req: any, res: any, next: any) => {
    try {
      const token = req.headers.authorization?.split('Bearer ')[1];
      if (!token) {
        throw new Error('No token provided');
      }

      const decodedToken = await firebaseAuth.verifyToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
};