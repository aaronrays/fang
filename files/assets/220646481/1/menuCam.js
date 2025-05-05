var MenuCam = pc.createScript('menuCam');

// initialize code called once per entity
MenuCam.prototype.initialize = function() {

};

// update code called every frame
MenuCam.prototype.update = function(dt) {
    this.entity.rotate(0,dt*5,0);

};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// MenuCam.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/