// metadata-name: Next Turn
// metadata-img: icons/svg/down.svg
// end-metadata
const combat = game.combats.active;

const currentCombatantId = combat.combatant.actorId; 
const currentRound = combat.round;

while (combat.round === currentRound && combat.combatant.actorId === currentCombatantId) {
  await combat.nextTurn();
}