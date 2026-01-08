// metadata-name: Change Disposition
// metadata-img: modules/michaels-macros/icons/set_disposition.png
// end-metadata
new foundry.applications.api.DialogV2({
  window: { title: `Token Disposition Changer` },
  content: `Choose desired disposition`,
  buttons: [
    {
      action: "HOSTILE",
      label: "Hostile"
    },
    {
      action: "NEUTRAL",
      label: "Neutral"
    },
    {
      action: "FRIENDLY",
      label: "Friendly"
    }
  ],
  submit: (action) => {
    const updates = canvas.tokens.controlled.map(t => ({ _id: t.id, disposition: CONST.TOKEN_DISPOSITIONS[action] }));
    canvas.scene.updateEmbeddedDocuments("Token", updates)
  }
}).render(true);