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
 * Diamonds lights
 */

//create blue light
const blueLight = new THREE.PointLight( 0x3788B6, 1, 100 )
blueLight.position.set( 6, 6, -2 )

//says if blue light is on
let blueState = true

//function to turn on the blue light
const setBlueLigth = () => {
    blueLight.color.setHex(0x3788B6)
    scene.add( blueLight )
    blueState = true
}

//function to turn off the blue light
const offBlueLigth = () => {
    scene.remove( blueLight )
    blueState = false
}

setBlueLigth()

//create red light
const redLight = new THREE.PointLight( 0xDF2F0E, 1, 100 )
redLight.position.set( 6, 6, 2 )

//says if red light is on
let redState = false

//function to turn on the red light
const setRedLigth = () => {
    redLight.color.setHex(0xF8855F)
    scene.add( redLight )
    redState = true
}

//function to turn off the red light
const offRedLigth = () => {
    scene.remove( redLight )
    redState = false
}

//create green light
const greenLight = new THREE.PointLight( 0x76AD35, 1, 100 )
greenLight.position.set( -6, 6, -2 )

//says if green light is on
let greenState = false

//function to turn on the green light
const setGreenLigth = () => {
    greenLight.color.setHex(0x76AD35)
    scene.add( greenLight )
    greenState = true
}

//function to turn off the green light
const offGreenLigth = () => {
    scene.remove( greenLight )
    greenState = false
}

//create yellow light
const yellowLight = new THREE.PointLight( 0xF9E81C, 1, 100 )
yellowLight.position.set( -6, 6, 2 )

//says if yellow light is on
let yellowState = false

//function to turn on the yellow light
const setYellowLigth = () => {
    yellowLight.color.setHex(0xF9E81C)
    scene.add( yellowLight )
    yellowState = true
}

//function to turn off the yellow light
const offYellowLigth = () => {
    scene.remove( yellowLight )
    yellowState = false
}


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05)
scene.add(ambientLight)

const sunLight = new THREE.DirectionalLight(0xFCF8E2, 0.05)
sunLight.position.x = 200
sunLight.position.y = 210
sunLight.position.z = 200
scene.add(sunLight)

sunLight.castShadow = true
sunLight.shadow.camera.top = 1.20
sunLight.shadow.camera.right = + 1.20
sunLight.shadow.camera.bottom = + 2.20
sunLight.shadow.camera.left = + 2.20

const skyLight = new THREE.HemisphereLight(0xffffff, 0xefefef, 0.4)
skyLight.position.x = 0
scene.add(skyLight)

/**
 * Music
 */

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener()
camera.add( listener )

// create a global audio source
const sound = new THREE.Audio( listener )
let playState = false

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader()
audioLoader.load( '/spacetheme.mp3', function( buffer ) {
	sound.setBuffer( buffer )
	sound.setLoop( true )
	sound.setVolume( 0.5 )
})

window.addEventListener('keydown', (_event) => 
{
    const keyName = _event.keyCode

    if(keyName == 32 && playState == false)
    {
        sound.play()
        playState = true
    } 

    else if(keyName == 32 && playState)
    {
        sound.pause()
        playState = false
    }
})

/**
 * Click sounds
 */

const clickLightOn = new THREE.Audio( listener )


audioLoader.load( 'light_on.mp3', function( buffer ) {
	clickLightOn.setBuffer( buffer )
	clickLightOn.setLoop( true )
    clickLightOn.setVolume( 0.2 )
    clickLightOn.loop = false
})

const clickLightOff = new THREE.Audio( listener )


audioLoader.load( 'light_off.mp3', function( buffer ) {
	clickLightOff.setBuffer( buffer )
	clickLightOff.setLoop( true )
    clickLightOff.setVolume( 0.2 )
    clickLightOff.loop = false
})

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
    if ( intersected == diamonds.blue.mesh )
    {
        if (blueState == false)
        {
           //set light
            setBlueLigth() 

            //click sound
            clickLightOn.play()
        }
        else 
        {
            offBlueLigth()

            //click sound
            clickLightOff.play()
        }
    }

    //click on the blue diamond
    else if ( intersected == diamonds.red.mesh )
    {
        if (redState == false)
        {
           //set light
            setRedLigth() 

            //click sound
            clickLightOn.play()
        }
        else 
        {
            offRedLigth()

            //click sound
            clickLightOff.play()
        }
    }
    //click on the yellow diamond
    else if ( intersected == diamonds.yellow.mesh )
    {
        if (yellowState == false)
        {
           //set light
            setYellowLigth() 

            //click sound
            clickLightOn.play()
        }
        else 
        {
            offYellowLigth()

            //click sound
            clickLightOff.play()
        }
    }
    //click on the green diamond
    else if ( intersected == diamonds.green.mesh )
    {
        if (greenState == false)
        {
           //set light
            setGreenLigth() 

            //click sound
            clickLightOn.play()
        }
        else 
        {
            offGreenLigth()

            //click sound
            clickLightOff.play()
        }
    }
    //click on the astronaute to switch off all lights
    else if (intersected.currentHex == 8355711 )
    {
        //change light color
        blueLight.color.setHex(0x000000)
        redLight.color.setHex(0x000000)
        yellowLight.color.setHex(0x000000)
        greenLight.color.setHex(0x000000)

        //click sound
        clickLightOff.play()
    }
    else
    {
        intersected = null
    }
}



