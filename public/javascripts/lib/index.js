var Colors = {
    yellowPlane:0xff9000,
    plane2:0x33673b,
    white:0xd8d0d1,
    pink:0xF5986E,
    brown:0x59332e,
    brownDark:0x23190f,
    blue:0x68c3c0,
};


var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container;


var HEIGHT, WIDTH;

var  hemisphereLight, shadowLight;

var gameObjectsRowsCount = 8;
var s = -1 * Math.PI / 2;
var controls;

var nextButton, prevButton, toGameButton;

var planes = [];
var plane;
var selected = 0;

function createScene() {

    HEIGHT = window.innerHeight/3;
    WIDTH = document.getElementById('plane').offsetWidth;

    scene = new THREE.Scene();
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 1000;
    camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
    );
    scene.fog = new THREE.Fog(0x9290a6, 100,950);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 40;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    container = document.getElementById('plane');
    container.appendChild(renderer.domElement);
    container.setAttribute('style', 'opacity: 1');

    //controls = new THREE.OrbitControls(camera);
    //controls.update();
    
    

    window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
    HEIGHT = window.innerHeight/3;
    WIDTH = document.getElementById('plane').offsetWidth;
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


function init(event){



    createScene();
    createLights();

    createDefaultPlane();
    // createDoubleWingPlane();
    // createSharpPlane();
    // createWhiteSharpPlane();
    // createBrownSharpPlane();
     loop();
}


function createDefaultPlane(){

  // var name = getCookie('selected');
  // alert(name);
  if(defaultPlane){
      plane = new AirPlane();
  }
  else{
    var name = getCookie('selected')
    switch(name){
        case 'doubleWingPlane':
            plane = new DoubleWingPlane();
            break;
        case 'sharpPlane':
            plane = new SharpPlane();
            break;
        case 'default':
        default:
            plane = new AirPlane();
            break;
    }
  }

  plane.mesh.scale.set(.2,.2,.2);
  //airplane.mesh.rotation.x = 0.2;
  plane.mesh.lookAt(new THREE.Vector3(0,0,0));
  plane.mesh.rotation.y = Math.PI + 0.5;
  //airplane.mesh.rotation.x = 1.57;
  plane.mesh.position.x = 0;
  plane.mesh.position.y = -5;
  plane.mesh.position.z = 0;
  scene.add(plane.mesh);

  planes.push(plane);
  // console.log("created " + airplane.mesh.position.x + " " + airplane.mesh.position.y + " " + airplane.mesh.position.z);
}

function loop() {

    HEIGHT = window.innerHeight/3;
    WIDTH = document.getElementById('plane').offsetWidth;
    
    requestAnimationFrame( loop );

    planes[0].pilot.updateHairs();
    planes[0].propeller.rotation.x += 0.6;
    planes[0].mesh.position.y += Math.sin(s*5) / 5;
    s+=0.01;
    //planes[0].mesh.rotation.y += 0.050;

    renderer.render( scene, camera );
}


window.addEventListener('load', init, false);
