import * as THREE from 'three';
import './src/styles.css';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, geometry, material, torus, pointLight, ambientLight, lightHelper, gridHelper, controls, spaceTexture;



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

function addStar() {
    let geometry, material, star;
    geometry = new THREE.SphereGeometry( 0.25, 24, 24 );
    material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
    star = new THREE.Mesh( geometry, material );

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

    star.position.set( x, y, z );
    scene.add( star );
}

Array( 200 ).fill().forEach(addStar)


spaceTexture = new THREE.TextureLoader()
spaceTexture.load("./images/space.jpg");
scene.background = spaceTexture;

function animate() {
    renderer.render(scene, camera);


    torus.rotation.x += 0.01;   
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    requestAnimationFrame(animate);
}

animate();