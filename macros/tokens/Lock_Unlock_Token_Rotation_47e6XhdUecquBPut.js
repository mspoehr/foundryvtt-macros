// metadata-name: Lock/Unlock Token Rotation
// metadata-img: modules/michaels-macros/icons/lock_rotation.png
// end-metadata
if (canvas.tokens.controlled.length === 0) {
  ui.notifications.warn("Select one or more tokens");
  return;
}

let updateData = canvas.tokens.controlled.map(t => {
  return { _id: t.id, lockRotation: !t.document.lockRotation }
});
canvas.scene.updateEmbeddedDocuments("Token", updateData);