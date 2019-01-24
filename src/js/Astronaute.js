import * as THREE from 'three'
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'

import astronautObject from '../assets/Astronaut.obj'
import astronautMaterial from '../assets/Astronaut.mtl'

export default class Astronaute
{
    constructor(_options)
    {
        this.textureLoader = _options.textureLoader
        console.log(this.textureLoader)

        this.container = new THREE.Object3D()
        console.log('Coucou Astronaute')

        this.setBody()
    }

    setBody()
    {
        this.mtlLoader = new MTLLoader()
        this.objLoader = new OBJLoader()

        this.mtlLoader.load(astronautMaterial, (materials) => {
            materials.preload()
            this.objLoader.setMaterials(materials)
            this.objLoader.load(astronautObject, (object) => {
                object.scale.x = 0.1
                object.scale.y = 0.1
                object.scale.z = 0.1
                object.position.y = 0
                object.position.x = 0
                object.position.z =  0
                this.container.add(object)
            })
        })
    }
}