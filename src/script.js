import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()
// gui.hide()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5,84,84);

//Loading Textures
const loader = new THREE.TextureLoader()

const colorMap = loader.load('/Textures/Metal_Mesh_008_basecolor.jpg')
const metalMap = loader.load('/Textures/Metal_Mesh_008_metallic.jpg')
const normalMap = loader.load('/Textures/Metal_Mesh_008_normal.jpg')
const heightMap = loader.load('/Textures/Metal_Mesh_008_height.png')
const roughMap = loader.load('/Textures/Metal_Mesh_008_roughness.jpg')
const alphaMap = loader.load('/Textures/Metal_Mesh_008_opacity.jpg  ')
// Materials
const material = new THREE.MeshStandardMaterial(
   
)
material.map = colorMap
material.transparent = true
material.alphaMap = alphaMap
material.displacementMap = heightMap
material.displacementScale = 0.001
material.metalnessMap = metalMap
material.normalMap = normalMap
material.roughnessMap = roughMap
// material.color.set(0xffffff)

// gui.add(material, 'roughness', 0, 1, 0.001).setValue(0)
// gui.add(material, 'metalness', 0, 1, 0.001).setValue(0)
const data = {
    color: 0xffffff
}
// gui.addColor(data,'color').onChange(()=>{
//     material.color.set(data.color)
// })
// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)
const sphere2 = new THREE.Mesh(geometry,material)
scene.add(sphere2)

//Sprite testing
const spritealphaMap = loader.load('')
const spriteMap = loader.load('/Textures/Eric_text.png')
const spriteMaterial = new THREE.SpriteMaterial({alphaMap: spriteMap
})
const sprite = new THREE.Sprite(spriteMaterial)
sprite.scale.set(2,2,2)
scene.add(sprite)

// Lights
const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const h1 = document.getElementsByClassName('main-title')
const cssrenderer = new THREE.Sprite
 
/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.x = .5 * elapsedTime
    sphere.position.x = Math.sin(elapsedTime*1.5)*2
    sphere.position.y = Math.sin(elapsedTime*1.5)
    sphere.position.z = Math.cos(elapsedTime*1.5)

    sphere2.rotation.y = .5 * elapsedTime
    sphere2.rotation.x = -1*.5 * elapsedTime
    sphere2.position.x = -1*Math.sin(elapsedTime*1.5)*2
    sphere2.position.y = Math.sin(elapsedTime*1.5)
    sphere2.position.z = -1*Math.cos(elapsedTime*1.5)


    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()