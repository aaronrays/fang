var WeaponSway = pc.createScript('weaponSway');
// initialize code called once per entity
WeaponSway.attributes.add('speed' , {type: 'number'});
WeaponSway.attributes.add('amount' , {type: 'number'});
WeaponSway.attributes.add('maxAmountx' , {type: 'number'});
WeaponSway.attributes.add('maxAmounty' , {type: 'number'});
WeaponSway.prototype.initialize = function() {
    //this.speed = 2;
   // this.amount = 0.05;
    this.InitialPos = new pc.Vec3();
    this.InitialPos.copy(this.entity.getLocalPosition());
    this.app.mouse.on("mousemove", this.onMouseMove, this);
    this.MousePos = new pc.Vec3();
    this.finalfinalPos = new pc.Vec3();
    this.temp = new pc.Vec3();
   // this.maxAmountx = 0.5;
   // this.maxAmounty = 0.1;
};
WeaponSway.prototype.onMouseMove = function (e) {
    if (pc.Mouse.isPointerLocked()) {
 this.MousePos.x = -e.dx * this.amount;
 this.MousePos.y = e.dy * this.amount;
        this.MousePos.x = pc.math.clamp(this.MousePos.x , -this.maxAmountx,this.maxAmountx);
        this.MousePos.y = pc.math.clamp(this.MousePos.y , -this.maxAmounty,this.maxAmounty);
}};
// update code called every frame
WeaponSway.prototype.update = function(dt) {
     this.finalfinalPos.lerp(this.entity.getLocalPosition(),this.temp.add2(this.InitialPos,this.MousePos), this.speed *dt );
     this.entity.setLocalPosition( this.finalfinalPos );
};

// swap method called for script hot-reloading
// inherit your script state here
// WeaponSway.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/