// metadata-name: LockView: Toggle Pan Lock
// metadata-img: modules/michaels-macros/icons/toggle_pan_lock.png
// end-metadata
Hooks.call('setLockView', {
  "panLock": ['toggle'],
})

ui.notifications.info(!canvas.scene.getFlag('LockView', 'lockPan') ? "LockView: Pan lock enabled" : "LockView: Pan lock disabled")