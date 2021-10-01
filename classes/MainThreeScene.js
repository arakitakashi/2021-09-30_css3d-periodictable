import * as THREE from "three"

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

import config from '../plugins/config'
import RAF from '../plugins/RAF'

import Table from './Table'

class MainThreeScene {
    constructor() {
        this.bind()
        this.table = Table
        this.objects = []
        this.targets = { table: [], sphere: [], helix: [], grid: [] }
    }

    init(container) {
        // RENDERER SETUP
        this.renderer = new CSS3DRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        // this.renderer.debug.checkShaderErrors = true
        this.renderer.outputEncoding = THREE.sRGBEncoding
        container.appendChild(this.renderer.domElement)

        // MAIN SCENE INSTANCE
        this.scene = new THREE.Scene()

        // CAMERA AND ORBIT CONTROLLER
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000)
        this.camera.position.z = 3000
        this.controls = new TrackballControls(this.camera, this.renderer.domElement)
        this.controls.enabled = config.controls
        this.controls.maxDistance = 6000
        this.controls.minDistance = 500

        // SET GUI


        // RENDER LOOP AND WINDOW SIZE UPDATER SETUP
        window.addEventListener("resize", this.resizeCanvas)
        RAF.subscribe('threeSceneUpdate', this.update)
        
        this.createShape()
        this.addEventListeners()
    }

    createShape() {
      // table
      for (let i = 0; i < this.table.length; i+= 5) {
        const element = document.createElement('div')
        element.className = 'element'
        element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')'

        const number = document.createElement('div')
        number.className = 'number'
        number.textContent= ( i / 5) + 1
        element.appendChild( number )

        const symbol = document.createElement('div')
        symbol.className = 'symbol'
        symbol.textContent = this.table[i]
        element.appendChild( symbol )

        const details = document.createElement('div')
        details.className = 'details'
        details.innerHTML = this.table[i + 1] + '<br>' + this.table[i + 2]
        element.appendChild(details)

        const objectCSS = new CSS3DObject(element)
        objectCSS.position.x = Math.random()* 4000 - 2000
        objectCSS.position.y = Math.random()* 4000 - 2000
        objectCSS.position.z = Math.random()* 4000 - 2000
        
        this.scene.add(objectCSS)

        this.objects.push(objectCSS)

        const object = new THREE.Object3D()
        object.position.x = ( this.table[i+3] * 140) - 1330
        object.position.y = - ( this.table[i+4] * 180) + 990

        this.targets.table.push( object )
      }

      // sphere
      const vector = new THREE.Vector3()
      const l = this.objects.length

      for(let i = 0; i < l; i ++) {
        const phi = Math.acos( -1 + (2 * i) / l)
        const theta = Math.sqrt( l * Math.PI ) * phi

        const object = new THREE.Object3D()

        object.position.setFromSphericalCoords( 800, phi, theta)
        vector.copy( object.position ).multiplyScalar( 2 )
        object.lookAt( vector )
        this.targets.sphere.push( object )
      }

      // helix

      for ( let i = 0; i < l; i++) {
        
        const theta = i * 0.175 + Math.PI
        const y = - ( i * 8 ) + 450

        const object = new THREE.Object3D()

        object.position.setFromCylindricalCoords( 900, theta, y)

        vector.x = object.position.x * 2
        vector.y = object.position.y
        vector.z = object.position.z * 2

        object.lookAt( vector )
        this.targets.helix.push( object )
      }

      // grid
      for (let i = 0; i < this.objects.length; i ++) {
        const object = new THREE.Object3D()

        object.position.x = (( i % 5 ) * 400) -800
        object.position.y = (- (Math.floor( i / 5 ) % 5) * 400) + 800
        object.position.z = (Math.floor( i / 25 )) * 1000 -2000

        this.targets.grid.push( object )
      }
    }

    transform( targetGroup, duration) {
      TWEEN.removeAll()

      for (let i = 0; i < this.objects.length; i ++) {
        const object = this.objects[i]
        const targets = targetGroup[i]

        new TWEEN.Tween( object.position )
          .to({ x: targets.position.x, y: targets.position.y, z: targets.position.z}, Math.random() * duration + duration)
          .easing( TWEEN.Easing.Exponential.InOut )
          .start()

        new TWEEN.Tween( object.rotation )
          .to( { x: targets.rotation.x, y: targets.rotation.y, z: targets.rotation.z }, Math.random() * duration + duration) 
          .easing( TWEEN.Easing.Exponential.InOut )
          .start()
      }

      // new TWEEN.Tween( this )
      //   .to({}, duration * 2)
      //   .easing( this.update )
      //   .start()
    }

    addEventListeners() {
        // button
        const buttonTable = document.querySelector('.table')
        buttonTable.addEventListener('click', () => {
          this.transform(this.targets.table, 2000)
        })

        const buttonSphere = document.querySelector('.sphere')
        buttonSphere.addEventListener('click', () => {
          this.transform(this.targets.sphere, 2000)
        })

        const buttonHelix = document.querySelector('.helix')
        buttonHelix.addEventListener('click', () => {
          this.transform(this.targets.helix, 2000)
        })

        const buttonGrid = document.querySelector('.grid')
        buttonGrid.addEventListener('click', () => {
          this.transform(this.targets.grid, 2000)
        })

        this.transform (this.targets.table, 2000)
    }

    update() {
        this.renderer.render(this.scene, this.camera)
        TWEEN.update()
        this.controls.update()
    }

    resizeCanvas() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
    }

    bind() {
        this.resizeCanvas = this.resizeCanvas.bind(this)
        this.update = this.update.bind(this)
        this.init = this.init.bind(this)
    }
}

const _instance = new MainThreeScene()
export default _instance