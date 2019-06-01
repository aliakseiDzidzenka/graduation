var title = document.getElementById('title');
var planeId = document.getElementById('buy');

var Colors = {
    yellowPlane:0xff9000,
    plane2:0x33673b,
    white:0xd8d0d1,
    pink:0xF5986E,
    brown:0x59332e,
    brownDark:0x23190f,
    blue:0x68c3c0,
};


// var planePlane;
// var plane;
// var plane;
// var plane;
// var plane;

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
var lightIn = true;
function createScene() {

    HEIGHT = window.innerHeight/3;
    WIDTH = window.innerWidth/12*8;

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
    camera.position.z = 100;

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
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight/3;
    WIDTH = window.innerWidth/12*8;
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

    // for (var i = 0; i < planeNames.length; i++) {
    //   switch(planeNames[i]){
    //     case 'default':
    //       createDefaultPlane();
    //       break;
    //     case 'doubleWingPlane':
    //       createDoubleWingPlane();
    //       break;
    //     case 'sharpPlane':
    //       createSharpPlane();
    //       break;
    //   }
    // }

    createDefaultPlane();
    createDoubleWingPlane();
    createSharpPlane();
    // createWhiteSharpPlane();
    // createBrownSharpPlane();

    // alert(getCookie('selected'));
    // document.cookie = "selected=" + 'default';


    for(var i = 0; i < planes.length; i++){
        // if(planes[i].name == getCookie('selected')){
        //     planes[i].mesh.position.set(-30,0,0);
        //     selected = i;
        // }
        // else{
            planes[i].mesh.position.set(0,100,0);
        // }
    }
    planes[0].mesh.position.set(10,0,0);
    selected = 0;

    prevButton = document.getElementById('buy-prev');
    nextButton = document.getElementById('buy-next');
    var title = document.getElementById('title');
    var planeId = document.getElementById('buy');
  
    nextButton.onclick = function(){
        //alert("next");

        
        if(selected < planes.length - 1){
            planes[selected].mesh.position.y = 100;
            //if(selected != planes.length)
            selected++;
            planes[selected].mesh.position.y = 0;
            planes[selected].mesh.position.x = 0;
            document.cookie = "selected=" + planes[selected].name;
            
            title.innerHTML = planeNames[selected];
            var planeId = document.getElementById('buy');
            planeId.setAttribute('href', 'planes/' + planeIds[selected]);
            //planeId.setAttribute('style', 'display:block');

            if(userPlaneNames.includes(planeNames[selected]) == false){
              planeId.setAttribute('style', 'display:block');
              if(lightIn){
                scene.remove(shadowLight);
                lightIn = false;
              }

            }
            else{
              planeId.setAttribute('style', 'display:none');
              if (lightIn == false){
                scene.add(shadowLight);
                lightIn = true;
              }
            }
        }
        // console.log(selected);
        // console.log(getCookie('selected'));
    }



    prevButton.onclick = function(){
        //alert('prev');
        if(selected > 0){
            planes[selected].mesh.position.y = 100;
            //if(selected != 0)
            selected--;
            planes[selected].mesh.position.y = 0;
            planes[selected].mesh.position.x = 10;
            document.cookie = "selected=" + planes[selected].name;
            title.innerHTML = planeNames[selected];
            var planeId = document.getElementById('buy');
            planeId.setAttribute('href', 'planes/' + planeIds[selected]);
            if(userPlaneNames.includes(planeNames[selected]) == false){
              planeId.setAttribute('style', 'display:block');
              if(lightIn){
                scene.remove(shadowLight);
                lightIn = false;
              }

            }
            else{
              planeId.setAttribute('style', 'display:none');
              if (lightIn == false){
                scene.add(shadowLight);
                lightIn = true;
              }
            }
            // console.log(getCookie('selected'));

        }
        // console.log(selected);
        // console.log(getCookie('selected'));
    }



    
    // prevButton.setAttribute('id', 'prev');
    // prevButton.textContent = 'Prev';
    // prevButton.style.position = 'absolute';




    
    // nextButton.setAttribute('id', 'next');
    // nextButton.textContent = 'Next';
    // nextButton.style.position = 'absolute';


    // toGameButton = document.createElement('button');
    // toGameButton.setAttribute('id', 'game');
    // toGameButton.textContent = 'To game';
    // toGameButton.style.position = 'absolute';

    // document.body.appendChild(nextButton);
    // document.body.appendChild(prevButton);
    // document.body.appendChild(toGameButton);

    


    


    // toGameButton.onclick = function(){        
    //     window.location.href='/game/index';
    // }


    loop();
}

function createDefaultPlane(){
  plane = new AirPlane();
  plane.mesh.scale.set(.4,.4,.4);
  //airplane.mesh.rotation.x = 0.4;
  plane.mesh.lookAt(new THREE.Vector3(0,0,0));
  plane.mesh.rotation.y = Math.PI + 0.5;
  //airplane.mesh.rotation.x = 1.57;
  plane.mesh.position.x = -100;
  console.log(-WIDTH / 2);
  plane.mesh.position.y = 0;
  plane.mesh.position.z = 0;
  scene.add(plane.mesh);

  planes.push(plane);
  // console.log("created " + airplane.mesh.position.x + " " + airplane.mesh.position.y + " " + airplane.mesh.position.z);
}

function createDoubleWingPlane(){
  plane = new DoubleWingPlane();
  plane.mesh.scale.set(.4,.4,.4);
  //airplane.mesh.rotation.x = 0.4;
  plane.mesh.lookAt(new THREE.Vector3(0,0,0));
  plane.mesh.rotation.y = Math.PI + 0.5;
  //airplane.mesh.rotation.x = 1.57;
  plane.mesh.position.x = -60;
  plane.mesh.position.y = 0;
  plane.mesh.position.z = 0;
  scene.add(plane.mesh);
  planes.push(plane);
  // console.log("created " + airplane.mesh.position.x + " " + airplane.mesh.position.y + " " + airplane.mesh.position.z);
}

function createSharpPlane(){
  plane = new SharpPlane();
  plane.mesh.scale.set(.4,.4,.4);
  //airplane.mesh.rotation.x = 0.4;
  plane.mesh.lookAt(new THREE.Vector3(0,0,0));
  plane.mesh.rotation.y = Math.PI + 0.5;
  //airplane.mesh.rotation.x = 1.57;
  plane.mesh.position.x = -20;
  plane.mesh.position.y = 0;
  plane.mesh.position.z = 0;
  scene.add(plane.mesh);
  planes.push(plane);
  // console.log("created " + airplane.mesh.position.x + " " + airplane.mesh.position.y + " " + airplane.mesh.position.z);
}

function createWhiteSharpPlane(){
  plane = new WhiteSharpPlane();
  plane.mesh.scale.set(.4,.4,.4);
  //airplane.mesh.rotation.x = 0.4;
  plane.mesh.lookAt(new THREE.Vector3(0,0,0));
  plane.mesh.rotation.y = Math.PI + 0.5;
  //airplane.mesh.rotation.x = 1.57;
  plane.mesh.position.x = 20;
  plane.mesh.position.y = 0;
  plane.mesh.position.z = 0;
  scene.add(plane.mesh);
  planes.push(plane);
  // console.log("created " + airplane.mesh.position.x + " " + airplane.mesh.position.y + " " + airplane.mesh.position.z);
}

function createBrownSharpPlane(){
  plane = new BrownSharpPlane();
  plane.mesh.scale.set(.4,.4,.4);
  //airplane.mesh.rotation.x = 0.4;
  plane.mesh.lookAt(new THREE.Vector3(0,0,0));
  plane.mesh.rotation.y = Math.PI + 0.5;
  //airplane.mesh.rotation.x = 1.57;
  plane.mesh.position.x = 60;
  plane.mesh.position.y = 0;
  plane.mesh.position.z = 0;
  scene.add(plane.mesh);
  planes.push(plane);
  // console.log("created " + airplane.mesh.position.x + " " + airplane.mesh.position.y + " " + airplane.mesh.position.z);
}

function loop() {

    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    HEIGHT = window.innerHeight/4;
    WIDTH = window.innerWidth/12*8;
    if(WIDTH < HEIGHT){
            // container.setAttribute('style', 'opacity: 0');
            // document.getElementById('rotate').setAttribute('style', 'opacity: 1');
            // document.getElementById('open').setAttribute('style', 'opacity: 1');
            // document.getElementById('close').setAttribute('style', 'opacity: 1');
            // document.getElementById('next').setAttribute('style', 'opacity: 0');
            // document.getElementById('prev').setAttribute('style', 'opacity: 0');
            // document.getElementById('game').setAttribute('style', 'opacity: 0');

    }
    else{
        // container.setAttribute('style', 'opacity: 1');
        // document.getElementById('rotate').setAttribute('style', 'opacity: 0');
        // document.getElementById('open').setAttribute('style', 'opacity: 0');
        // document.getElementById('close').setAttribute('style', 'opacity: 0');
        // document.getElementById('next').setAttribute('style', 'opacity: 1');
        // document.getElementById('prev').setAttribute('style', 'opacity: 1');
        // document.getElementById('game').setAttribute('style', 'opacity: 1');

    }
    requestAnimationFrame( loop );

    planes[selected].pilot.updateHairs();
    planes[selected].propeller.rotation.x += 0.6;
    planes[selected].mesh.position.y += Math.sin(s*5) / 5;
    s+=0.01;
    planes[selected].mesh.rotation.y += 0.050;

    renderer.render( scene, camera );
}


window.addEventListener('load', init, false);

