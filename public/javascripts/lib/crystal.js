//Declaration of a Cloud as an object
Crystal = function(radius){
    //this.mesh = new THREE.Object3D();
    this.name = "crystal";
    this.radius = radius;
    this.particlesSpawned = false;
    this.lightsAdded = false;
    var geom = new THREE.DodecahedronGeometry(radius);
    
    var mat = new THREE.MeshStandardMaterial({
     color: 0xe15554,//069e2d хорошнький зелный,//1b264f темно синий,//d62828 красно-розовый хороший,//ff3f00 оранж, 
     shading:THREE.FlatShading,
     metalness: 0.5 });

    this.mesh = new THREE.Mesh( geom, mat);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.topPointLight = new THREE.PointLight( 0xffffff, 1, 100 );
    //this.topPointLight.position.set( 0, 980, 480 );
    // this.topPointLight.position.set(this.mesh.position.x,
    //                                 this.mesh.position.y + this.radius * 3.2,
    //                                 this.mesh.position.z);
    //scene.add( this.topPointLight );

    // var sphereSize = 1;
    // var pointLightHelper = new THREE.PointLightHelper( this.topPointLight, sphereSize );
    // scene.add( pointLightHelper );

    this.rightPointLight = new THREE.PointLight( 0xff0f80, 1, 100 );
    //pointLight.position.set( 50, 900, 500 );
    //scene.add( this.rightPointLight );

    //var spotLight = new THREE.SpotLight( 0x0582ca,1,80, Math.PI, 0.8);
    //spotLight.position.set( 40, 920, 500 );
    //scene.add(spotLight);

    //var sphereSize = 1;
    //var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    //scene.add( pointLightHelper );

    this.leftPointLight = new THREE.PointLight( 0xff9000, 1, 100 );
    //pointLight.position.set( -50, 900, 500 );
    //scene.add( this.leftPointLight );

    //var sphereSize = 1;
    //var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    //scene.add( pointLightHelper );


    
    
    //Random count of blocks
    //var blocksCount = minCloudBlocksCount + Math.floor( Math.random()*(maxCLoudBlocksCount - minCloudBlocksCount));
    
    //Creation of each block
    // for(var i = 0; i < blocksCount; i++)
    // {
    //  var m = new THREE.Mesh(geom, mat);
    
    // //Random position for every block
    //  m.position.x = i*5 + Math.floor(Math.random() * 5);
    //  m.position.y = Math.random()*10;
    //  m.position.z = Math.random()*10;
    
    // //Random rotation for every block
    //  m.rotation.z = Math.random() * Math.PI * 2;
    //  m.rotation.y = Math.random() * Math.PI * 2;
    
    // //Random scale too
    //  var s = 0.3 + Math.random() * 0.7;
    //  m.scale.set(s,s,s);
     
    //  m.castShadow = true;
    //  m.receiveShadow = true;
     
    //  this.mesh.add(m)
    // }
    
    // //Random rotation around Z axis with a PI/6 pitch
    // var rand = 0 - 0.5 + Math.random() * (6 - 0 + 1)
    // rand = Math.round(rand);
    
    // this.mesh.rotateZ((Math.PI / 6) * rand);
    
}

Crystal.prototype.setLightsPosition = function(vector){
    // this.topPointLight.position.set(vector.x,
    //                                 vector.y + this.radius * 3.2,
    //                                 vector.z);

    this.rightPointLight.position.set(vector.x + this.radius * 2,
                                     vector.y,
                                     vector.z + this.radius * 0.8);

    this.leftPointLight.position.set(vector.x - this.radius * 2,
                                     vector.y,
                                     vector.z + this.radius * 0.8);
    
    
}

Crystal.prototype.spawnParticles = function(count, character){
    //console.log("spawned");
    this.particles = [];
    for(var i = 0; i < count; i++){
        rad = getRandomValue(this.radius/6, this.radius/3);
        this.particles.push(new crystalParticle(rad))
        this.particles[i].mesh.position.x = character.mesh.position.x;
        this.particles[i].mesh.position.y = character.mesh.position.y;
        this.particles[i].mesh.position.z = character.mesh.position.z;
        //    SCENE
        //console.log(this.particles[i].mesh.position);
        scene.add(this.particles[i].mesh);

        //console.log(particles[i].mesh.position);
    }


    for(var i = 0; i < count; i++){
        this.particles[i].explode(character.mesh.position, 0.7);
        //console.log(particles[i].mesh.visible);
    }
    this.particlesSpawned = true;
}

function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}