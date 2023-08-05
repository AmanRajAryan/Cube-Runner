import * as THREE from 'three';



import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'


import Stats from 'stats.js';


const endCard = document.getElementById('endCard');

const startBtn = document.getElementById('start');

const infoBtn = document.getElementById('info');

//how to play button 

const htpBtn = document.getElementById('htp');


const leftBtn = document.getElementById('left');

const rightBtn = document.getElementById('right');

const jumperBtn = document.getElementById('jumper');


const scoreOnPage = document.getElementById('score');


const finalScore = document.getElementById('finalScore');


const startMenu = document.getElementById('startMenu');

const restartBtn = document.getElementById('restart');

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);


const scene = new THREE.Scene();

const cameraRatio = window.innerWidth / window.innerHeight;

// const camera = new THREE.PerspectiveCamera(90, cameraRatio, 0.1, 10);

const camera = new THREE.PerspectiveCamera(90, cameraRatio, 0.1, 10)

camera.position.set(0, 3.3, 2.5);

camera.rotateX(-0.5);


const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0); // Set the light's position
scene.add(directionalLight);


const canvasWidth = window.innerWidth;

const canvasHeight = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.pixelRatio = window.devicePixelRatio / 3;

renderer.setSize(canvasWidth, canvasHeight, false);

const renderScene = new RenderPass(scene, camera
);

const effectComposer = new EffectComposer(renderer);




effectComposer.addPass(renderScene)

document.body.appendChild(renderer.domElement);

const bloonPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.7, 2, 0.1);

effectComposer.addPass(bloonPass);


const ambientLight = new THREE.AmbientLight(0xffffff , 2);
scene.add(ambientLight);






const playerGeo = new THREE.BoxGeometry(1, 1, 1);

const playerMat = [
  new THREE.MeshLambertMaterial({ color: 0x00ff00 }),   // Right side (bright green)
  new THREE.MeshLambertMaterial({ color: 0x008000 }),   // Left side (dark green)
  new THREE.MeshLambertMaterial({ color: 0xffff00 }),   // Top side (medium green)
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

const groundGeo = new THREE.BoxGeometry(3.5, 1, groundLength);

const groundMat = new THREE.MeshBasicMaterial({ color: 0x0000ff });

const ground = new THREE.Mesh(groundGeo, groundMat);

ground.position.z = -97;

scene.add(ground);


const enemyX = [-1.1, 0, 1.1];

const enemies = [];


for (let i = 0; i < 100; i++) {

  const enemyGeo = new THREE.BoxGeometry();

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



var shouldPlay = false;

function start() {

  shouldPlay = true;

  startMenu.style.visibility = 'hidden';

}


startBtn.addEventListener('click', start);



let score = 0;

setInterval(() => {

  if (shouldPlay)

    score++;

  scoreOnPage.innerHTML = score.toString() + ' m'

}, 500)

document.body.click = ()=>{
document.body.requestFullscreen();}


function animate() {

  requestAnimationFrame(animate);

  //stats.begin();

  if (shouldPlay) {

    player.position.z -= 0.07;

    camera.position.z -= 0.07;


    if (player.position.y > 1)
      player.position.y -= 0.04;


    // ground rotation and camera position based  on player position

    if(player.position.x > 0)
      { if(camera.position.x < 1)
      {  camera.position.x += 0.01}
        
      if()

      
      }

      
      if(player.position.x < 0)
      { if(camera.position.x > -1)
        camera.position.x -= 0.01
      }

      if (player.position.x ==0){
        if (camera.position.x > 0)
          {
            camera.position.x -= 0.02;
          }
          if (camera.position.x < 0)
          {
            camera.position.x += 0.02;
          }

      }








  }

  // Update player's bounding box position

  playerBB.setFromObject(player);


  checkCollision();


  effectComposer.render(scene, camera);

   stats.end();

}


function checkCollision() {

  for (const enemy of enemies) {

    const enemyBB = new THREE.Box3();

    enemyBB.setFromObject(enemy);


    if (playerBB.intersectsBox(enemyBB)) {

      // Collision detected!

      //console.error('Collision with enemy!');

      endCard.style.visibility = "visible";

      shouldPlay = false;

      finalScore.innerHTML = score.toString();


      

    }

  }

}


animate();







function restart() {

  player.position.set(0, 1, 0);

  camera.position.set(0, 3.3, 2.5);
  score = 0;

  endCard.style.visibility = 'hidden'

  startMenu.style.visibility = 'visible';

}


restartBtn.addEventListener('click', restart)


function jump() {

  if (player.position.y < 1.7) {

    player.position.y += 2.5;

  }

}

function moveLeft() {

  if (player.position.x > -1) {

    player.position.x -= 1.15;
    
  }

}


function moveRight() {

  if (player.position.x < 1) {

    player.position.x += 1.15;
    
  }


}


leftBtn.addEventListener('click', moveLeft);

rightBtn.addEventListener('click', moveRight);

jumperBtn.addEventListener('click', jump)


window.onkeydown = (event) => {

  var key = event.key;

  console.log(key);

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

    console.log('enter pressed');

    if (endCard.style.visibility != 'hidden') {

      restart();
    }


    if (startMenu.style.visibility == 'visible') {

      start();

    }

  }

}












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




