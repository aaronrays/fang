var Recoil = pc.createScript('recoil');
Recoil.attributes.add('camera',{type:'entity'});
// initialize code called once per entity
Recoil.prototype.initialize = function() {
    this.targetRot = new pc.Vec3();
    this.Recoling = false;
    this.LerpR = new pc.Vec3();
    this.LerpA = new pc.Vec3();
    this.Rspeed = 10;
    this.Aspeed = 20;
};

// update code called every frame
Recoil.prototype.update = function(dt) {
    if (this.Recoling) {
        if (this.LerpR.distance(this.targetRot) < 0.25){
            this.Recoling = false;
            this.targetRot.copy(pc.Vec3.ZERO)
        }
        else {
            this.LerpR.lerp(this.entity.getLocalEulerAngles(),this.targetRot, dt*this.Rspeed);
            this.entity.setLocalEulerAngles(this.LerpR);
        }

    }
    else {
        
        if (this.LerpA.distance(pc.Vec3.ZERO) < 0.25){
            this.Recoling = !this.Recoling;
        }
        else {
            this.LerpA.lerp(this.entity.getLocalEulerAngles(),pc.Vec3.ZERO, dt*this.Aspeed);
            this.entity.setLocalEulerAngles(this.LerpA);
        }

    }
    if (this.app.mouse.wasPressed(pc.MOUSEBUTTON_LEFT)) {
        this.targetRot.x = this.targetRot.x + 2;
        this.Recoling = true;
    }

};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// Recoil.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/