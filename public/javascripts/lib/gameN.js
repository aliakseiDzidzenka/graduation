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
var loader = new THREE.JSONLoader();

var Colors = {
    yellowPlane:0xff9000,
    white:0xd8d0d1,
    pink:0xF5986E,
    brown:0x59332e,
    brownDark:0x23190f,
    blue:0x68c3c0,
};

//This function initialises our scene
function init(event){

    window.addEventListener('devicemotion', handleOrientation);




    createScene();
    createLights();
    createGround();
    createSideClouds();
    createPlane();


    //first initialising of each cloud row
    for(var i = 0; i < cloudRowsCount; i++){
    cloudRows[i] = new cloudRow();
    
    cloudRows[i].addClouds();
    cloudRows[i].rot = globalRot * i;
    
    scene.add(cloudRows[i].mesh);
    }


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


function createPlane(){
  airplane = new AirPlane();
  airplane.mesh.scale.set(.3,.3,.3);
  airplane.mesh.rotation.x = 0.2;
  airplane.mesh.lookAt(new THREE.Vector3(0,1,0));
  airplane.mesh.rotation.y = 1.57;
  airplane.mesh.position.x = 0;
  airplane.mesh.position.y = 930;
  airplane.mesh.position.z = 480;
  scene.add(airplane.mesh);
  // console.log("created " + airplane.mesh.position.x + " " + airplane.mesh.position.y + " " + airplane.mesh.position.z);
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
        if(WIDTH < HEIGHT){
            if(clock.running)
                clock.stop();
            
            container.setAttribute('style', 'opacity: 0');
            document.getElementById('rotate').setAttribute('style', 'opacity: 1');
            document.getElementById('qrCode').setAttribute('style', 'opacity: 0');
            return;
        }
        else{
            if(clock.running == false && airplane.mesh.visible){
                clock.start();
                container.setAttribute('style', 'opacity: 1');
                document.getElementById('rotate').setAttribute('style', 'opacity: 0');
                document.getElementById('qrCode').setAttribute('style', 'opacity: 0');
            }

            updateAirplane();                                                 //flamingo behavior	

            delta = clock.getDelta();

            //mixer.update(delta);                                              //update animation every 'delta' seconds


              airplane.pilot.updateHairs();
              airplane.propeller.rotation.x += 0.3;

           ground.moveWaves();
           ground.mesh.rotation.x += 0.005;
                
            sideClouds.mesh.rotation.x += 0.007;

            //clouds rotaion and collision detection
            for(var i = 0; i < cloudRowsCount; i++)
            {
                //if any clouds in a row
                if(cloudRows[i].clouds.length > 0){
                    cloudRows[i].mesh.getWorldPosition(cloudRowGlobalPosition);                                     //'cloudRowGlobalPosition' holds global position of each row of clouds
                    for(var j = 0; j < cloudRows[i].clouds.length; j++){                                           //cheking collision for every cloud
                        flaPos = flaPos.setFromMatrixPosition( airplane.mesh.matrixWorld );

                        cloudRows[i].clouds[j].mesh.getWorldPosition(cloudGlobalPosition);                          //'cloudGlobalPosition' holds global position of each cloud
                
                            //collision detection
                        if(flaPos.distanceTo(cloudGlobalPosition) < 20                                              
                            && cloudRowGlobalPosition.y > 150                                                       //this line removes the bug of collision with newly created clouds 
                            && airplane.mesh.visible === true){

                            airplane.mesh.visible = false;
                            clock.stop();
                            againButton.style.opacity = 1; 
                        }	
                    }
                }
                
                cloudRows[i].mesh.rotation.x += 0.009;
                
                cloudRows[i].rot += rotUpdate;

            //removes a cloud row every lap and makes new one to change a position of obstacles
                if(cloudRows[i].rot >= 6.18)
                {
                cloudRows[i].removeRow();
                cloudRows[i] = new cloudRow();
            
                cloudRows[i].addClouds();
                    
                cloudRows[i].rot = 0;
                scene.add(cloudRows[i].mesh);
                    
                }

            //circular motion of clouds
                cloudRows[i].mesh.position.z = cloudH * Math.cos(cloudRows[i].rot);
                cloudRows[i].mesh.position.y = -cloudH * Math.sin(cloudRows[i].rot);

           }

            //updates the score
            if(Math.floor(clock.elapsedTime) > score || score > clock.elapsedTime){
                if(Math.floor(clock.elapsedTime) > score)
                    score = Math.floor(clock.elapsedTime);
                if(score > Math.floor(clock.elapsedTime))
                    score += score.Math.floor(clock.elapsedTime);
                scoreText.innerHTML = "Flight time is " + score + " seconds.";
            }
        
            if(score % 4 === 0){
                rotUpdate+=0.00001;
            }

            renderer.render(scene, camera);                                               //scene rendering
        }
    }
}

//updates the position of flamingo and keeps it in [-100; 100]
function updateAirplane(){
if(airplane){
  if(fPos){
    airplane.mesh.position.x += fPos;
   }


    if(airplane.mesh.position.x > 100)
      airplane.mesh.position.x = 100;
    else if(airplane.mesh.position.x < -100)
      airplane.mesh.position.x = -100;

    //alert("x " + airplane.mesh.position.x + " y " + airplane.mesh.position.y + " z " + airplane.mesh.position.z +" "+ flaPos)
  }
}


//getting data from the accelerometer
function handleOrientation(event){

    fPos = event.accelerationIncludingGravity.y;

}

//invokes 'init' function when window is loaded
window.addEventListener('load', init, false);
}
else{

}
