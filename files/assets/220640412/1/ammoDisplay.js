var AmmoDisplay = pc.createScript('ammoDisplay');
AmmoDisplay.attributes.add('gun',{type:'entity'});
// initialize code called once per entity
AmmoDisplay.prototype.initialize = function() {

};

// update code called every frame
AmmoDisplay.prototype.update = function(dt) {
    this.entity.element.text = this.gun.script.shoot.ammo;

};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// AmmoDisplay.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/