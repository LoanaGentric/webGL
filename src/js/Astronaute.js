import * as THREE from 'three'
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'

import astronautObject from '../images/assets/Astronaut.obj'
import astronautMaterial from '../images/assets/Astronaut.mtl'

export default class Astronaute
{
    constructor(_options)
    {
        this.textureLoader = _options.textureLoader
        console.log(this.textureLoader)

        this.container = new THREE.Object3D()

        this.setAstronaut()
    }

    setAstronaut()
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

                let up = true

                const loop = () =>
                {
                    window.requestAnimationFrame(loop)

                    //rotation diamonds

                    object.rotation.y += 0.001

                    //floating effect

                    if (up == true)
                    {
                        object.position.y +=0.0003
                        if (object.position.y > - 0.01) {
                            up = false
                        }
                    }
                    else 
                    {
                        object.position.y -=0.00025
                        if (object.position.y < - 0.03)
                        {
                            up = true
                        }
                    }

            
                }

                loop()
            })
        })
    }
}
