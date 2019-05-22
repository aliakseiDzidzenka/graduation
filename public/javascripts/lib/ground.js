//Declaration of a Ground as an object
Ground = function(){

    //var geom = new THREE.SphereGeometry(800,30,30);
    var geom = new THREE.CylinderGeometry(800, 800, WIDTH + 150, 30, 8, true);
    
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
    geom.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI/2));
    
    var l = geom.vertices.length;
    
    this.waves = [];

    
    for(var i = 0; i < l; i++){
    
    var v = geom.vertices[i];

    //v.x = v.x + Math.cos(Math.random()*Math.PI*2)*5 + Math.random() * 35;
    //v.y = v.y + Math.sin(Math.random()*Math.PI*2)*5 + Math.random() * 35;
    
    //Each wave is an object with x,y,z coordinations rotaion angel, amplitute and speed of changing
    this.waves.push({y: v.y,
                     x: v.x,
                     z: v.z,
                     ang: Math.random()*Math.PI*2,
                     amp: 5 + Math.random() * 25,
                     speed: 0.016 + Math.random() * 0.042
                  });
    }
    
    var material = new THREE.MeshPhongMaterial({
    color: 0x1e8b0e,//1e8b0e,//26ae11,//29bf12 veru bright green,//43c59e мятный,//fa8334 desert orange,//4cb944 bright green,//566e3d bledno green,//b9a44c yellow,//33658a cinii,
    shading:THREE.FlatShading});
    
    this.mesh = new THREE.Mesh(geom,material);
    
    
    this.mesh.recieveShadow = true;
}
    
    //function for waves mooving
Ground.prototype.moveWaves = function(){
    
    var verts = this.mesh.geometry.vertices;
    var l = verts.length;
    
    for(var i = 0; i < l; i++){
    var v = verts[i];
    var vprops = this.waves[i];
    
    //Assignment to each vertex of the position of each 'wave'
    v.x = vprops.x + Math.cos(vprops.ang)*vprops.amp;
    v.y = vprops.y + Math.sin(vprops.ang)*vprops.amp;
    
    vprops.ang += vprops.speed;
    
    }
    
    //if 'false' there is no vertices update
    this.mesh.geometry.verticesNeedUpdate = true;
    
}