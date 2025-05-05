var EnemyDuck = pc.createScript('enemyDuck');
EnemyDuck.attributes.add('player',{type:'entity'});
EnemyDuck.attributes.add('model',{type:'entity'});
// initialize code called once per entity
EnemyDuck.prototype.initialize = function() {
    this.states = ['idle','patrol','chase','attack','death'];
    this.currentState = this.states[0];
    this.timer = 0;
    this.timer2 = 0;
    this.randomNumber = pc.math.roundUp(pc.math.random(1,5),1);
    this.forwardVec3 = new pc.Vec3();
    this.enemyAngl = new pc.Vec3();
    this.patrolAngl = new pc.Vec3();
    this.death1 = false;
};
EnemyDuck.prototype.idle = function (dt) {
    this.model.anim.setInteger("State", 0);
this.timer += dt;
this.timer2 += dt;
if (this.health <= 0) {
    this.currentState = this.states[4];
}
if (this.player.getPosition().distance(this.entity.getPosition()) < 6) {
this.currentState = this.states[2];
this.timer = 0;
}
};
EnemyDuck.prototype.patrol = function (dt) {
this.timer += dt;
if (this.timer >= this.randomNumber) {this.currentState = this.states[0];
    this.randomNumber = pc.math.roundUp(pc.math.random(1,5),1);
    this.timer = 0;}
if (this.timer2 > 1) {
this.patrolAngl.y = pc.math.roundUp(pc.math.random(0,360),1);
this.timer2 = 0;
}
this.entity.setEulerAngles(this.patrolAngl);
this.forwardVec3.copy(this.entity.forward).mulScalar(2000);
this.entity.rigidbody.applyForce(this.forwardVec3);
if (this.player.getPosition().distance(this.entity.getPosition()) < 12) {
this.entity.sound.play("Roar");
this.currentState = this.states[2];
this.timer = 0;
}
};
EnemyDuck.prototype.chase = function(dt) {
    this.timer += dt;
    this.model.anim.setInteger("State", 1);
    if (this.timer > 0.5){
        this.entity.sound.play("Foot");
        this.timer = 0;
    }
if (this.health <= 0) {
    this.currentState = this.states[4];
}
this.entity.lookAt(this.player.getPosition().x,this.entity.getPosition().y,this.player.getPosition().z);
this.forwardVec3.copy(this.entity.forward).mulScalar(5000);
this.entity.rigidbody.applyForce(this.forwardVec3);
if (this.player.getPosition().distance(this.entity.getPosition()) < 2) {this.currentState = this.states[3];                      
                                                                        this.enemyAngl.copy(this.entity.getEulerAngles());
                                                                       this.timer = 0;}
 if (this.player.getPosition().distance(this.entity.getPosition()) > 12) {
    this.currentState = this.states[0];
    }
};
EnemyDuck.prototype.attack = function(dt) {   
if (this.health <= 0) {
    this.currentState = this.states[4];
}
if (this.health <= 0) {
    this.currentState = this.states[4];
}
this.entity.setEulerAngles(this.enemyAngl);
this.entity.lookAt(this.player.getPosition().x,this.entity.getPosition().y,this.player.getPosition().z);
    if (this.entity.getPosition().distance(this.player.getPosition()) > 2)
    {
    this.currentState = this.states[2];
    this.model.anim.setInteger("State", 1);}
if (this.player.getPosition().distance(this.entity.getPosition()) < 2 ) {
this.model.anim.setInteger("State", 2);
this.timer += dt;
if (this.timer > 1.3165) {
    
this.entity.sound.play("Attack");
//this.player.sound.play('damage');
this.player.script.health.health = this.player.script.health.health - 30;
this.player.script.health.healthInsurance();
this.timer = 0;
}
}
};


EnemyDuck.prototype.death = function (dt) {
    this.model.anim.setInteger("State", 3);
    this.entity.rigidbody.enabled = false;
    if( this.death1 === false) {
    this.entity.sound.play("Death");}
    this.death1 = true;
};
EnemyDuck.prototype.update = function(dt) {
    this.health = this.entity.script.health.health;
    switch (this.currentState) {
        case 'idle':
            this.idle(dt);
        break;
        case 'patrol' :
            this.patrol(dt);
        break;
        case 'chase':
            this.chase(dt);
        break;
        case 'attack':
            this.attack(dt);
        break;
        case 'death':
            this.death();
    }
    this.entity.rigidbody.teleport(this.entity.getPosition().x, this.entity.getPosition().y, this.entity.getPosition().z, this.entity.getEulerAngles().x , this.entity.getEulerAngles().y, this.entity.getEulerAngles().z);
    //this.model.setLocalEulerAngles(this.entity.getLocalEulerAngles().x,this.entity.getLocalEulerAngles().y + 180,this.entity.getLocalEulerAngles().z);
};