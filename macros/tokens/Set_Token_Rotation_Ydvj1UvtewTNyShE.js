// metadata-name: Set Token Rotation
// metadata-img: macros/set_rotation.png
// end-metadata
foundry.applications.api.DialogV2.prompt({
  window: { title: "Set token rotation" },
  content: `<label>Enter rotation amount (degrees):</label><input id="rotation" type="number" value="0" autofocus />`,
  label: "Set token rotation",
  ok: {
    callback: (event, button, dialog) => button.form.elements.rotation.valueAsNumber
  },
  submit: (result) => {
    let updateData = canvas.tokens.controlled.map(t => {
      return {_id: t.id, rotation: result}
    });
    canvas.scene.updateEmbeddedDocuments("Token", updateData);
  }
});