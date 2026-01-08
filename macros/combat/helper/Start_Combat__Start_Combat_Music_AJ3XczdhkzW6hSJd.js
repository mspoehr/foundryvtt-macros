// metadata-name: Start Combat: Start Combat Music
// metadata-img: icons/svg/dice-target.svg
// end-metadata
const changeMusic = await new Promise((resolve, reject) => {
  const dialog = new Dialog({
    title: "Start Combat",
    content: "Do you want to start playing the combat playlist?",
    buttons: {
      foo: {
        label: "No",
        callback: () => {
          resolve(false);
        },
      },
      bar: {
        label: "Yes",
        callback: () => {
          resolve(true);
        },
      },
    },
    close: () => {
      reject();
    },
  });

  dialog.render(true);
});

if (changeMusic) {
 const combatPlaylistId = "bccX3yLBYBJjhsHg";
 game.playlists.playing.forEach((playlist) => {
   if (playlist.id != combatPlaylistId) {
     playlist.stopAll();
   }
 });
 game.playlists.get(combatPlaylistId).playAll();
}