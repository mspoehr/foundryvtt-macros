// metadata-name: Start Combat: Set Player Initiatives
// metadata-img: icons/svg/dice-target.svg
// end-metadata
const playerCombatants = game.combats.active.turns.filter(c => c.players.length > 0 && c.initiative === null);

const getPlayerFormInput = (combatant) => {
  return `
   <div class="form-group">
    <label>${combatant.name}</label>
    <input type='number' name='${combatant.id}' autofocus placeholder="Unchanged"></input>
  </div>`
}

await foundry.applications.api.DialogV2.wait({
  window: { title: "Set Player Initiatives" },
  content: playerCombatants.map(combatant => getPlayerFormInput(combatant)).join(""),
  rejectClose: false,
  buttons: [{
    action: "apply",
    label: "Set Player Initiatives",
    default: true,
    callback: (event, button, dialog) => button.form.elements
  }],
  submit: async result => {
    const updates = playerCombatants
      .map(c => ({ _id: c.id, initiative: result[c.id].value }))
      .filter(update => update.initiative !== "");
    await game.combat.updateEmbeddedDocuments("Combatant", updates);
  }
})