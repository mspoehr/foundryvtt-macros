// metadata-name: Remove Conditions
// metadata-img: macros/remove_all_conditions.png
// end-metadata
if (canvas.tokens.controlled.length === 0) {
  ui.notifications.warn("Select one or more tokens");
  return;
}

(async () => {
  for ( let token of canvas.tokens.controlled ) {
    let effectsToDelete = token.actor.effects.filter(e => e.sourceName === "None")
      .map(e => { return e.id }); // documents api expects array of ids
    await token.actor.deleteEmbeddedDocuments("ActiveEffect", effectsToDelete);
}})();