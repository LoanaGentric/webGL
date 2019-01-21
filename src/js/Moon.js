import * as THREE from 'three'

import moonTextureSource from '../images/textures/moon.jpg'
import globeNormalSource from '../images/textures/planet/globe/normal.jpg'

export default class Moon
{
    constructor(_options)
    {
        this.textureLoader = _options.textureLoader
        console.log(this.textureLoader)

        this.container = new THREE.Object3D()
        console.log('Coucou Planet')

        this.setGlobe()
        // this.setStars()
        this.setAnimation()
    }

    setGlobe()
    {
        this.globe = {}
        this.globe.geometry = new THREE.SphereBufferGeometry(1, 20, 20)
        this.globe.material = new THREE.MeshStandardMaterial({ 
            map: this.textureLoader.load(moonTextureSource),
            metalness: 0.3,
            roughness: 0.8,
            normalMap: this.textureLoader.load(globeNormalSource)
        })
        this.globe.mesh = new THREE.Mesh(this.globe.geometry, this.globe.material)
        this.globe.mesh.position.y = -1

        this.globe.receiveShadow = true

        this.container.add(this.globe.mesh)
    }


    setAnimation()
    {
        const loop = () =>
        {
            window.requestAnimationFrame(loop)

            //rotation planete
            this.globe.mesh.rotation.z += 0.003
        }

        loop()
    }
}