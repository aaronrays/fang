var Dummy = pc.createScript('dummy');
Dummy.attributes.add('gun', {type:'entity'});
Dummy.attributes.add('addDisp', {type:'entity'});
// initialize code called once per entity
Dummy.prototype.initialize = function() {
    this.key = 0;
};

// update code called every frame
Dummy.prototype.update = function(dt) {
    console.log(this.key);
};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// Dummy.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/