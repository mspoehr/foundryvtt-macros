// metadata-name: Check Scene
// metadata-img: icons/svg/door-secret-outline.svg
// end-metadata
const openSecretDoors = canvas.walls.doors.filter(d => d.document.door == CONST.WALL_DOOR_TYPES.SECRET && d.isOpen);
const openNormalDoors = canvas.walls.doors.filter(d => d.document.door == CONST.WALL_DOOR_TYPES.DOOR && d.isOpen);
const playerTokens = canvas.tokens.ownedTokens.filter(t => game.users.players.some(p => t.can(p, "view")));

let content = "";
let buttons = [];

if (openSecretDoors.length != 0 || openNormalDoors != 0) {
  content += "<b>Doors</b><ul style="color: red">"
  if (openSecretDoors.length != 0) {
    content += `<li>${openSecretDoors.length} secret doors are open</li>`
    buttons.push("<p><button type="button" data-preset="select-secret">Select open secret doors</button>");
    buttons.push("<button type="button" data-preset="close-secret">Close secret doors</button></p>");
  }
  if (openNormalDoors.length != 0) {
    content += `<li>${openNormalDoors.length} normal doors are open</li>`
    buttons.push("<p><button type="button" data-preset="select-all">Select open doors</button>");
    buttons.push("<button type="button" data-preset="close-all">Close all doors</button></p>");
  }
  content += "</ul>"
}

if (playerTokens.length != 0) {
  content += `<b>Tokens</b><ul style="color: red"><li>${playerTokens.length} player controlled tokens are present in this scene</li></ul>`
  buttons.push("<p><button type="button" data-preset="select-tokens">Select player tokens</button>");
  buttons.push("<button type="button" data-preset="remove-tokens">Remove player tokens</button></p>");
}

content += "<hr>"
content += buttons.join("")

function handleButtonPress(event) {
  const eventType = event.currentTarget.dataset?.preset;
  let updates;

  switch(eventType) {
    case "close-secret":
      updates = openSecretDoors.map(door => ({ _id: door.id, ds: CONST.WALL_DOOR_STATES.CLOSED }));
      canvas.scene.updateEmbeddedDocuments("Wall", updates);
      break;
      case "close-all":
      updates = openSecretDoors.map(door => ({ _id: door.id, ds: CONST.WALL_DOOR_STATES.CLOSED }));
      canvas.scene.updateEmbeddedDocuments("Wall", updates);
      updates = openNormalDoors.map(door => ({ _id: door.id, ds: CONST.WALL_DOOR_STATES.CLOSED }));
      canvas.scene.updateEmbeddedDocuments("Wall", updates);
      break;
    case "remove-tokens":
      playerTokens.forEach(t => t.destroy());
      break;
    case "select-secret":
      canvas.walls.releaseAll();
      canvas.tokens.releaseAll();
      openSecretDoors.forEach(door => door.control({ releaseOthers: false }));
      break;
    case "select-all":
      canvas.walls.releaseAll();
      canvas.tokens.releaseAll();
      openSecretDoors.forEach(door => door.control({ releaseOthers: false }));
      openNormalDoors.forEach(door => door.control({ releaseOthers: false }));
      break;
    case "select-tokens":
      canvas.walls.releaseAll();
      canvas.tokens.releaseAll();
      playerTokens.forEach(token => token.control({ releaseOthers: false }));
      break;
  }
}

if (playerTokens.length != 0 || openNormalDoors.length != 0 || openSecretDoors.length != 0) {
  new Dialog({
    title: "Scene issues",
    content,
    render: (html) => {
      html.on('click', 'button[data-preset]', handleButtonPress)
    },
    buttons: {}
  }).render(true);
} else {
  Dialog.prompt({
    title: "Scene issues",
    content: "No scene issues were found",
    label: "Close"
  });
}