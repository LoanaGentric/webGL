import './css/style.styl'


import * as THREE from 'three'
import Moon from './js/Moon.js'
import Astronaute from './js/Astronaute.js'
import Diamonds from './js/Diamonds.js'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()


/**
* Scene
*/
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 1
scene.add(camera)


/**
 * Draw the Moon
 */
const moon = new Moon({
    textureLoader: textureLoader
})
scene.add(moon.container)

/**
 * Draw Astronaute
 */

const astronaute = new Astronaute({
    textureLoader: textureLoader
})
scene.add(astronaute.container)

astronaute.container.position.y += 0.3

astronaute.container.castShadow = true
astronaute.container.receiveShadow = true

/**
 * Draw the Diamonds
 */

const diamonds = new Diamonds({
    textureLoader: textureLoader
})
scene.add(diamonds.container)

/**
 * Draw Particles
 */
let particles
const colors = [0xffffff, 0xF3F3F3, 0x3788B6];

function drawParticles() {
    particles = new THREE.Group();
    scene.add(particles);
    const geometry = new THREE.TetrahedronGeometry(3, 0);
    
    for (let i = 0; i < 1000; i ++) {
      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        shading: THREE.FlatShading
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set((Math.random() - 0.5) * 1000,
                        (Math.random() - 0.5) * 1000,
                        (Math.random() - 0.5) * 1000);
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      particles.add(mesh);
    }
}
drawParticles();

/**
 * Raycaster
 */

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const onMouseMove = (event) =>
{
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

window.addEventListener( 'mousemove', onMouseMove, false );

// render()


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0x555555)
scene.add(ambientLight)

const sunLight = new THREE.DirectionalLight(0xffffff, 0.6)
sunLight.position.x = 1
sunLight.position.y = 1
sunLight.position.z = 1
scene.add(sunLight)

sunLight.castShadow = true
sunLight.shadow.camera.top = 1.20
sunLight.shadow.camera.right = + 1.20
sunLight.shadow.camera.bottom = + 2.20
sunLight.shadow.camera.left = + 2.20

/**
 * Cursor
 */
const cursor = { x: 0.5, y: 0.5}
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.2
    cursor.y = event.clientY / sizes.height + 0.2
})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)
renderer.setClearColor(0x090414);
renderer.shadowMap.enabled = true

/**
 * Loop
 */

let intersected = false 

const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Update camera
    camera.position.x = cursor.x * 1
    camera.position.y = cursor.y * 1
    camera.lookAt(astronaute.container.position)

    
    // update le rayon de raycaster avec la position de la caméra et de la sourris 
    raycaster.setFromCamera( mouse, camera );
    
	// calcule les objets qui inerfèrent avec le rayon de raycaster
    const intersects = raycaster.intersectObjects( scene.children, true );

    if ( intersects.length > 0 ) {
        if ( intersected != intersects[ 0 ].object ) {
            if ( intersected ) intersected.material.color.setHex( intersected.currentHex );
            intersected = intersects[ 0 ].object;
            intersected.currentHex = intersected.material.color.getHex();
            intersected.material.color.setHex( 0xffffff );
        }
    } else {
        if ( intersected ) intersected.material.color.setHex( intersected.currentHex );
        intersected = null;
    }

    //Particles
    particles.rotation.x += 0.0004;
    particles.rotation.y -= 0.0009;

    // Render
    renderer.render(scene, camera)

}

loop()
console.log(scene.children)




