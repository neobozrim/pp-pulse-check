import * as admin from 'firebase-admin';

// Retrieve environment variables with extra safety checks
const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;

// Ensure the private key is properly parsed
const privateKey = privateKeyRaw 
  ? privateKeyRaw.replace(/\\n/g, '\n')
  : undefined;

// Comprehensive logging for debugging
console.log('Firebase Initialization Attempt:', {
  projectId: !!projectId,
  clientEmail: !!clientEmail,
  privateKeyProvided: !!privateKey
});

// If any required credential is missing, throw a detailed error
if (!projectId) {
  console.error('Environment Variables:', {
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  });
  throw new Error('Missing Firebase Project ID. Please check your environment variables.');
}

if (!clientEmail) {
  throw new Error('Missing Firebase Client Email. Please check your environment variables.');
}

if (!privateKey) {
  throw new Error('Missing Firebase Private Key. Please check your environment variables.');
}

// Prepare service account configuration
const serviceAccount = {
  projectId,
  clientEmail,
  privateKey
};

// Initialize Firebase Admin only if not already initialized
if (admin.apps.length === 0) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL || process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    });
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    throw error;
  }
}

// Export Firebase Admin services
export const firebaseAdmin = {
  app: admin.app(),
  auth: admin.auth(),
  database: admin.database(),
  firestore: admin.firestore(),
};

// Also export individual services for convenience
export const adminApp = firebaseAdmin.app;
export const adminAuth = firebaseAdmin.auth;
export const adminDatabase = firebaseAdmin.database;