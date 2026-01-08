// metadata-name: Start Combat: Break Initiative Ties
// metadata-img: macros/break_initiative_ties.png
// end-metadata
const combat = game.combats.active;

const monstersNeedingUpdate = Object.values(
  Object.groupBy(combat.combatants, c => c.initiative))
    .filter(
      l => l.length > 1 &&
      l.some(c => c.token.disposition === CONST.TOKEN_DISPOSITIONS.FRIENDLY) &&
      l.some(c => c.token.disposition === CONST.TOKEN_DISPOSITIONS.HOSTILE)
).flat().filter(c => c.token.disposition === CONST.TOKEN_DISPOSITIONS.HOSTILE);

const updates = monstersNeedingUpdate.map(c => ({ _id: c.id, initiative: c.initiative - .1 }));
await game.combat.updateEmbeddedDocuments("Combatant", updates);