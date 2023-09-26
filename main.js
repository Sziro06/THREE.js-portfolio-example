import * as THREE from 'three';
import './src/styles.css';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, geometry, material, torus, pointLight, ambientLight, lightHelper, gridHelper, controls, spaceTexture, moonTexture, moon;



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


spaceTexture = new THREE.TextureLoader().load("https://media.istockphoto.com/id/178149253/photo/deep-space-background.jpg?b=1&s=612x612&w=0&k=20&c=UWheinVHEkSamqeXD1cOv80kgdWHMeKXjU7EJy9-j5U=");
scene.background = spaceTexture;

moonTexture = new THREE.TextureLoader().load('https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/ldem_3_8bit.jpg');
moon = new THREE.Mesh(
    new THREE.SphereGeometry( 3, 32, 32 ),
    new THREE.MeshDistanceMaterial( {
        map: moonTexture,
    } )
)


function animate() {
    renderer.render(scene, camera);


    torus.rotation.x += 0.01;   
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    requestAnimationFrame(animate);
}

animate();