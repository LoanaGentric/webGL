import * as THREE from 'three'

export default class Diamonds
{
    constructor(_options)
    {
        this.container = new THREE.Object3D()

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
        this.red.mesh.position.y +=0.7
        this.red.mesh.position.z -=0.5
        this.container.add(this.red.mesh)
    }

    setBlue()
    {
        this.blue = {}
        this.blue.geometry = new THREE.SphereGeometry(0.15, 10, -30) 
        this.blue.material = new THREE.MeshStandardMaterial({color: 0x3788B6, transparent: true, opacity: 0.8, blending:THREE.AdditiveBlending})
        this.blue.mesh = new THREE.Mesh(this.blue.geometry, this.blue.material)

        this.blue.mesh.position.x += 1.2
        this.blue.mesh.position.y -= 0.2
        this.blue.mesh.position.z += 0.1
        this.container.add(this.blue.mesh)
    }

    setGreen()
    {
        this.green = {}
        this.green.geometry = new THREE.SphereGeometry(0.3, 10, -30) 
        this.green.material = new THREE.MeshStandardMaterial({color: 0x76AD35, transparent: true, opacity: 0.8, blending:THREE.AdditiveBlending})
        this.green.mesh = new THREE.Mesh(this.green.geometry, this.green.material)

        this.green.mesh.position.x -=2.8
        this.green.mesh.position.y -=1.9
        this.green.mesh.position.z -=0.1
        this.container.add(this.green.mesh)
    }

    setYellow()
    {
        this.yellow = {}
        this.yellow.geometry = new THREE.SphereGeometry(0.15, 10, -30) 
        this.yellow.material = new THREE.MeshStandardMaterial({color: 0xF9E81C, transparent: true, opacity: 0.8, blending:THREE.AdditiveBlending})
        this.yellow.mesh = new THREE.Mesh(this.yellow.geometry, this.yellow.material)

        this.yellow.mesh.position.x -= 0.7
        this.yellow.mesh.position.y += 0.5
        this.yellow.mesh.position.z += 0.2
        this.container.add(this.yellow.mesh)
    }

    setAnimation()
    {
        let up = true
        const loop = () =>
        {
            window.requestAnimationFrame(loop)

            //rotation diamonds
            this.red.mesh.rotation.y += 0.01
            this.green.mesh.rotation.y += 0.01
            this.blue.mesh.rotation.y += 0.01
            this.yellow.mesh.rotation.y += 0.01

            if (up == true)
                    {
                        this.container.position.y +=0.00006
                        if (this.container.position.y > - 0.01) {
                            up = false
                        }
                    }
                    else 
                    {
                        this.container.position.y -=0.0001
                        if (this.container.position.y < - 0.03)
                        {
                            up = true
                        }
                    }
            
        }

        loop()
    }


}