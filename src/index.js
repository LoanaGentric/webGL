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
 * Resize function
 */

const onWindowResize = () => 
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
 
    renderer.setSize(window.innerWidth, window.innerHeight);
}


/**
 * Draw the Moon
 */

const moon = new Moon({
    textureLoader: textureLoader
})
scene.add(moon.container)

moon.container.receiveShadow = true

/**
 * Draw Astronaute
 */

const astronaute = new Astronaute({
    textureLoader: textureLoader
})
scene.add(astronaute.container)

astronaute.container.scale.x += 0.5
astronaute.container.scale.y += 0.5
astronaute.container.scale.z += 0.5

astronaute.container.position.y = 0.1


/**
 * Draw the Diamonds
 */

const diamonds = new Diamonds({
    textureLoader: textureLoader
})
scene.add(diamonds.container)

diamonds.container.castShadow = true

/**
 * Draw Particles
 */

let particles

const drawParticles = () => {
    particles = new THREE.Group()
    scene.add(particles)
    const geometry = new THREE.TetrahedronGeometry(1, 0)
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    
    for (let i = 0; i < 900; i ++) {
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set((Math.random() - 0.56) * 250,
                        (Math.random() - 0.56) * 250,
                        (Math.random() - 0.56) * 250)
      mesh.updateMatrix()
      mesh.matrixAutoUpdate = false
      particles.add(mesh)
    }
}
drawParticles()

/**
 * Raycaster
 */

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

const onMouseMove = (event) =>
{
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1
}

window.addEventListener( 'mousemove', onMouseMove, false )

/**
 * Change ambience
 */

const blueLight = new THREE.PointLight( 0x3788B6, 1.9, 100 )
blueLight.position.set( 0, 6, 0 )

const setBlueLigth = () => {
    blueLight.color.setHex(0x3788B6)
    scene.add( blueLight )
}

const redLight = new THREE.PointLight( 0xF8855F, 1.9, 100 )
redLight.position.set( 0, 6, 0 )

const setRedLigth = () => {
    redLight.color.setHex(0xF8855F)
    scene.add( redLight )
}

const greenLight = new THREE.PointLight( 0x76AD35, 1.9, 100 )
greenLight.position.set( 0, 6, 0 )

const setGreenLigth = () => {
    greenLight.color.setHex(0x76AD35)
    scene.add( greenLight )
}

const yellowLight = new THREE.PointLight( 0xF9E81C, 1.9, 100 )
yellowLight.position.set( 0, 6, 0 )

const setYellowLigth = () => {
    yellowLight.color.setHex(0xF9E81C)
    scene.add( yellowLight )
}

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambientLight)

const sunLight = new THREE.DirectionalLight(0xFCF8E2, 0.4)
sunLight.position.x = 200
sunLight.position.y = 210
sunLight.position.z = 200
scene.add(sunLight)

sunLight.castShadow = true
sunLight.shadow.camera.top = 1.20
sunLight.shadow.camera.right = + 1.20
sunLight.shadow.camera.bottom = + 2.20
sunLight.shadow.camera.left = + 2.20

const skyLight = new THREE.HemisphereLight(0xffffff, 0xefefef, 1)
skyLight.position.x = 0
scene.add(skyLight)

/**
 * Music
 */

// create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
var sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
var audioLoader = new THREE.AudioLoader();
audioLoader.load( '/audio/spacetheme.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});


/**
 * Cursor
 */
const cursor = { x: 0.5, y: 0.5}
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.3
    cursor.y = event.clientY / sizes.height + 0.3
})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)
renderer.setClearColor(0x090414)
renderer.shadowMap.enabled = true

/**
 * Loop
 */

let intersected = false 
let angle = 0

const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Update camera
    camera.position.x = cursor.x * 1
    camera.position.y = cursor.y * 1
    camera.lookAt(astronaute.container.position)
    
    // Update Raycaster
    raycaster.setFromCamera( mouse, camera )

	// calcule les objets qui interfèrent avec le rayon de raycaster
    const intersects = raycaster.intersectObjects( scene.children, true )

    if ( intersects.length > 0 ) {
        if ( intersected != intersects[ 0 ].object ) 
        {
            if ( intersected ) 
            {
                intersected.material.color.setHex( intersected.currentHex )
            }
            intersected = intersects[ 0 ].object
            intersected.currentHex = intersected.material.color.getHex()
            intersected.material.color.setHex( 0xffffff )

    
            document.addEventListener('mousedown', onDocumentMouseDown, false)
        }
    } 
    else 
    {
        if ( intersected ) intersected.material.color.setHex( intersected.currentHex )
        intersected = null
    }

    //Particles
    particles.rotation.x += 0.0004
    particles.rotation.y -= 0.0009

    //Move light

    angle+=0.009

    sunLight.position.x = 10 + 150 * Math.sin(angle)
    sunLight.position.z = 10 + 150 * Math.cos(angle)
    sunLight.position.y = 10 + 150 * Math.cos(angle)

    // Render
    renderer.render(scene, camera)

    //Resize
    onWindowResize()

}

loop()

const onDocumentMouseDown = (event) => 
{
    event.preventDefault()
    //click on the red diamond
    if ( intersected == diamonds.red.mesh )
    {
        //change light color
        blueLight.color.setHex(0x000000)
        greenLight.color.setHex(0x000000)
        yellowLight.color.setHex(0x000000)
        setRedLigth()
    }
    //click on the blue diamond
    else if ( intersected == diamonds.blue.mesh )
    {
        //change light color
        redLight.color.setHex(0x000000)
        greenLight.color.setHex(0x000000)
        yellowLight.color.setHex(0x000000)
        setBlueLigth()
    }
    //click on the yellow diamond
    else if ( intersected == diamonds.yellow.mesh )
    {
        //change light color
        blueLight.color.setHex(0x000000)
        greenLight.color.setHex(0x000000)
        redLight.color.setHex(0x000000)
        setYellowLigth()
    }
    //click on the green diamond
    else if (intersected == diamonds.green.mesh)
    {
        //change light color
        blueLight.color.setHex(0x000000)
        redLight.color.setHex(0x000000)
        yellowLight.color.setHex(0x000000)
        setGreenLigth()
    }
    else
    {
        //change light color
        blueLight.color.setHex(0x000000)
        redLight.color.setHex(0x000000)
        yellowLight.color.setHex(0x000000)
        greenLight.color.setHex(0x000000)
    }
}



