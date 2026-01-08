// metadata-name: Show Name and Bars to Players
// metadata-img: macros/show_players_name_and_bars.png
// end-metadata
// Update all tokens on the map so that the name shows on hover and the bars always show.
// Display Modes: ALWAYS, CONTROL, HOVER, NONE, OWNER, OWNER_HOVER

const tokens = canvas.tokens.controlled.map(token => {
  return {
    _id: token.id,
    "bar1.attribute": "attributes.hp",
    "displayName": CONST.TOKEN_DISPLAY_MODES.ALWAYS,
    "displayBars": CONST.TOKEN_DISPLAY_MODES.ALWAYS
  };
});

canvas.scene.updateEmbeddedDocuments('Token', tokens)