import { firestore } from 'firebase-functions';
import admin from 'firebase-admin';

export default firestore
  .document('users/{userId}')
  .onUpdate((change, context) => {
    const { userId } = context.params;

    return null;
  });
