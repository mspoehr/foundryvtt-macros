// metadata-name: Start Combat: Roll NPC Initiatives
// metadata-img: icons/svg/dice-target.svg
// end-metadata
const unrolledCreatures = game.combat.turns.filter((t) => !t.initiative && !t.players.length);
if (!unrolledCreatures.length) return;

const groups = unrolledCreatures.reduce(
  (g, combatant) => ({
    ...g,
    [combatant.actorId]: (g[combatant.actorId] || []).concat(combatant.id),
  }),
  {}
);
console.log(groups)
// Get first Combatant id for each group
const ids = Object.keys(groups).map((key) => groups[key][0]);

const messageOptions = {
  flavor: "Rolling for Initiative! (grouped)",
  rollMode: "gmroll",
};

// Roll initiative for the group leaders only.
await game.combat.rollInitiative(ids, { messageOptions });

// Prepare the others in the group.
const updates = unrolledCreatures.reduce((updates, { id, initiative, actor }) => {
  const group = groups[actor.id];

  if (group.length <= 1 || initiative) return updates;

  // Get initiative from leader of group.
  initiative = game.combat.combatants.get(group[0]).initiative;

  updates.push({ _id: id, initiative });
  return updates;
}, []);

// Batch update all other combatants.
await game.combat.updateEmbeddedDocuments("Combatant", updates);