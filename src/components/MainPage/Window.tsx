import * as THREE from 'three'
import { useRef, useMemo, useState } from 'react'
import { TextureLoader } from 'three'
import { useLoader, useFrame, extend, createPortal } from '@react-three/fiber'
import { useFBO } from '@react-three/drei'
import { OBJLoader, MTLLoader, } from 'three/addons'
import AsciiMaterial from './ASCIIMaterial.tsx'
extend({ AsciiMaterial })



function Window() {
	const map = useLoader(TextureLoader, "./window.png")
	return (
		<group>
			<mesh position={[1,.1,0]}>
				<planeGeometry args={[1,1]} />
				<meshBasicMaterial map={map} />
			</mesh>		
			<mesh position={[1,.05,-.03]}>
				<boxGeometry args={[1,1.1,0.05]} />
				<meshBasicMaterial color="#000000" /> 
			</mesh>
		</group>
	)
}
function WindowPortal() {

	return (
		<>
		{/*<Canvas camera={{ position: [0,0,10], fov: 70} }>*/}
			<ambientLight intensity={1} />
			<directionalLight position={[5,5,5]} intensity={5} />
			<Heart />
		</>
	)
}

function Heart() {
	const objRef = useRef<THREE.Object3D | null>(null)
	const materials = useLoader(MTLLoader, "./Heart.mtl")
	const obj = useLoader(OBJLoader, "./Heart.obj", (loader) => {
		materials.preload()
		loader.setMaterials(materials)
	})
	useFrame(( state, delta ) => {
		if (objRef.current) {
			objRef.current.rotation.y += 2 * delta
			{/*objRef.current.position.y = .25 * Math.sin(clock.elapsedTime * 2)*/}
		}
	})

	return <primitive ref={objRef} object={obj} materials={materials} scale={.01} />
}

function createTextTexture() {
	const SIZE = 1024;
	const FONT_SIZE = 24;
	const TEXT_START_POS = 24;
	const LEFT_PADDING = 12;
	const UPDATE_INTERVAL = 500;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = SIZE;
	let cursor = "█"
	const baseLines = [
		"martin:~/ -> ./introduction.sh",
		"",
		"Hello! My name is Martin Silva.",
		"I graduated from California State University, Long Beach with a ",
		"Bachelor's in Computer Science. This is my website, created with React,",
		"ThreeJS, and React Three Fiber. ",
		"",
	]
  const texture = new THREE.CanvasTexture(
    canvas,
    undefined,
    THREE.RepeatWrapping,
    THREE.RepeatWrapping,
    THREE.NearestFilter,
    THREE.NearestFilter
  );	

	const context = canvas.getContext('2d');

	if (!context) return

	
	setInterval(() => {
		cursor = (cursor == "█") ? " " : "█";
		const textLines = [
		...baseLines,
		`martin:~/ -> ${cursor}`,
		]
		context.clearRect(0, 0, canvas.width, canvas.height);
  	context.font = `${FONT_SIZE}px 'Roboto Mono'`;
  	context.textAlign = 'left';
  	context.textBaseline = 'middle';
  	context.fillStyle = '#FF00FF';

		textLines.forEach((line, i) => {
  		context.fillText(line, LEFT_PADDING, TEXT_START_POS + (i * FONT_SIZE));	
		});

		texture.needsUpdate = true;
	}, UPDATE_INTERVAL)

  return texture;
}

function usePortal(inUse: boolean, meshRef: React.RefObject<THREE.Mesh<THREE.PlaneGeometry, THREE.Material | THREE.Material[]> | null>, asciiMaterialRef: React.RefObject<AsciiMaterial | null>) {
	const windowScene = useMemo(() => new THREE.Scene(), [])
	const windowCamera = useMemo(() => {
		const newWindowCamera = new THREE.OrthographicCamera()
		newWindowCamera.position.y = -.1
		newWindowCamera.position.z = 5
		return newWindowCamera
	}, [])

  const windowSceneRender = useFBO()

	useFrame(({ gl }) => {
		if (!inUse || !asciiMaterialRef.current || !meshRef.current) return
    gl.setRenderTarget(windowSceneRender)
		gl.clear()
		meshRef.current.geometry.computeBoundingBox()
		const boundingBoxSize = new THREE.Vector3();
		meshRef.current.geometry.boundingBox?.getSize(boundingBoxSize)
		asciiMaterialRef.current.uniforms.uTexture.value = windowSceneRender.texture
		meshRef.current.material.map = windowSceneRender.texture
    gl.render(windowScene, windowCamera)
    gl.setRenderTarget(null)
	})

	return (
			createPortal(<WindowPortal />, windowScene)
	)
}
export default function WindowGroup() {
	const groupRef = useRef<THREE.Group | null>(null)
	const meshRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.Material | THREE.Material[]> | null>(null)
  const asciiMaterialRef = useRef<AsciiMaterial | null>(null)
	const [portalState, setPortalState] = useState(false)
	const texture = useMemo(() => createTextTexture(), []);
	useFrame((state) => {
		const clock = state.clock
		if (!meshRef.current || !groupRef.current) return
		groupRef.current.position.y = .1 * Math.sin(clock.elapsedTime * 2)
		
		
  })
	return (

		<group ref={groupRef} rotation={new THREE.Euler(0, -.5, 0)}>
			<Window />
			<mesh 
			onPointerEnter={() => {setPortalState(true)}}
			onPointerLeave={() => {setPortalState(false)}}
			position={[1, 0, 0.0001]} ref={meshRef}> 
				<planeGeometry args={[1,1]} />
				{portalState ? (
					<asciiMaterial ref={asciiMaterialRef} />
				) : (
					<meshBasicMaterial map={texture} />
				)}
			{usePortal(portalState, meshRef, asciiMaterialRef)}
			</mesh>
		</group>
	)
}
