import * as THREE from 'three'

import moonTextureSource from '../images/textures/moon.jpg'


export default class Moon
{
    constructor(_options)
    {
        this.textureLoader = _options.textureLoader
        console.log(this.textureLoader)

        this.container = new THREE.Object3D()
        console.log('Coucou Planet')

        this.setGlobe()
        this.setGlobe2()
        this.setAnimation()
    }

    setGlobe()
    {
        this.globe = {}
        this.globe.geometry = new THREE.SphereBufferGeometry(1, 10, 10)
        this.globe.material = new THREE.MeshStandardMaterial({ 
            color: 0xffffff,
            metalness: 0.3,
            roughness: 0.8,
            transparent: true
        })
        this.globe.mesh = new THREE.Mesh(this.globe.geometry, this.globe.material)
        this.globe.mesh.position.y = -1

        this.globe.receiveShadow = true

        this.container.add(this.globe.mesh)
    }

    setGlobe2()
    {
        this.secondGlobe = {}
        this.secondGlobe.geometry = new THREE.SphereBufferGeometry(1.009, 18, 18)
        this.secondGlobe.material = new THREE.MeshStandardMaterial({ 
            map: this.textureLoader.load(moonTextureSource),
            metalness: 0.3,
            roughness: 0.8,
            transparent: true, 
            opacity: 0.5
        })
        this.secondGlobe.mesh = new THREE.Mesh(this.secondGlobe.geometry, this.secondGlobe.material)
        this.secondGlobe.mesh.position.y = -1

        this.secondGlobe.receiveShadow = true

        this.container.add(this.secondGlobe.mesh)
    }


    setAnimation()
    {
        const loop = () =>
        {
            window.requestAnimationFrame(loop)

            //rotation planete
            this.globe.mesh.rotation.z += 0.003
            this.secondGlobe.mesh.rotation.z += 0.003
        }

        loop()
    }
}