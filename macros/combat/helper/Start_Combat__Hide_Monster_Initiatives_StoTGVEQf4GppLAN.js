// metadata-name: Start Combat: Hide Monster Initiatives
// metadata-img: icons/svg/dice-target.svg
// end-metadata
const monsters = game.combat.turns.filter(
  (t) => t.token.disposition == CONST.TOKEN_DISPOSITIONS.HOSTILE
);
const hideUpdates = monsters.map((m) => ({ _id: m.id, hidden: true }));
await game.combat.updateEmbeddedDocuments("Combatant", hideUpdates);