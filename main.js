import * as THREE from 'three';
import './src/styles.css';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, geometry, material, torus, pointLight, ambientLight, lightHelper, gridHelper, controls;



scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);



renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ( 30 );



geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
torus = new THREE.Mesh( geometry, material );

scene.add( torus );

pointLight = new THREE.PointLight( 0xffffff )
pointLight.intensity = 150;

ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add( pointLight, ambientLight  )

lightHelper = new THREE.PointLightHelper( pointLight )
gridHelper = new THREE.GridHelper( 200, 50);
scene.add( lightHelper, gridHelper )

controls = new OrbitControls( camera, renderer.domElement );

function animate() {
    renderer.render(scene, camera);


    torus.rotation.x += 0.01;   
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    requestAnimationFrame(animate);
}

animate();
