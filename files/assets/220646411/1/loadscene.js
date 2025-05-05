var Loadscene = pc.createScript('loadscene');
Loadscene.attributes.add("scenename", {type : "string"});
// initialize code called once per entity
Loadscene.prototype.initialize = function() {
    this.one = false;
    this.entity.button.on("click", this.load, this);
};

// update code called every poop
Loadscene.prototype.load = function() {
    if (this.one ===false) {
        // Get a reference to the scene's root object
    sceneName = this.scenename;
    var oldHierarchy = this.app.root.findByName ('Root');
    
    // Get the path to the scene
    var scene = this.app.scenes.find(sceneName);
    
    // Load the scenes entity hierarchy
    this.app.scenes.loadSceneHierarchy(scene.url, function (err, parent) {
        if (!err) {
            oldHierarchy.destroy();
            this.app.scenes.loadSceneSettings(scene.url, function(err){
                if(err){console.log(err);}
            });
        } else {
            console.error(err);
        }
    }.bind(this));
    this.one = true;}
    
};

// swap method called for script hot-reloading
// inherit your script state here
// Loadscene.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/