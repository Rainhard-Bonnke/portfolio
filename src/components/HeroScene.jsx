import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { PROJECTS } from '../data/projects'
import './HeroScene.css'

const ORBIT_PROJECTS = ['commerce', 'ai', 'experiences']
  .map((category) => PROJECTS.find((project) => project.category === category))
  .filter(Boolean)

export default function HeroScene() {
  const canvasRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
    camera.position.set(0, 0, 8.5)

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' })
    } catch {
      canvas.closest('.hero-scene')?.classList.add('hero-scene-unavailable')
      return undefined
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setSize(canvas.clientWidth || 640, canvas.clientHeight || 640, false)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15

    scene.add(new THREE.AmbientLight(0xffe6d3, 1.6))
    const keyLight = new THREE.PointLight(0xff7654, 38, 18)
    keyLight.position.set(3.5, 3.2, 4.5)
    scene.add(keyLight)
    const coolLight = new THREE.PointLight(0x7fa8ff, 24, 16)
    coolLight.position.set(-4, -2, 2)
    scene.add(coolLight)

    const sculpture = new THREE.Group()
    sculpture.position.set(0.52, -0.5, 0.05)
    sculpture.scale.setScalar(0.64)
    scene.add(sculpture)

    const crystal = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.02, 1),
      new THREE.MeshPhysicalMaterial({
        color: 0xffba8b,
        metalness: 0.56,
        roughness: 0.24,
        clearcoat: 1,
        clearcoatRoughness: 0.16,
        flatShading: true,
        emissive: 0x402016,
        emissiveIntensity: 0.28,
      }),
    )
    sculpture.add(crystal)

    const crystalWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.045, 1),
      new THREE.MeshBasicMaterial({ color: 0xfff0d7, wireframe: true, transparent: true, opacity: 0.18 }),
    )
    sculpture.add(crystalWire)

    const satellite = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.16, 0),
      new THREE.MeshPhysicalMaterial({ color: 0xd5f3a5, metalness: 0.38, roughness: 0.2, clearcoat: 1 }),
    )
    satellite.position.set(1.26, 0.5, 0.22)
    sculpture.add(satellite)

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xd5f3a5,
      metalness: 0.78,
      roughness: 0.26,
      emissive: 0x263e14,
      emissiveIntensity: 0.32,
    })
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.48, 0.025, 12, 180), ringMaterial)
    ring.rotation.set(0.95, 0.18, 0.35)
    sculpture.add(ring)

    const innerRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.25, 0.012, 8, 160),
      new THREE.MeshBasicMaterial({ color: 0xfff0d7, transparent: true, opacity: 0.68 }),
    )
    innerRing.rotation.set(0.18, 1.12, -0.5)
    sculpture.add(innerRing)

    const starCount = 180
    const starPositions = new Float32Array(starCount * 3)
    for (let index = 0; index < starCount; index += 1) {
      starPositions[index * 3] = (Math.random() - 0.5) * 7.5
      starPositions[index * 3 + 1] = (Math.random() - 0.5) * 6.5
      starPositions[index * 3 + 2] = (Math.random() - 0.5) * 4 - 1
    }
    const starGeometry = new THREE.BufferGeometry()
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xffdcb9, size: 0.018, transparent: true, opacity: 0.75 }))
    scene.add(stars)

    const cards = new THREE.Group()
    scene.add(cards)
    const cardGeometry = new THREE.PlaneGeometry(1.08, 0.72)
    const cardFrameGeometry = new THREE.PlaneGeometry(1.13, 0.77)
    const loader = new THREE.TextureLoader()
    const textures = []

    ORBIT_PROJECTS.forEach((project, index) => {
      const holder = new THREE.Group()
      const angle = (index / ORBIT_PROJECTS.length) * Math.PI * 2 - Math.PI / 2
      holder.position.set(Math.cos(angle) * 2.12, Math.sin(angle) * 1.72, 0.2)
      holder.userData.phase = index * 2.1

      const frame = new THREE.Mesh(
        cardFrameGeometry,
        new THREE.MeshBasicMaterial({ color: index === 1 ? 0xd5f3a5 : 0xfff6e8 }),
      )
      frame.position.z = -0.015
      holder.add(frame)

      const texture = loader.load(project.previewImage, (loaded) => {
        loaded.colorSpace = THREE.SRGBColorSpace
        loaded.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4)
      }, undefined, () => holder.remove(preview))
      textures.push(texture)

      const preview = new THREE.Mesh(
        cardGeometry,
        new THREE.MeshBasicMaterial({ map: texture, color: 0xffffff, toneMapped: false }),
      )
      holder.add(preview)
      cards.add(holder)
    })

    const pointer = new THREE.Vector2(0, 0)
    const targetPointer = new THREE.Vector2(0, 0)
    const raycaster = new THREE.Raycaster()
    const cardTargets = new Map()
    cards.traverse((object) => {
      if (object.isMesh && object.geometry === cardGeometry) cardTargets.set(object, ORBIT_PROJECTS[cards.children.indexOf(object.parent)])
    })
    let pressPosition = null

    const resizeObserver = new ResizeObserver(() => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    })
    resizeObserver.observe(canvas)

    function updatePointer(event) {
      const bounds = canvas.getBoundingClientRect()
      targetPointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
      targetPointer.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1)
    }

    function resetPointer() {
      targetPointer.set(0, 0)
      canvas.style.cursor = 'default'
    }

    function beginPress(event) {
      pressPosition = { x: event.clientX, y: event.clientY }
    }

    function activateCard(event) {
      if (!pressPosition || Math.hypot(event.clientX - pressPosition.x, event.clientY - pressPosition.y) > 8) {
        pressPosition = null
        return
      }

      const bounds = canvas.getBoundingClientRect()
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
      pointer.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1)
      raycaster.setFromCamera(pointer, camera)
      const hit = raycaster.intersectObjects([...cardTargets.keys()], false)[0]
      const project = hit && cardTargets.get(hit.object)
      pressPosition = null
      if (project) window.open(project.demo || project.repo, '_blank', 'noopener,noreferrer')
    }

    function animate() {
      frameId = requestAnimationFrame(animate)
      pointer.lerp(targetPointer, 0.035)

      if (!pausedRef.current && !reducedMotion.matches) {
        sculpture.rotation.y += 0.0038
        sculpture.rotation.x = Math.sin(performance.now() * 0.00024) * 0.12
        ring.rotation.z += 0.002
        innerRing.rotation.x -= 0.0014
        cards.rotation.y += 0.0018
        cards.children.forEach((card, index) => {
          const phase = performance.now() * 0.0007 + card.userData.phase
          card.position.y += Math.sin(phase) * 0.00045
          card.rotation.z = Math.sin(phase * 0.45) * 0.045
          card.scale.setScalar(1 + Math.max(0, Math.sin(phase)) * 0.018)
        })
        stars.rotation.z -= 0.00022
      }

      sculpture.rotation.y += pointer.x * 0.0008
      cards.rotation.x = pointer.y * 0.11
      sculpture.rotation.x += pointer.y * 0.0005
      camera.position.x += (pointer.x * 0.24 - camera.position.x) * 0.018
      camera.position.y += (pointer.y * 0.18 - camera.position.y) * 0.018
      camera.lookAt(0, 0, 0)

      raycaster.setFromCamera(pointer, camera)
      const hovered = raycaster.intersectObjects([...cardTargets.keys()], false).length > 0
      canvas.style.cursor = hovered ? 'pointer' : 'grab'
      renderer.render(scene, camera)
    }

    let frameId = requestAnimationFrame(animate)
    canvas.addEventListener('pointermove', updatePointer)
    canvas.addEventListener('pointerleave', resetPointer)
    canvas.addEventListener('pointerdown', beginPress)
    canvas.addEventListener('pointerup', activateCard)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      canvas.removeEventListener('pointermove', updatePointer)
      canvas.removeEventListener('pointerleave', resetPointer)
      canvas.removeEventListener('pointerdown', beginPress)
      canvas.removeEventListener('pointerup', activateCard)
      scene.traverse((object) => {
        object.geometry?.dispose()
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
        else object.material?.dispose()
      })
      textures.forEach((texture) => texture.dispose())
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  return (
    <div className="hero-scene" aria-label="Interactive 3D sculpture with previews of selected projects">
      <canvas ref={canvasRef} className="hero-scene-canvas" aria-hidden="true" />
      <button
        type="button"
        className="hero-scene-toggle"
        onClick={() => setPaused((current) => !current)}
        aria-pressed={paused}
        aria-label={paused ? 'Resume 3D animation' : 'Pause 3D animation'}
      >
        <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
        <span>{paused ? 'Resume motion' : 'Pause motion'}</span>
      </button>
      <span className="hero-scene-hint" aria-hidden="true">MOVE TO PLAY</span>
      <nav className="hero-scene-project-links" aria-label="Projects shown in the 3D scene">
        {ORBIT_PROJECTS.map((project) => (
          <a href={project.demo || project.repo} target="_blank" rel="noopener noreferrer" key={project.name}>
            Open {project.name}
          </a>
        ))}
      </nav>
    </div>
  )
}
