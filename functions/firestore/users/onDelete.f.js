import { firestore } from 'firebase-functions';

const admin = require('firebase-admin');

export default firestore
  .document('users/{userId}')
  .onDelete((_, context) => {
    const { userId } = context.params;

    return admin.auth().deleteUser(userId);
  });
