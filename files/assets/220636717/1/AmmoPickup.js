var AmmoPickup = pc.createScript('ammoPickup');

// initialize code called once per entity
AmmoPickup.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.AmmoPicky, this);
    this.one = false;
};
AmmoPickup.prototype.AmmoPicky = function(entity) {
    console.log(entity);
    if (entity.tags.has('player')&& !this.one) {
    entity.script.dummy.gun.script.shoot.ammo = entity.script.dummy.gun.script.shoot.ammo + 12;
    console.log(entity.script.dummy.gun.script.shoot.ammo);
    entity.script.dummy.addDisp.enabled = true;
    entity.sound.play("ammoPicked");
    this.addDisp = entity.script.dummy.addDisp;
    this.entity.children[0].render.enabled = false;
    this.one = true;
    setTimeout(function () {
       this.addDisp.enabled = false;
    this.entity.destroy();
    }.bind(this), 1000);}
};

// update code called every frame
AmmoPickup.prototype.update = function(dt) {

};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// AmmoPickup.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/