var Key = pc.createScript('key');

// initialize code called once per entity
Key.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.KeyPicky, this);
};

// update code called every frame
Key.prototype.KeyPicky = function(entity) {
    if (entity.tags.has('player')) {
        entity.script.dummy.key = entity.script.dummy.key + 1;
        this.entity.destroy();

    }

};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// Key.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/