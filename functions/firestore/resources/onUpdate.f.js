import { firestore } from 'firebase-functions';
import admin from 'firebase-admin';
import { parse } from 'node-html-parser';

function getImageNamesFromHtml(html) {
  const root = parse(html);
  const imageHTMLElements = root.querySelectorAll('.ql-image');
  const imageUrls = imageHTMLElements.map((item) => item.attributes.src);
  const regex = /https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/la-blueprint-ptv\.appspot\.com\/o\/resources%2F[A-Za-z0-9]+%2Fimages%2F(.*\.jpg)/;
  const imageNames = imageUrls.map((imageUrl) => {
    const match = imageUrl.match(regex);
    return match ? match[1] : [];
  });
  return imageNames;
}

export default firestore
  .document('resources/{resourceId}')
  .onUpdate((change, context) => {
    const { resourceId } = context.params;

    const currBody = change.after.data().body;
    const prevBody = change.before.data().body;

    const currImages = getImageNamesFromHtml(currBody);
    const prevImages = getImageNamesFromHtml(prevBody);

    const deletedImages = prevImages.filter((prevImage) => (
      !currImages.some((currImage) => currImage === prevImage)));

    const bucket = admin.storage().bucket();
    const imagesRemovePromises = deletedImages.map((image) => bucket.file(`resources/${resourceId}/images/${image}`).delete());

    return Promise.all(imagesRemovePromises);
  });
