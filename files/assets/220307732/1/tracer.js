var Tracer = pc.createScript('tracer');
Tracer.attributes.add('Gun',{type:'entity'});
Tracer.attributes.add('to',{type:'entity'});
// initialize code called once per entity
Tracer.prototype.initialize = function() {
    //this.entity.setEulerAngles(this.Gun.getEulerAngles());
    this.entity.setPosition(this.Gun.getPosition());
    this.entity.lookAt(this.to.getPosition());
    setTimeout(function(){this.entity.destroy();}.bind(this),2000);
};

// update code called every frame
Tracer.prototype.update = function(dt) {
    this.entity.translateLocal(0,0,-10*dt);
};

// swap method called for script hot-reloading
// inherit your script state here
// Tracer.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/