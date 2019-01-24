import * as THREE from 'three'

export default class Astronaute
{
    constructor(_options)
    {
        this.textureLoader = _options.textureLoader
        console.log(this.textureLoader)

        this.container = new THREE.Object3D()
        console.log('Coucou Astronaute')

        this.setBody()
        this.setHead()

        this.setRightThigh()
        this.setLeftThigh()

        this.setRightCalf()
        this.setLeftCalf()

        this.setRightUpperArm()
        this.setLeftUpperArm()

        this.setRightForearm()
        this.setLeftForearm()
    }

    setBody()
    {
        this.body = {}
        this.body.geometry = new THREE.BoxGeometry(0.1, 0.2, 0.1)
        this.body.material = new THREE.MeshStandardMaterial({ color: 0xffffff })

        this.body.castShadow = true

        this.body.mesh = new THREE.Mesh(this.body.geometry, this.body.material)

        this.body.mesh.rotation.z += 0.2

        this.container.add(this.body.mesh)
    }

    setHead()
    {
        this.head = {}
        this.head.geometry = new THREE.SphereBufferGeometry(0.07, 0.2, 0.1)
        this.head.material = new THREE.MeshStandardMaterial({ color: 0xffffff })

        this.head.mesh = new THREE.Mesh(this.head.geometry, this.head.material)
        
        this.head.mesh.position.y +=0.2
        this.head.mesh.position.x -=0.04
        this.container.add(this.head.mesh)
    }

    setRightThigh()
    {
        this.rightThigh = {}
        this.rightThigh.geometry = new THREE.BoxGeometry(0.1, 0.04, 0.04)
        this.rightThigh.material = new THREE.MeshStandardMaterial({ color: 0xefefef})

        this.rightThigh.mesh = new THREE.Mesh(this.rightThigh.geometry, this.rightThigh.material)
        
        this.rightThigh.mesh.rotation.z -=0.4
        this.rightThigh.mesh.position.y -=0.09
        this.rightThigh.mesh.position.x +=0.05
        this.rightThigh.mesh.position.z +=0.05

        this.container.add(this.rightThigh.mesh)
        
    }

    setLeftThigh()
    {
        this.leftThigh = {}
        this.leftThigh.geometry = new THREE.BoxGeometry(0.1, 0.04, 0.04)
        this.leftThigh.material = new THREE.MeshStandardMaterial({ color: 0xefefef })

        this.leftThigh.mesh = new THREE.Mesh(this.leftThigh.geometry, this.leftThigh.material)

        this.leftThigh.mesh.rotation.z -=0.4
        this.leftThigh.mesh.position.y -=0.09
        this.leftThigh.mesh.position.x +=0.05
        this.leftThigh.mesh.position.z -=0.05

        this.container.add(this.leftThigh.mesh)
    }

    setRightCalf()
    {
        this.rightCalf = {}
        this.rightCalf.geometry = new THREE.BoxGeometry(0.08, 0.03, 0.04)
        this.rightCalf.material = new THREE.MeshStandardMaterial({ color: 0xefefef })

        this.rightCalf.mesh = new THREE.Mesh(this.rightCalf.geometry, this.rightCalf.material)

        this.rightCalf.mesh.rotation.z -=0.9
        this.rightCalf.mesh.position.y -=0.13
        this.rightCalf.mesh.position.x +=0.11
        this.rightCalf.mesh.position.z +=0.05

        this.container.add(this.rightCalf.mesh)
    }

    setLeftCalf()
    {
        this.leftCalf = {}
        this.leftCalf.geometry = new THREE.BoxGeometry(0.08, 0.03, 0.04)
        this.leftCalf.material = new THREE.MeshStandardMaterial({ color: 0xefefef })

        this.leftCalf.mesh = new THREE.Mesh(this.leftCalf.geometry, this.leftCalf.material)

        this.leftCalf.mesh.rotation.z -=0.9
        this.leftCalf.mesh.position.y -=0.13
        this.leftCalf.mesh.position.x +=0.11
        this.leftCalf.mesh.position.z -=0.05

        this.container.add(this.leftCalf.mesh)
    }

    setRightUpperArm()
    {
        this.rightUpperArm = {}
        this.rightUpperArm.geometry = new THREE.BoxGeometry(0.1, 0.03, 0.04)
        this.rightUpperArm.material = new THREE.MeshStandardMaterial({ color: 0xefefef})

        this.rightUpperArm.mesh = new THREE.Mesh(this.rightUpperArm.geometry, this.rightUpperArm.material)

        this.rightUpperArm.mesh.rotation.z -=2
        this.rightUpperArm.mesh.position.y +=0.03
        this.rightUpperArm.mesh.position.x -=0.03
        this.rightUpperArm.mesh.position.z +=0.05

        this.container.add(this.rightUpperArm.mesh)
    }

    setLeftUpperArm()
    {
        this.leftUpperArm = {}
        this.leftUpperArm.geometry = new THREE.BoxGeometry(0.1, 0.03, 0.04)
        this.leftUpperArm.material = new THREE.MeshStandardMaterial({ color: 0xefefef })

        this.leftUpperArm.mesh = new THREE.Mesh(this.leftUpperArm.geometry, this.leftUpperArm.material)

        this.leftUpperArm.mesh.rotation.z -=0.5
        this.leftUpperArm.mesh.position.y +=0.06
        this.leftUpperArm.mesh.position.x +=0.03
        this.leftUpperArm.mesh.position.z -=0.05

        this.container.add(this.leftUpperArm.mesh)
    }

    setRightForearm()
    {
        this.rightForearm = {}
        this.rightForearm.geometry = new THREE.BoxGeometry(0.08, 0.03, 0.04)
        this.rightForearm.material = new THREE.MeshStandardMaterial({ color: 0xefefef})

        this.rightForearm.mesh = new THREE.Mesh(this.rightForearm.geometry, this.rightForearm.material)

        this.rightForearm.mesh.rotation.z +=3
        this.rightForearm.mesh.position.y -=0.008
        this.rightForearm.mesh.position.x -=0.013
        this.rightForearm.mesh.position.z +=0.05

        this.container.add(this.rightForearm.mesh)
    }

    setLeftForearm()
    {
        this.leftForearm = {}
        this.leftForearm.geometry = new THREE.BoxGeometry(0.08, 0.03, 0.04)
        this.leftForearm.material = new THREE.MeshStandardMaterial({ color: 0xefefef })

        this.leftForearm.mesh = new THREE.Mesh(this.leftForearm.geometry, this.leftForearm.material)

        this.leftForearm.mesh.rotation.z -=3
        this.leftForearm.mesh.position.y +=0.04
        this.leftForearm.mesh.position.x +=0.1
        this.leftForearm.mesh.position.z -=0.05

        this.container.add(this.leftForearm.mesh)
    }


}