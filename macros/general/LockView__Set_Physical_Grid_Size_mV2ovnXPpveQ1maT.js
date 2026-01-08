// metadata-name: LockView: Set Physical Grid Size
// metadata-img: macros/physical_gridsize.png
// end-metadata
game.socket.emit(`module.LockView`, {"msgType": "newView","users": "all","shiftX": 0,"shiftY": 0,"scaleSett": 3,"rotateSett": null, "type": "grid"});

Hooks.call('setLockView',{
  "zoomLock": ['on'],
})