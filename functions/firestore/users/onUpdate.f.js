import { firestore } from 'firebase-functions';

const admin = require('firebase-admin');

export default firestore
  .document('users/{userId}')
  .onUpdate((change, context) => {
    const { userId } = context.params;
    const currBody = change.after.data();

    admin.auth().updateUser(userId, {
      disabled: currBody.isBanned,
    });

    return null;
  });
