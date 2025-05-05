var Instancing = pc.createScript('instancing');
Instancing.attributes.add('tag',{type:'string'});
// initialize code called once per entity
Instancing.prototype.initialize = function() {
    var pool = this.app.root.findByTag(this.tag);
    var instanceCount = pool.length;
    console.log(pool);

    this.pos = new pc.Vec3();
    this.scl = new pc.Vec3();
    this.scl.set(0.01,0.01,0.01);
    this.rot = new pc.Quat();
    this.rot.setFromEulerAngles(0,0,0);
    this.entity.render.meshInstances[0].material.onUpdateShader = function(options) {
        options.useInstancing = true;
        return options;
    };
this.entity.render.meshInstances[0].material.update();
var matrices = new Float32Array(instanceCount * 16);
var matrix = new pc.Mat4();
var matrixIndex = 0;
for (var i = 0; i < instanceCount; i++) {
    this.pos.copy(pool[i].getPosition());
    this.rot.copy(pool[i].getRotation());
    matrix.setTRS(this.pos, this.rot, this.scl);
    // copy matrix elements into array of floats
    pool[i].enabled= false;
    for (var m = 0; m < 16; m++)
        matrices[matrixIndex++] = matrix.data[m];
}
var vertexBuffer = new pc.VertexBuffer(this.app.graphicsDevice, pc.VertexFormat.getDefaultInstancingFormat(this.app.graphicsDevice),
                                        instanceCount, pc.BUFFER_STATIC, matrices);
this.entity.render.meshInstances[0].setInstancing(vertexBuffer);
//this.entity.removeComponent("render");
};
// update code called every frame
Instancing.prototype.update = function(dt) {

};

// swap method called for script hot-reloading
// inherit your script state here
// Instancing.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/