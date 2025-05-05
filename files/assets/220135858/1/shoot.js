var Shoot = pc.createScript('shoot');
Shoot.attributes.add('camera',{type:'entity'});
Shoot.attributes.add('to',{type:'entity'});
Shoot.attributes.add('pivot',{type:"entity"});
Shoot.attributes.add('light',{type:"entity"});
Shoot.attributes.add('tracer',{type:'entity'});
// initialize code called once per entity
Shoot.prototype.initialize = function() {
    this.ammo = 0;
    this.targetRot = new pc.Vec3();
    this.targetRot.set(0,0,0);
    this.lerpVec3 = new pc.Vec3();
    this.RecoilVec3 = new pc.Vec3(30,0,0);
    this.recoilTimer = 0;
    this.isRecoil = false;
    this.isRRecoil = false;
    this.light.light.intensity = 0;
};
Shoot.prototype.shoot = function() {
    this.rayStart = this.camera.getPosition();
    this.rayEnd   = this.to.getPosition();
    this.ray = this.app.systems.rigidbody.raycastFirst(this.rayStart,this.rayEnd);
    if (this.ray) {
    if (this.ray.entity.tags.has("enemyG")){
        this.ray.entity.script.health.health = this.ray.entity.script.health.health - 50;
        this.ray.entity.sound.play("Hurt");
    }}
    this.entity.sound.play("shoot");
    this.isRecoil = true;
    this.isRRecoil = false;
    this.light.light.intensity = 4;
    var that = this;
    var tracerC = this.tracer.clone();
    tracerC.reparent(this.app.root);
    tracerC.enabled = true;
    setInterval( function () {that.light.light.intensity = 0;},300);
}
// update code called every frame
Shoot.prototype.update = function(dt) {
    //console.log(this.ammo);
    if (this.app.mouse.wasPressed(pc.MOUSEBUTTON_LEFT)&& this.ammo > 0){
        this.shoot();
        this.ammo --;
    }
    if (this.isRecoil) {
    this.lerpVec3.lerp(this.pivot.getLocalEulerAngles(),this.RecoilVec3,20*dt);
    this.pivot.setLocalEulerAngles(this.lerpVec3);
    if (this.lerpVec3.distance(this.RecoilVec3) < 0.1) {this.isRecoil = false;this.isRRecoil = true;}
    } 
    if (this.isRRecoil) {
    this.lerpVec3.lerp(this.pivot.getLocalEulerAngles(),pc.Vec3.ZERO,4*dt);
    this.pivot.setLocalEulerAngles(this.lerpVec3);
    if (this.lerpVec3.equals(pc.Vec3.ZERO)) {this.isRRecoil = false;}
    }
};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// Shoot.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/