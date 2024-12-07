export interface FirebaseConfig {
  projectId: string;
  privateKey: string;
  clientEmail: string;
  databaseURL: string;
}

export interface Response {
  id?: string;
  userId?: string;
  prompt: string;
  content: string;
  metadata?: Record<string, any>;
  timestamp?: any;
  updatedAt?: any;
}

export interface QueryOptions {
  userId?: string;
  limit?: number;
  startAfter?: any;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface SearchOptions {
  field?: string;
  operator?: '<' | '<=' | '==' | '>=' | '>';
  value: any;
}
