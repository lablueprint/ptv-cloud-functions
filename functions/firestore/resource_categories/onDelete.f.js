import { firestore } from 'firebase-functions';
import admin from 'firebase-admin';

export default firestore
  .document('resource_categories/{categoryId}')
  .onDelete((snap, context) => {
    const { categoryId } = context.params;
    const bucket = admin.storage().bucket();

    return bucket.deleteFiles({
      prefix: `resource_categories/${categoryId}`,
    });
  });
