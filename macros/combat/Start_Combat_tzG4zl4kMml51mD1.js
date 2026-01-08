// metadata-name: Start Combat
// metadata-img: macros/start_combat.png
// end-metadata
if (game.combat && game.combat.round > 1) {
  ui.notifications.error("Combat is already started, end current combat and try again.")
  return;
}

if (!game.combat || game.combat.combatants.contents.length === 0) {
  if (canvas.tokens.controlled.length > 0) {
    await TokenDocument.createCombatants(canvas.tokens.controlled.map(t => t.document));
  } else {
    foundry.applications.api.DialogV2.prompt({
      window: { title: "Combat not started" },
      content: "Add some creatures to the encounter first",
      ok: { label: "Close" }
    });
    return;
  }
}

const tokensNotInCombat = canvas.tokens.documentCollection.filter(t => !t.inCombat);
if (tokensNotInCombat.length > 0) {
  const confirmContent = "The following tokens aren't added to combat. Are you sure you want to continue?<ul>" + tokensNotInCombat.map(t => `<li>${t.name}</li>`).join("") + "</ul>";
  const proceed = await foundry.applications.api.DialogV2.confirm({
    window: { title: "Not all tokens in combat" },
    content: confirmContent,
    rejectClose: true,
    modal: true
  });
  if (!proceed) return;
}

game.macros.getName("Start Combat: Hide Monster Initiatives").execute()
game.macros.getName("Start Combat: Roll NPC Initiatives").execute()
await game.macros.getName("Start Combat: Set Player Initiatives").execute()
game.macros.getName("Start Combat: Break Initiative Ties").execute()

game.combat.startCombat();