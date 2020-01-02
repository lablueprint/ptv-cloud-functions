import { firestore } from 'firebase-functions';
import admin from 'firebase-admin';

export default firestore
  .document('resources/{resourceId}')
  .onDelete((snap, context) => {
    const { resourceId } = context.params;
    const bucket = admin.storage().bucket();

    return bucket.deleteFiles({
      prefix: `resources/${resourceId}`,
    });
  });
