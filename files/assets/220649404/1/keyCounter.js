var KeyCounter = pc.createScript('keyCounter');
KeyCounter.attributes.add('player',{type:'entity'});
// initialize code called once per entity
KeyCounter.prototype.initialize = function() {

};

// update code called every frame
KeyCounter.prototype.update = function(dt) {
    this.entity.element.text = "Keys:" + this.player.script.dummy.key;

};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// KeyCounter.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/