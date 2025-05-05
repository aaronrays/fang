var Health = pc.createScript('health');
Health.attributes.add('health',{type:'number'});
Health.attributes.add("deathScreen", {type: "entity"});
Health.attributes.add("disable", {type:"entity", array:true});
// initialize code called once per entity
Health.prototype.initialize = function() {

};

Health.prototype.healthInsurance = function(){ //programmer naming 101 yes, true,,,
    if(this.health <= 0){
        for(i = 0; i < this.disable.length; i++){
            this.disable[i].enabled = false;
        }
        this.deathScreen.enabled = true;
        this.entity.script.enabled = false;
        this.entity.sound.enabled = false;
        this.app.mouse.off("mousedown");  
        this.app.mouse.disablePointerLock();
    }
};
// swap method called for script hot-reloading
// inherit your script state here
// Health.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/