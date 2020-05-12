import { firestore } from 'firebase-functions';
import admin from 'firebase-admin';

export default firestore
  .document('users/{userId}')
  .onDelete((snap, context) => {
    const { userId } = context.params;
    const bucket = admin.storage().bucket();

    return bucket.deleteFiles({
      prefix: `users/${userId}`,
    });
  });
