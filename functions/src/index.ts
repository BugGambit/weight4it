import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

function ensureUserIsAuthenticated(context: functions.https.CallableContext) {
  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.'
    );
  }

  const email = context?.auth?.token.email || null;
  if (!email) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      "The user's email is not found"
    );
  }

  return { email };
}

const regionalFunctions = functions.region('europe-west1');

export const scanForBarcode = regionalFunctions.https.onCall(
  (data, context) => {
    const { email } = ensureUserIsAuthenticated(context);

    return {
      email,
    };
  }
);

// export const helloWorld = functions
//   .region('europe-west1')
//   .https.onRequest((request, response) => {
//     functions.logger.info('Hello logs!', { structuredData: true });
//     response.send('Hello from Firebase!');
//   });
