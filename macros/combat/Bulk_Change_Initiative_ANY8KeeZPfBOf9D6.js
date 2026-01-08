// metadata-name: Bulk Change Initiative
// metadata-img: macros/change_initiative.png
// end-metadata
//for the selected tokens, adjust their initiative by X.  Use with selective-select to modify all enemies, friendlies

new foundry.applications.api.DialogV2({
  window: { title: `Bulk change initiative` },
  content: `
    <label>Set initiative for selected tokens:</label>
    <input name="initiative" type="number" step="1" value="" autofocus />
    `,
  buttons: [
    {
      action: "apply",
      label: "Apply changes",
      icon: "fas fa-check",
      default: true,
      callback: (event, button, dialog) => button.form.elements.initiative.valueAsNumber
    },
    {
      action: "cancel",
      label: "Cancel",
      icon: "fas fa-times"
    }
  ],
  submit: result => {
    if (result === "cancel" || !game.combat) return;
    const updates = canvas.tokens.controlled.reduce((acc, t) => {
      if (!t.combatant) return acc;
      acc.push({ _id: t.combatant.id, initiative: result });
      return acc;
    }, []);
    game.combat.updateEmbeddedDocuments("Combatant", updates)
  }
}).render({ force: true })