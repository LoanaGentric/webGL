import * as THREE from 'three'

export default class Diamonds
{
    constructor(_options)
    {
        this.textureLoader = _options.textureLoader
        console.log(this.textureLoader)

        this.container = new THREE.Object3D()
        console.log('Coucou Diamands')

        this.setRed()
        this.setBlue()
        this.setGreen()
        this.setWhite()
    }

    setRed()
    {
        this.red = {}
        this.red.geometry = new THREE.SphereGeometry(0.1, 10, -30) 
        this.red.material = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0xF43910
        })
        this.red.mesh = new THREE.Mesh(this.red.geometry, this.red.material)

        this.red.mesh.position.x +=0.5
        this.red.mesh.position.y +=0.5
        this.red.mesh.position.z -=0.5
        this.container.add(this.red.mesh)
    }

    setBlue()
    {
        this.blue = {}
        this.blue.geometry = new THREE.SphereGeometry(0.1, 10, -30) 
        this.blue.material = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x3788B6
        })
        this.blue.mesh = new THREE.Mesh(this.blue.geometry, this.blue.material)

        this.blue.mesh.position.x -=0.5
        this.blue.mesh.position.y +=0.5
        this.blue.mesh.position.z -=0.5
        this.container.add(this.blue.mesh)
    }

    setGreen()
    {
        this.green = {}
        this.green.geometry = new THREE.SphereGeometry(0.1, 10, -30) 
        this.green.material = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x76AD35
        })
        this.green.mesh = new THREE.Mesh(this.green.geometry, this.green.material)

        this.green.mesh.position.x -=0.1
        this.green.mesh.position.y +=0.8
        this.green.mesh.position.z -=0.5
        this.container.add(this.green.mesh)
    }

    setWhite()
    {
        this.white = {}
        this.white.geometry = new THREE.SphereGeometry(0.1, 10, -30) 
        this.white.material = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0xffffff
        })
        this.white.mesh = new THREE.Mesh(this.white.geometry, this.white.material)

        this.white.mesh.position.x +=0.1
        this.white.mesh.position.y +=0.1
        this.white.mesh.position.z -=0.5
        this.container.add(this.white.mesh)
    }
}