// metadata-name: Clean Up Actors
// metadata-img: icons/svg/dice-target.svg
// end-metadata
game.actors.forEach((t) => {
  if (!t.folder && t.prototypeToken.disposition == CONST.TOKEN_DISPOSITIONS.HOSTILE) {
    t.delete();
  }
});