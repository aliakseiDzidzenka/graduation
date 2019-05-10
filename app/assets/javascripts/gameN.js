var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if (true) {
var airplane;
var cloudH = 1046;
var lCloudsPos = -250;
var rCloudsPos = - lCloudsPos;
var sideCloudsCount = 12;
var cloudPosDelta = 85;
var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container,  mixer;
//var flamingo;
var fPos;
var HEIGHT, WIDTH;
var updateOrNot = true;
var  hemisphereLight, shadowLight;
var ground;
var score = 0;
var globalRot = 0.785;
var rotUpdate = 0.008;
var flaPos = new THREE.Vector3();
var row;
var cloudRows = [];
var cloudRowsCount = 8;
var cloudPosDelta = 85;
var cloudRowGlobalPosition = new THREE.Vector3();
var cloudGlobalPosition = new THREE.Vector3();
var sideClouds;
var sideCloudsCount = 12;
var minCloudBlocksCount = 5;
var maxCLoudBlocksCount = 8;
var angle = 2 * Math.PI / sideCloudsCount;
var clock = new THREE.Clock(false);
clock.start();
var delta = clock.getDelta();
var againButton;
//loader for flamingo bird
var loader = new THREE.JSONLoader();

var Colors = {
    red:0xf25346,
    white:0xd8d0d1,
    pink:0xF5986E,
    brown:0x59332e,
    brownDark:0x23190f,
    blue:0x68c3c0,
};

//This function initialises our scene
function init(event){

    //event handler for controlling a character using an accelerometer
    //if(isMobile.any()){
    window.addEventListener('devicemotion', handleOrientation);
        alert("devicemotion");
    //}

    createScene();
    createLights();
    //createGround();
    //createSideClouds();
    createPlane();


    //first initialising of each cloud row
    // for(var i = 0; i < cloudRowsCount; i++){
    // cloudRows[i] = new cloudRow();
    
    // cloudRows[i].addClouds();
    // cloudRows[i].rot = globalRot * i;
    
    // scene.add(cloudRows[i].mesh);
    // }
    //alert(typeof("<%= javascript_path '/dir/flamingo.js'   %>"));
    //flamingo loading
    //alert(<%= File.open(Rails.root.to_s + '/flamingo.js') %>);
    // loader.load("<%=Rails.root.join('flamingo.js').to_s%>", function( geometry ) {
    // loader.load("flamingo.js", function( geometry ) {

    // loader.load('flamingo_load', function( geometry ) {
    //     alert("of");
    // var material = new THREE.MeshPhongMaterial( { 
    //         morphTargets: true, 
    //         vertexColors: THREE.FaceColors 
    //     } );
        
    // flamingo = new THREE.Mesh(geometry, material);
    
    // flamingo.position.x = 0;
    // flamingo.position.y = 930;
    // flamingo.position.z = 480;
    // flamingo.scale.set(.3,.3,.3);
    // flamingo.rotateY(Math.PI);
    // scene.add(flamingo);

    //  if(flamingo){
    //      alert("dsf");
    //  }
    // // alert(flamingo);

    // //animation mixer for animation handling
    // mixer = new THREE.AnimationMixer(flamingo);
    // mixer.clipAction(geometry.animations[0]).setDuration(1).play();} );	 


    //div element for score displaying
    scoreText = document.createElement('div');
    scoreText.style.position = 'absolute';

    scoreText.style.width = 150;
    scoreText.style.height = 100;
    scoreText.innerHTML = "Flight time is 0 seconds";
    scoreText.style.top = 50 + 'px';
    scoreText.style.left = 50 + 'px';
    document.body.appendChild(scoreText);

    againButton = document.createElement('button');
    againButton.style.opacity = 0;
    againButton.textContent = 'Play again!';
    againButton.style.position = 'absolute';
    
    againButton.onclick = function(){
        if(this.style.opacity == 1){
            againButton.style.opacity = 0;
            score = 0;
            scoreText.innerHTML = "Flight time is " + 0 + " seconds.";
            rotUpdate = 0.008;
            clock = new THREE.Clock(false);
            clock.start();
            airplane.mesh.visible = true;
            airplane.mesh.position.x = 0;
        }
    
    }
    document.body.appendChild(againButton);

    loop();
}



var Pilot = function(){
  this.mesh = new THREE.Object3D();
  this.mesh.name = "pilot";
  this.angleHairs=0;

  var bodyGeom = new THREE.BoxGeometry(15,15,15);
  var bodyMat = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
  var body = new THREE.Mesh(bodyGeom, bodyMat);
  body.position.set(2,-12,0);

  this.mesh.add(body);

  var faceGeom = new THREE.BoxGeometry(10,10,10);
  var faceMat = new THREE.MeshLambertMaterial({color:Colors.pink});
  var face = new THREE.Mesh(faceGeom, faceMat);
  this.mesh.add(face);

  var hairGeom = new THREE.BoxGeometry(4,4,4);
  var hairMat = new THREE.MeshLambertMaterial({color:Colors.brown});
  var hair = new THREE.Mesh(hairGeom, hairMat);
  hair.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,2,0));
  var hairs = new THREE.Object3D();

  this.hairsTop = new THREE.Object3D();

  for (var i=0; i<12; i++){
    var h = hair.clone();
    var col = i%3;
    var row = Math.floor(i/3);
    var startPosZ = -4;
    var startPosX = -4;
    h.position.set(startPosX + row*4, 0, startPosZ + col*4);
    this.hairsTop.add(h);
  }
  hairs.add(this.hairsTop);

  var hairSideGeom = new THREE.BoxGeometry(12,4,2);
  hairSideGeom.applyMatrix(new THREE.Matrix4().makeTranslation(-6,0,0));
  var hairSideR = new THREE.Mesh(hairSideGeom, hairMat);
  var hairSideL = hairSideR.clone();
  hairSideR.position.set(8,-2,6);
  hairSideL.position.set(8,-2,-6);
  hairs.add(hairSideR);
  hairs.add(hairSideL);

  var hairBackGeom = new THREE.BoxGeometry(2,8,10);
  var hairBack = new THREE.Mesh(hairBackGeom, hairMat);
  hairBack.position.set(-1,-4,0)
  hairs.add(hairBack);
  hairs.position.set(-5,5,0);

  this.mesh.add(hairs);

  var glassGeom = new THREE.BoxGeometry(5,5,5);
  var glassMat = new THREE.MeshLambertMaterial({color:Colors.brown});
  var glassR = new THREE.Mesh(glassGeom,glassMat);
  glassR.position.set(6,0,3);
  var glassL = glassR.clone();
  glassL.position.z = -glassR.position.z

  var glassAGeom = new THREE.BoxGeometry(11,1,11);
  var glassA = new THREE.Mesh(glassAGeom, glassMat);
  this.mesh.add(glassR);
  this.mesh.add(glassL);
  this.mesh.add(glassA);

  var earGeom = new THREE.BoxGeometry(2,3,2);
  var earL = new THREE.Mesh(earGeom,faceMat);
  earL.position.set(0,0,-6);
  var earR = earL.clone();
  earR.position.set(0,0,6);
  this.mesh.add(earL);
  this.mesh.add(earR);
}

Pilot.prototype.updateHairs = function(){
  var hairs = this.hairsTop.children;

  var l = hairs.length;
  for (var i=0; i<l; i++){
    var h = hairs[i];
    h.scale.y = .75 + Math.cos(this.angleHairs+i/3)*.25;
  }
  this.angleHairs += 0.16;
}


var AirPlane = function(){
  this.mesh = new THREE.Object3D();
  this.mesh.name = "airPlane";

  // Cockpit

  var geomCockpit = new THREE.BoxGeometry(80,50,50,1,1,1);
  var matCockpit = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});

  geomCockpit.vertices[4].y-=10;
  geomCockpit.vertices[4].z+=20;
  geomCockpit.vertices[5].y-=10;
  geomCockpit.vertices[5].z-=20;
  geomCockpit.vertices[6].y+=30;
  geomCockpit.vertices[6].z+=20;
  geomCockpit.vertices[7].y+=30;
  geomCockpit.vertices[7].z-=20;

  var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
  cockpit.castShadow = true;
  cockpit.receiveShadow = true;
  this.mesh.add(cockpit);

  // Engine

  var geomEngine = new THREE.BoxGeometry(20,50,50,1,1,1);
  var matEngine = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
  var engine = new THREE.Mesh(geomEngine, matEngine);
  engine.position.x = 50;
  engine.castShadow = true;
  engine.receiveShadow = true;
  this.mesh.add(engine);

  // Tail Plane

  var geomTailPlane = new THREE.BoxGeometry(15,20,5,1,1,1);
  var matTailPlane = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
  var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
  tailPlane.position.set(-40,20,0);
  tailPlane.castShadow = true;
  tailPlane.receiveShadow = true;
  this.mesh.add(tailPlane);

  // Wings

  var geomSideWing = new THREE.BoxGeometry(30,5,120,1,1,1);
  var matSideWing = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
  var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
  sideWing.position.set(0,15,0);
  sideWing.castShadow = true;
  sideWing.receiveShadow = true;
  this.mesh.add(sideWing);

  var geomWindshield = new THREE.BoxGeometry(3,15,20,1,1,1);
  var matWindshield = new THREE.MeshPhongMaterial({color:Colors.white,transparent:true, opacity:.3, shading:THREE.FlatShading});;
  var windshield = new THREE.Mesh(geomWindshield, matWindshield);
  windshield.position.set(5,27,0);

  windshield.castShadow = true;
  windshield.receiveShadow = true;

  this.mesh.add(windshield);

  var geomPropeller = new THREE.BoxGeometry(20,10,10,1,1,1);
  geomPropeller.vertices[4].y-=5;
  geomPropeller.vertices[4].z+=5;
  geomPropeller.vertices[5].y-=5;
  geomPropeller.vertices[5].z-=5;
  geomPropeller.vertices[6].y+=5;
  geomPropeller.vertices[6].z+=5;
  geomPropeller.vertices[7].y+=5;
  geomPropeller.vertices[7].z-=5;
  var matPropeller = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
  this.propeller = new THREE.Mesh(geomPropeller, matPropeller);

  this.propeller.castShadow = true;
  this.propeller.receiveShadow = true;

  var geomBlade = new THREE.BoxGeometry(1,80,10,1,1,1);
  var matBlade = new THREE.MeshPhongMaterial({color:Colors.brownDark, shading:THREE.FlatShading});
  var blade1 = new THREE.Mesh(geomBlade, matBlade);
  blade1.position.set(8,0,0);

  blade1.castShadow = true;
  blade1.receiveShadow = true;

  var blade2 = blade1.clone();
  blade2.rotation.x = Math.PI/2;

  blade2.castShadow = true;
  blade2.receiveShadow = true;

  this.propeller.add(blade1);
  this.propeller.add(blade2);
  this.propeller.position.set(60,0,0);
  this.mesh.add(this.propeller);

  var wheelProtecGeom = new THREE.BoxGeometry(30,15,10,1,1,1);
  var wheelProtecMat = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
  var wheelProtecR = new THREE.Mesh(wheelProtecGeom,wheelProtecMat);
  wheelProtecR.position.set(25,-20,25);
  this.mesh.add(wheelProtecR);

  var wheelTireGeom = new THREE.BoxGeometry(24,24,4);
  var wheelTireMat = new THREE.MeshPhongMaterial({color:Colors.brownDark, shading:THREE.FlatShading});
  var wheelTireR = new THREE.Mesh(wheelTireGeom,wheelTireMat);
  wheelTireR.position.set(25,-28,25);

  var wheelAxisGeom = new THREE.BoxGeometry(10,10,6);
  var wheelAxisMat = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
  var wheelAxis = new THREE.Mesh(wheelAxisGeom,wheelAxisMat);
  wheelTireR.add(wheelAxis);

  this.mesh.add(wheelTireR);

  var wheelProtecL = wheelProtecR.clone();
  wheelProtecL.position.z = -wheelProtecR.position.z ;
  this.mesh.add(wheelProtecL);

  var wheelTireL = wheelTireR.clone();
  wheelTireL.position.z = -wheelTireR.position.z;
  this.mesh.add(wheelTireL);

  var wheelTireB = wheelTireR.clone();
  wheelTireB.scale.set(.5,.5,.5);
  wheelTireB.position.set(-35,-5,0);
  this.mesh.add(wheelTireB);

  var suspensionGeom = new THREE.BoxGeometry(4,20,4);
  suspensionGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,10,0))
  var suspensionMat = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
  var suspension = new THREE.Mesh(suspensionGeom,suspensionMat);
  suspension.position.set(-35,-5,0);
  suspension.rotation.z = -.3;
  this.mesh.add(suspension);

  this.pilot = new Pilot();
  this.pilot.mesh.position.set(-10,27,0);
  this.mesh.add(this.pilot.mesh);

  this.mesh.castShadow = true;
  this.mesh.receiveShadow = true;

};



function createPlane(){
  airplane = new AirPlane();
  airplane.mesh.scale.set(.3,.3,.3);
  airplane.mesh.rotation.y = 1.57;
  airplane.mesh.rotation.x = 0.2;
  airplane.mesh.position.x = 0;
  airplane.mesh.position.y = 930;
  airplane.mesh.position.z = 480;
  scene.add(airplane.mesh);
  console.log("created " + airplane.mesh.position.x + " " + airplane.mesh.position.y + " " + airplane.mesh.position.z);
}

//Declaration of a Cloud as an object
Cloud = function(){
    this.mesh = new THREE.Object3D();
    
    var geom = new THREE.SphereGeometry(15,8,4);
    
    var mat = new THREE.MeshPhongMaterial({
     color: 0xffffff});
    
    //Random count of blocks
    var blocksCount = minCloudBlocksCount + Math.floor( Math.random()*(maxCLoudBlocksCount - minCloudBlocksCount));
    
    //Creation of each block
    for(var i = 0; i < blocksCount; i++)
    {
     var m = new THREE.Mesh(geom, mat);
    
    //Random position for every block
     m.position.x = i*5 + Math.floor(Math.random() * 5);
     m.position.y = Math.random()*10;
     m.position.z = Math.random()*10;
    
    //Random rotation for every block
     m.rotation.z = Math.random() * Math.PI * 2;
     m.rotation.y = Math.random() * Math.PI * 2;
    
    //Random scale too
     var s = 0.3 + Math.random() * 0.7;
     m.scale.set(s,s,s);
     
     m.castShadow = true;
     m.receiveShadow = true;
     
     this.mesh.add(m)
    }
    
    //Random rotation around Z axis with a PI/6 pitch
    var rand = 0 - 0.5 + Math.random() * (6 - 0 + 1)
    rand = Math.round(rand);
    
    this.mesh.rotateZ((Math.PI / 6) * rand);
    
}




//Declaration of a SideCloud as an object
//The character (flamingo) is never interacting with them
//The clouds are staggered (left - rigth side) around the Ground instance with angular difference of 2 'angle' on each side
SideClouds = function(){

    this.mesh = new THREE.Object3D();
    
    //Creaton of left side clouds
    for(var i = 0; i < sideCloudsCount; i++)
    {
        var c = new Cloud();
        
        var a = 2 * angle * i;
        
        c.mesh.position.z = Math.cos(a) * cloudH;
        c.mesh.position.y = Math.sin(a) * cloudH;
        c.mesh.position.x = lCloudsPos;
        
        this.mesh.add(c.mesh);
    }
    
    //Creation of rigth side clouds
    for(var i = 0; i  < sideCloudsCount; i++)
    {
        var c = new Cloud();
        
        var a = (2 * angle * i) - angle;
        
        c.mesh.position.z = Math.cos(a) * cloudH;
        c.mesh.position.y = Math.sin(a) * cloudH;
        c.mesh.position.x = rCloudsPos;
        
        this.mesh.add(c.mesh);
    }
}
    


//Declaration of a cloudRow as an object
//This object represent a row from 0 to 2 clouds
//Clouds are added randomly, 'addOrNot' is for this purpose
cloudRow = function(){

    this.clouds = [];
    this.addOrNot = 0;
    
    this.rot = 0;
    
    this.mesh = new THREE.Object3D();
    
}
    
    //function for removing a row
cloudRow.prototype.removeRow = function(){
    this.clouds.splice(0);
    
    scene.remove(this.mesh);
}
    
    //Adds clouds
cloudRow.prototype.addClouds = function(){
    for(var i = 0; i < 3; i++)
    {
      if(this.clouds.length < 2)                                      //no more than 2 clouds
      {
          addOrNot = Math.random();
          if(addOrNot > 0.5){
              var c = new Cloud();
          
              c.mesh.position.x = -cloudPosDelta + cloudPosDelta * i;     //positioning in a row
          
              this.mesh.add(c.mesh);
              this.clouds.push(c);
          
          }
      }
    }
}

//Declaration of a Ground as an object
Ground = function(){

    var geom = new THREE.SphereGeometry(1000,30,30);
    
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
    geom.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI/2));
    
    var l = geom.vertices.length;
    
    this.waves = [];
    
    for(var i = 0; i < l; i++){
    
    var v = geom.vertices[i];
    
    //Each wave is an object with x,y,z coordinations rotaion angel, amplitute and speed of changing
    this.waves.push({y: v.y,
                     x: v.x,
                     z: v.z,
                     ang: Math.random()*Math.PI*2,
                     amp: 5 + Math.random() * 15,
                     speed: 0.016 + Math.random() * 0.042
                  });
    }
    
    var material = new THREE.MeshPhongMaterial({
    color: 0x04579A,
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
function createScene() {

    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    scene = new THREE.Scene();
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;
    camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
    );
    scene.fog = new THREE.Fog(0x9290a6, 100,950);
    camera.position.x = 0;
    camera.position.y = 950;
    camera.position.z = 700;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
    container.setAttribute('style', 'opacity: 1');
    document.getElementById('qrCode').setAttribute('style', 'opacity: 0');
    

    window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

function createLights() {

    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0xffffff, .9)
    shadowLight = new THREE.DirectionalLight(0xffffff, .9);
    shadowLight.position.set(150, 350, 350);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    scene.add(hemisphereLight);
    scene.add(shadowLight);
}

function createGround(){
    ground = new Ground();

    ground.mesh.position.x = 0;
    ground.mesh.position.y = 0;
    ground.mesh.position.z = 0;

    scene.add(ground.mesh);
}

function createSideClouds(){
    sideClouds = new SideClouds();
    scene.add(sideClouds.mesh);
}

//Function for updating each object in a scene
function loop(){


    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;	

     requestAnimationFrame(loop);                                      //update an animation before the next repaint
  
    if(airplane){
        // if(WIDTH < HEIGHT){
        //     if(clock.running)
        //         clock.stop();
            
        //     container.setAttribute('style', 'opacity: 0');
        //     document.getElementById('rotate').setAttribute('style', 'opacity: 1');
        //     document.getElementById('qrCode').setAttribute('style', 'opacity: 0');
        //     return;
        // }
        // else{
            // if(clock.running == false && airplane.mesh.visible){
            //     clock.start();
            //     container.setAttribute('style', 'opacity: 1');
            //     document.getElementById('rotate').setAttribute('style', 'opacity: 0');
            //     document.getElementById('qrCode').setAttribute('style', 'opacity: 0');
            // }

            updateFlamingo();                                                 //flamingo behavior	

            delta = clock.getDelta();

            //mixer.update(delta);                                              //update animation every 'delta' seconds


              airplane.pilot.updateHairs();
              airplane.propeller.rotation.x += 0.3;

           // ground.moveWaves();
           // ground.mesh.rotation.x += 0.005;
                
           //  sideClouds.mesh.rotation.x += 0.007;

            // //clouds rotaion and collision detection
            // for(var i = 0; i < cloudRowsCount; i++)
            // {
            //     //if any clouds in a row
            //     if(cloudRows[i].clouds.length > 0){
            //         cloudRows[i].mesh.getWorldPosition(cloudRowGlobalPosition);                                     //'cloudRowGlobalPosition' holds global position of each row of clouds
            //         for(var j = 0; j < cloudRows[i].clouds.length; j++){                                           //cheking collision for every cloud
            //             flaPos = flaPos.setFromMatrixPosition( airplane.mesh.matrixWorld );

            //             cloudRows[i].clouds[j].mesh.getWorldPosition(cloudGlobalPosition);                          //'cloudGlobalPosition' holds global position of each cloud
                
            //                 //collision detection
            //             if(flaPos.distanceTo(cloudGlobalPosition) < 20                                              
            //                 && cloudRowGlobalPosition.y > 150                                                       //this line removes the bug of collision with newly created clouds 
            //                 && airplane.mesh.visible === true){

            //                 airplane.mesh.visible = false;
            //                 clock.stop();
            //                 againButton.style.opacity = 1; 
            //             }	
            //         }
            //     }
                
            //     cloudRows[i].mesh.rotation.x += 0.009;
                
            //     cloudRows[i].rot += rotUpdate;

            // //removes a cloud row every lap and makes new one to change a position of obstacles
            //     if(cloudRows[i].rot >= 6.18)
            //     {
            //     cloudRows[i].removeRow();
            //     cloudRows[i] = new cloudRow();
            
            //     cloudRows[i].addClouds();
                    
            //     cloudRows[i].rot = 0;
            //     scene.add(cloudRows[i].mesh);
                    
            //     }

            // //circular motion of clouds
            //     cloudRows[i].mesh.position.z = cloudH * Math.cos(cloudRows[i].rot);
            //     cloudRows[i].mesh.position.y = -cloudH * Math.sin(cloudRows[i].rot);

           // }

            //updates the score
            // if(Math.floor(clock.elapsedTime) > score || score > clock.elapsedTime){
            //     if(Math.floor(clock.elapsedTime) > score)
            //         score = Math.floor(clock.elapsedTime);
            //     if(score > Math.floor(clock.elapsedTime))
            //         score += score.Math.floor(clock.elapsedTime);
            //     scoreText.innerHTML = "Flight time is " + score + " seconds.";
            // }
        
            // if(score % 4 === 0){
            //     rotUpdate+=0.00001;
            // }

            renderer.render(scene, camera);                                               //scene rendering
        }
    //}
}

//updates the position of flamingo and keeps it in [-100; 100]
function updateFlamingo(){
if(airplane){
  if(fPos){
    airplane.mesh.position.x += fPos;
   }
   else
    //airplane.mesh.position.x += 1;
    //alert(fPos);

    if(airplane.mesh.position.x > 100)
      airplane.mesh.position.x = 100;
    else if(airplane.mesh.position.x < -100)
      airplane.mesh.position.x = -100;

    //alert("x " + airplane.mesh.position.x + " y " + airplane.mesh.position.y + " z " + airplane.mesh.position.z +" "+ flaPos)
  }
}

//getting data from the accelerometer
function handleOrientation(event){
    alert(event.accelerationIncludingGravity.y);
    alert("xc");
    fPos = event.accelerationIncludingGravity.y;

    //fPos = 0;
}

//invokes 'init' function when window is loaded
window.addEventListener('load', init, false);
}
else{

}
