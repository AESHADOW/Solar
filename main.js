import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

let width = window.innerWidth
let height = window.innerHeight
const EARTH_YEAR = (2*Math.PI)/365
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45,width/height,0.1,1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width,height)
renderer.setPixelRatio(window.devicePixelRatio)
document.getElementById('app').appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
camera.position.z = 200
controls.update()

///sun///
const sunGeo = new THREE.SphereGeometry(30,25,25)
const sunTex = new THREE.TextureLoader().load('textures/sun.jpg')
const sunMat = new THREE.MeshBasicMaterial({map: sunTex,opacity:0.80,transparent:true})
const sun = new THREE.Mesh(sunGeo,sunMat)
scene.add(sun)
//////////////////////////////////////////
const gridHelper = new THREE.GridHelper(400,20)
scene.add(gridHelper)
/////////////////////////////////////////
const light = new THREE.PointLight(0xffffff,100000)
scene.add(light)
/////////////////////////////////////////


const planetCreator = (size,position,texture,ring) => {
  const geo = new THREE.SphereGeometry(size,25,25)
  const tex = new THREE.TextureLoader().load(`textures/${texture}.jpg`)
  const mat = new THREE.MeshPhongMaterial({map: tex,opacity:0.9,transparent:true})
  const planet = new THREE.Mesh(geo,mat)
  planet.position.x = position
  const planetObj = new THREE.Object3D()
  planetObj.add(planet)
  if(ring){
    const ringGeo = new THREE.RingGeometry(ring.size,ring.rad,30)
    const ringTex = new THREE.TextureLoader().load(`textures/${ring.tex}.jpg`)
    const ringMat = new THREE.MeshStandardMaterial({map: ringTex,side: THREE.DoubleSide,opacity:0.9,transparent:true})
    const ringo = new THREE.Mesh(ringGeo,ringMat)
    planetObj.add(ringo)
    ringo.position.x = position
    ringo.rotation.x = -0.5 * Math.PI
    return{obj:planetObj,p:planet,r:ringo}
  }


  return{obj:planetObj,p:planet}
}
/////////////////////////////////////////
const mercury = planetCreator(2,70,'mercury')
const venus = planetCreator(6,100,'venus')
const earth = planetCreator(8,130,'earth')
const mars = planetCreator(4,150,'mars')
const jupiter = planetCreator(15,170,'jupiter')
const saturn = planetCreator(10,240,'saturn',{size:11,rad:17,tex:'saturn'})

scene.add(mercury.obj)
scene.add(venus.obj)
scene.add(earth.obj)
scene.add(mars.obj)
scene.add(jupiter.obj)
scene.add(saturn.obj)



/////////////////////////////////////////

const animate = () =>{
  sun.rotation.y += 0.01
  mercury.obj.rotation.y += EARTH_YEAR *3
  venus.obj.rotation.y += EARTH_YEAR *2
  earth.obj.rotation.y += EARTH_YEAR 
  mars.obj.rotation.y += EARTH_YEAR / 4
  jupiter.obj.rotation.y += EARTH_YEAR / 6
  saturn.obj.rotation.y += EARTH_YEAR / 10

  mercury.p.rotation.y += 0.5
  venus.p.rotation.y += 0.3
  earth.p.rotation.y += 0.1
  mars.p.rotation.y += 0.08
  saturn.p.rotation.y += 0.05
  jupiter.p.rotation.y += 0.03
  saturn.r.rotation.y += 0.04
 
  controls.update()
  renderer.render(scene,camera)
  requestAnimationFrame(animate)

}
animate()


