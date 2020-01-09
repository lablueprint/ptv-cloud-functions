import { firestore } from 'firebase-functions';
import admin from 'firebase-admin';

export default firestore
  .document('resource_categories/{categoryId}')
  .onUpdate((change, context) => {
    const { categoryId } = context.params;

    const currThumbnail = change.after.data().thumbnail;
    const prevThumbnail = change.before.data().thumbnail;

    // thumbnail used to exist but doesn't anymore, so delete
    if (prevThumbnail && !currThumbnail) {
      const bucket = admin.storage().bucket();
      return bucket.file(`resource_categories/${categoryId}/thumbnail.jpg`).delete();
    }
    return null;
  });
