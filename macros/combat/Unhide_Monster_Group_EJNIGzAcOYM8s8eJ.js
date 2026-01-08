// metadata-name: Unhide Monster Group
// metadata-img: modules/michaels-macros/icons/unhide_group.png
// end-metadata
const currentActorId = game.combat.combatant.actorId;
const updates = game.combat.turns
   .filter((c) => c.actorId == currentActorId)
   .map((c) => ({ _id: c.id, hidden: false }));

await game.combat.updateEmbeddedDocuments("Combatant", updates);