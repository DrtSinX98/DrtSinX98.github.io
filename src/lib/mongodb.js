import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'vortex';

if (!uri) {
  throw new Error('MONGODB_URI is not set. Add it to .env.local');
}

const options = { maxPoolSize: 10 };

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // Reuse the connection across HMR reloads so dev doesn't exhaust the pool.
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri, options).connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri, options).connect();
}

export default clientPromise;

export async function getDb() {
  const client = await clientPromise;
  return client.db(dbName);
}

export const COLLECTIONS = {
  content: 'content',
  countries: 'countries',
  photos: 'photos',
  messages: 'messages',
  settings: 'settings',
};
