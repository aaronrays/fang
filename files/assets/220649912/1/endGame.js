var EndGame = pc.createScript('endGame');
EndGame.attributes.add("notenoufkeys",{type:'entity'});
EndGame.attributes.add("winScreen",{type:'entity'});
// initialize code called once per entity
EndGame.prototype.initialize = function() {

    this.entity.collision.on('triggerenter', this.winny, this);
};

// update code called every frame
EndGame.prototype.winny = function(entity) {
    if (entity.tags.has("player")) {
        if (entity.script.dummy.key === 4)
        {
            this.winScreen.enabled = true;
        }
        else{
            this.notenoufkeys.enabled = true;
            setTimeout(function () {this.notenoufkeys.enabled = false}.bind(this), 1000);
         }
        
    }

};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// EndGame.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/