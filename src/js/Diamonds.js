import * as THREE from 'three'

export default class Diamonds
{
    constructor(_options)
    {
        this.container = new THREE.Object3D()
        console.log('Coucou Diamands')

        this.setRed()
        this.setBlue()
        this.setGreen()
        this.setYellow()
        this.setAnimation()
    }

    setRed()
    {
        let AdditiveBlending
        this.red = {}
        this.red.geometry = new THREE.SphereGeometry(0.15, 10, -30) 
        this.red.material = new THREE.MeshStandardMaterial({
            color: 0xF43910, 
            transparent: true, 
            opacity: 0.8,
            blending:THREE.AdditiveBlending,
        })
        this.red.mesh = new THREE.Mesh(this.red.geometry, this.red.material)
        this.red.AdditiveBlending = THREE[ AdditiveBlending ]

        this.red.mesh.position.x +=0.8
        this.red.mesh.position.y +=1
        this.red.mesh.position.z -=0.5
        this.container.add(this.red.mesh)

        // this.light = {} 
        // this.light = new THREE.PointLight( 0xF8855F, 0.9, 100 )
        // this.light.position.set( 0.6, 0.9, - 0.5 )
        // this.container.add( this.light )
    }

    setBlue()
    {
        this.blue = {}
        this.blue.geometry = new THREE.SphereGeometry(0.15, 10, -30) 
        this.blue.material = new THREE.MeshStandardMaterial({color: 0x3788B6, transparent: true, opacity: 0.8, blending:THREE.AdditiveBlending})
        this.blue.mesh = new THREE.Mesh(this.blue.geometry, this.blue.material)

        this.blue.mesh.position.x += 1.2
        this.blue.mesh.position.y += 0
        this.blue.mesh.position.z -= 0.1
        this.container.add(this.blue.mesh)

        // this.light = {} 
        // this.light = new THREE.PointLight( 0x3788B6, 0.9, 100 )
        // this.light.position.set( 0, 6, 0 )
        // this.container.add( this.light )
    }

    setGreen()
    {
        this.green = {}
        this.green.geometry = new THREE.SphereGeometry(0.15, 10, -30) 
        this.green.material = new THREE.MeshStandardMaterial({color: 0x76AD35, transparent: true, opacity: 0.8, blending:THREE.AdditiveBlending})
        this.green.mesh = new THREE.Mesh(this.green.geometry, this.green.material)

        this.green.mesh.position.x -=0.9
        this.green.mesh.position.y +=0.1
        this.green.mesh.position.z +=0.4
        this.container.add(this.green.mesh)

        // this.light = {} 
        // this.light = new THREE.PointLight( 0x76AD35, 0.9, 100 )
        // this.light.position.set( - 0.9, 0.1, 0.4 )
        // this.container.add( this.light )
    }

    setYellow()
    {
        this.yellow = {}
        this.yellow.geometry = new THREE.SphereGeometry(0.15, 10, -30) 
        this.yellow.material = new THREE.MeshStandardMaterial({color: 0xF9E81C, transparent: true, opacity: 0.8, blending:THREE.AdditiveBlending})
        this.yellow.mesh = new THREE.Mesh(this.yellow.geometry, this.yellow.material)

        this.yellow.mesh.position.x -= 0.6
        this.yellow.mesh.position.y += 0.8
        this.yellow.mesh.position.z += 0.1
        this.container.add(this.yellow.mesh)

        // this.light = {} 
        // this.light = new THREE.PointLight( 0xF9E81C, 0.9, 100 )
        // this.light.position.set( - 0.6, 0.8, 0.1 )
        // this.container.add( this.light )
    }

    setAnimation()
    {
        const loop = () =>
        {
            window.requestAnimationFrame(loop)

            //rotation diamonds
            this.red.mesh.rotation.y += 0.01
            this.green.mesh.rotation.y += 0.01
            this.blue.mesh.rotation.y += 0.01
            this.yellow.mesh.rotation.y += 0.01
            
        }

        loop()
    }


}