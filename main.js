// import eruda from 'eruda';
// eruda.init();
import * as THREE from 'three';
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
//import * as Colyseus from 'colyseus.js'

// var client = new Colyseus.Client('ws://localhost:2567');
// client.joinOrCreate("room_name").then(room => {
//       console.log(room.sessionId, "joined", room.name);
//       }).catch(e => {
//           console.log("JOIN ERROR", e);
//           });







// import Stats from 'stats.js';


const endCard = document.getElementById('endCard');
//const modelLoader = new GLTFLoader();

const startBtn = document.getElementById('start');
const playPauseBtn = document.getElementById('playPauseBtn');
const infoBtn = document.getElementById('info');

//how to play button 

const htpBtn = document.getElementById('htp');
var playPauseAvailable = false;

const leftBtn = document.getElementById('left');

const rightBtn = document.getElementById('right');

const jumperBtn = document.getElementById('jumper');


const scoreOnPage = document.getElementById('score');


const finalScore = document.getElementById('finalScore');


const startMenu = document.getElementById('startMenu');

const restartBtn = document.getElementById('restart');

// const stats = new Stats();
// stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild(stats.dom);


const scene = new THREE.Scene();
//scene.background = new THREE.Color(0xaaea9c);
scene.fog = new THREE.Fog(new THREE.Color(0xa4ff8d), 0 , 10);
//scene.backgroundIntensity = 0.1;

const cameraRatio = window.innerWidth / window.innerHeight;



const camera = new THREE.PerspectiveCamera(90, cameraRatio, 0.1, 15000)



setTimeout(() => {
  startScene();
}, 1000);





const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0); // Set the light's position
scene.add(directionalLight);


const canvasWidth = window.innerWidth;

const canvasHeight = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.pixelRatio = window.devicePixelRatio / 3;

renderer.setSize(canvasWidth, canvasHeight, false);


document.body.appendChild(renderer.domElement);




var highestJumpAmount;
function startScene() {
  console.error('Window Width : ' + window.innerWidth + ' Window Height : ' + window.innerHeight);
  if (window.innerWidth > window.innerHeight) {
    camera.position.set(0, player.position.y -1 +  3, player.position.z + 1.7);
    
    camera.rotation.x = (-0.7);
    scene.fog.near = 0;
    scene.fog.far = 10;
    highestJumpAmount = 2.2;
  }
  else {
    camera.position.set(0 ,player.position.y -1 + 3.5, player.position.z + 4);
   
    camera.rotation.x = (-0.37);
    scene.fog.near = 1;
    scene.fog.far = 15;
    highestJumpAmount = 2.5;
  }
  // console.log(camera.position);
  // console.log(player.position)
}




const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const skyboxGeo = new THREE.BoxGeometry(200, 200, 200);
const skybox = new THREE.Mesh(skyboxGeo, new THREE.MeshStandardMaterial({
  color: 0xa4ff8d85,
  side: THREE.BackSide
}));
scene.add(skybox);




const playerGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);

const playerMat = [
  new THREE.MeshLambertMaterial({ color: 0x00ff00 }),   // Right side (bright green)
  new THREE.MeshLambertMaterial({ color: 0x008000 }),   // Left side (dark green)
  new THREE.MeshLambertMaterial({ color: 0x00ff00 }),   // Top side (medium green)
  new THREE.MeshLambertMaterial({ color: 0x00cc00 }),   // Bottom side (yellow)
  new THREE.MeshLambertMaterial({ color: 0x00aa00 }),   // Front side (light green)
  new THREE.MeshLambertMaterial({ color: 0x006600 })    // Back side (darker green)
];

const player = new THREE.Mesh(playerGeo, playerMat);




player.position.y = 1;

scene.add(player);


const playerBB = new THREE.Box3();

playerBB.setFromObject(player);


const groundLength = 200;

const groundGeo = new THREE.BoxGeometry(5, 1, 250);

const groundMat = new THREE.MeshBasicMaterial({ color: 0x0000ff });

const ground = new THREE.Mesh(groundGeo, groundMat);

ground.position.z = -110;

scene.add(ground);


const enemyX = [-1.5, 0, 1.5];

const enemies = [];


for (let i = 0; i < 100; i++) {

  const enemyGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);

  const enemyMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  const enemy = new THREE.Mesh(enemyGeo, enemyMat);

  enemies.push(enemy);

  scene.add(enemy);

  enemy.position.y = 1;

  enemy.position.z = -5 - Math.random() * (groundLength - 5);

  enemy.position.x = enemyX[Math.floor(Math.random() * 3)];

} // just for emergency


// const enemyGeo = new THREE.BoxGeometry();

// const enemyMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// const enemy = new THREE.InstancedMesh(enemyGeo, enemyMat , 100);

// scene.add(enemy)

// const dummyEnemy = new THREE.Object3D();

// console.log(enemy)


// for (let i = 0; i < 100; i++) {

// dummyEnemy.position.set(enemyX[Math.floor(Math.random() * 3)] , 1 , (-5 - Math.random() * (groundLength - 5)));

// dummyEnemy.updateMatrix()

// enemy.setMatrixAt(i , dummyEnemy.matrix);

// enemies.push(enemy);


// }

// console.log(enemies)


let score = 0;
var shouldPlay = false;

function start() {

  shouldPlay = true;
  playPauseBtn.style.visibility = 'visible';
  startMenu.style.visibility = 'hidden';

}


startBtn.addEventListener('click', start);





setInterval(() => {

  if (shouldPlay)

    score++;

  scoreOnPage.innerHTML = score.toString() + ' m'

}, 200)

document.body.click = () => {
  document.body.requestFullscreen();
}

window.addEventListener('orientationchange', () => {

  console.warn('orientation changed' + ' inner width is : ' + window.innerWidth + ' inner height is : ' + window.innerHeight)
  setTimeout(() => {
    startScene();
    console.log(camera.position);
  }, 1000);
})

function animate() {

  requestAnimationFrame(animate);


  if (shouldPlay) {

    player.position.z -= 0.1;
    skybox.position.z -= 0.1;
    camera.position.z -= 0.1;




    playerBB.setFromObject(player);
    checkCollision();


    if (player.position.y > 1)
      player.position.y -= 0.07;


    player.rotation.z = ground.rotation.z;
    enemies.forEach((enemy) => {
      enemy.rotation.z = ground.rotation.z;
    });

    // ground rotation and camera position based  on player position

    //ground.rotation.z = -0.2


    if (player.position.x > 0) {
      if (camera.position.x < 1) { camera.position.x += 0.03 }
      if (ground.rotation.z > -0.2) {
        ground.rotation.z -= 0.01;
      }
    }


    if (player.position.x < 0) {
      if (camera.position.x > -1)
        camera.position.x -= 0.03

      if (ground.rotation.z < 0.2) {
        ground.rotation.z += 0.01;
      }
    }

    if (player.position.x == 0) {
      if (camera.position.x > 0) {
        camera.position.x -= 0.04;
      }
      if (camera.position.x < 0) {
        camera.position.x += 0.02;
      }
      if (ground.rotation.z > 0) {
        ground.rotation.z -= 0.02
      }
      if (ground.rotation.z < 0) {
        ground.rotation.z += 0.02
      }


    }








  }

  // Update player's bounding box position







  //effectComposer.render(scene, camera);
  renderer.render(scene , camera);
  // stats.end();

}


function checkCollision() {

  for (const enemy of enemies) {

    const enemyBB = new THREE.Box3();

    enemyBB.setFromObject(enemy);


    if (playerBB.intersectsBox(enemyBB)) {

      // Collision detected!

      //console.error('Collision with enemy!');

      endCard.style.visibility = "visible";
      playPauseBtn.style.visibility = 'hidden';
      shouldPlay = false;

      finalScore.innerHTML = score.toString();
      playPauseAvailable = false;



    }

  }

}


animate();







function restart() {

  player.position.set(0, 1, 0);
  skybox.position.set(0 , 0 , -90);
  playPauseBtn.style.visibility = 'visible';
  startScene();
  

  endCard.style.visibility = 'hidden'

  startMenu.style.visibility = 'visible';
   score = 0;
}


restartBtn.addEventListener('click', restart)





// player controls
// player controls
// player controls

function jump() {

  if (player.position.y < 1.7) {

    player.position.y += highestJumpAmount;

  }

}

function moveLeft() {

  if (player.position.x > -1) {

    player.position.x -= 1.35;

  }

}


function moveRight() {

  if (player.position.x < 1) {

    player.position.x += 1.35;

  }


}
var shouldPlayPauseAvailable = false;


// leftBtn.addEventListener('click', moveLeft);

// rightBtn.addEventListener('click', moveRight);

// jumperBtn.addEventListener('click', jump)


window.onkeydown = (event) => {

  var key = event.key;

  //console.log(key);

  if (shouldPlay) {

    if (key === 'a' || key == 's' || key == '4' || key == 'ArrowLeft' || key == 'j' || key == 'k') {

      moveLeft();

    }

    else if (key === 'd' || key == 'f' || key == '6' || key == 'ArrowRight' || key == 'l' || key == ';') {

      moveRight();

    }

    else if (key === ' ' || key == '5') {

      jump();

    }

    else {

      console.log('key not set for anything');


    }

  }

  if (key === 'Enter' || key == '5') {

    //console.log('enter pressed');

    if (endCard.style.visibility != 'hidden') {

      restart();
      playPauseBtn.style.visibility = 'visible';
    }


    if (startMenu.style.visibility == 'visible') {

      start();
      playPauseBtn.style.visibility = 'visible';
    }


  }

}



playPauseBtn.addEventListener('click', (e) => {
  console.log(player.position);
  if (shouldPlay === false) {
    shouldPlay = true;
    playPauseBtn.innerText = 'Pause';
    return;
  }

  if (shouldPlay) {
    shouldPlay = false;
    playPauseBtn.innerText = "Play";
    return;
  }
  console.log(shouldPlay);
});









window.addEventListener('resize', () => {

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight, true);

})


//console.log(renderer.info.render)

//console.info(renderer.info.render);

// setTimeout(() => {
//   console.error(effectComposer.renderer.info.render)
// }, 12000);




// setInterval(() => {
//   console.log(camera.position)
// }, 2000);





// adding side buildings 


function sideBuildingFirstRow() {
  const noOfInstace = 600;
  const sideBuilding = new THREE.InstancedMesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0x576563 }), noOfInstace);
  scene.add(sideBuilding);
  const justToApplyMatrixToSideBuildings = new THREE.Object3D();
  const sideBuildingX = [2.9, -2.9];
  const sideBuildingY = [-1.2, -1.7, -2]
  var sideBuildingInitialZ = -12;
  // first left and right row
  for (let index = 0; index < noOfInstace; index++) {
    sideBuildingInitialZ+= 1.3;
    justToApplyMatrixToSideBuildings.position.set(sideBuildingX[Math.floor(Math.random() * sideBuildingX.length)], sideBuildingY[Math.floor(Math.random() * sideBuildingY.length)], -sideBuildingInitialZ);
    justToApplyMatrixToSideBuildings.scale.y = 7;
    justToApplyMatrixToSideBuildings.updateMatrix();
    sideBuilding.setMatrixAt(index, justToApplyMatrixToSideBuildings.matrix);
  }
}
sideBuildingFirstRow();

function sideBuildingSecondRow() {
  const noOfInstace = 600;
  const sideBuilding = new THREE.InstancedMesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0x576563 }), noOfInstace);
  scene.add(sideBuilding);
  const justToApplyMatrixToSideBuildings = new THREE.Object3D();
  const sideBuildingX = [4.2, -4.2];
  const sideBuildingY = [-0.3, -0.6, -1]
  var sideBuildingInitialZ = -12;
  // first left and right row
  for (let index = 0; index < noOfInstace; index++) {
    sideBuildingInitialZ += 1.3;
    justToApplyMatrixToSideBuildings.position.set(sideBuildingX[Math.floor(Math.random() * sideBuildingX.length)], sideBuildingY[Math.floor(Math.random() * sideBuildingY.length)], -sideBuildingInitialZ);
    justToApplyMatrixToSideBuildings.scale.y = 7;
    justToApplyMatrixToSideBuildings.updateMatrix();
    sideBuilding.setMatrixAt(index, justToApplyMatrixToSideBuildings.matrix);
  }
}
sideBuildingSecondRow();

function sideBuildingThirdRow() {
  const noOfInstace = 600;
  const sideBuilding = new THREE.InstancedMesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0x576563 }), noOfInstace);
  scene.add(sideBuilding);
  const justToApplyMatrixToSideBuildings = new THREE.Object3D();
  const sideBuildingX = [5.4, -4.2];
  const sideBuildingY = [-0.3, -0.6, -1]
  var sideBuildingInitialZ = -12;
  // first left and right row
  for (let index = 0; index < noOfInstace; index++) {
    sideBuildingInitialZ += 1.3;
    justToApplyMatrixToSideBuildings.position.set(sideBuildingX[Math.floor(Math.random() * sideBuildingX.length)], sideBuildingY[Math.floor(Math.random() * sideBuildingY.length)], -sideBuildingInitialZ);
    justToApplyMatrixToSideBuildings.scale.y = 7;
    justToApplyMatrixToSideBuildings.updateMatrix();
    sideBuilding.setMatrixAt(index, justToApplyMatrixToSideBuildings.matrix);
  }
}
sideBuildingThirdRow();






// modelLoader.load('scene.glb' , (gltf)=>{
//   console.log(gltf);
//   const sideBuildingModel = gltf.scene;
//   const sideBuilding = new THREE.InstancedMesh(sideBuildingModel  , new THREE.MeshStandardMaterial() , 3);
//   sideBuildingModel.position.x = 6.6;
//   const instancedModel = new THREE.InstancedMesh(sideBuildingModel.children[0].geometry , sideBuilding.children[0].material , 20);
//   scene.add(instancedModel);
//   scene.add(sideBuildingModel);
// })


setInterval(() => {
  if(player.position.z < -200){
    player.position.z = 7;
    skybox.position.z = -50;
    startScene()
  }
}, 1000);




export {
  player,
  moveLeft,
  moveRight,
  jump
};


document.body.addEventListener('click' , ()=>{document.body.requestFullscreen();})