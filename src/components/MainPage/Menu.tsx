import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useMemo } from 'react'
import { RoundedBoxGeometry } from '@react-three/drei'
import { type ThreeElements } from '@react-three/fiber'
import { useAsciiContext } from '../../context/asciiContext.tsx'
import { useCameraContext } from '../../context/cameraContext.tsx'
import type { SceneName } from '../../context/cameraContext.tsx'

type MenuItemProps = {
	text: SceneName 
	image: string
	color: string
} & ThreeElements['group']

function createTextTexture(text: string) {
	const HEIGHT = 256;
	const WIDTH = 1280;
	const FONT_SIZE = 128;
	const TEXT_START_POS = 128;
	const LEFT_PADDING = 640;
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
	canvas.height = HEIGHT;
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

	context.clearRect(0, 0, canvas.width, canvas.height);
 	context.font = `200 ${FONT_SIZE}px 'Manrope'`;
 	context.textAlign = 'center';
 	context.textBaseline = 'middle';
 	context.fillStyle = 'rgba(255, 0, 255, 1)';
 	context.fillText(text, LEFT_PADDING, TEXT_START_POS);	
	texture.needsUpdate = true;

  return texture;
}
function MenuItem({text, color, ...props}: MenuItemProps) {
	const { ascii, toggleAscii } = useAsciiContext();
	const { camera, position, setCameraLocation } = useCameraContext();
	const locationMap = {
		Main: 
			{ position: new THREE.Vector3(0.1, 0, 3),
				target:  new THREE.Vector3(0.1, 0, 3),
			},
		Resume: 
			{ position: new THREE.Vector3(0.1,0,5),
				target:  new THREE.Vector3(0.1, 0, 3),
			},
		Projects: 
			{ position: new THREE.Vector3(0.1,0,3),
				target:  new THREE.Vector3(0.1,0,3),
			},
		Github: 
			{ position: new THREE.Vector3(0.1,0,3),
				target:  new THREE.Vector3(0.1,0,3),
			},
	}	

	const texture = useMemo(() => createTextTexture(text), [text])
	const ref = useRef<THREE.Group | null>(null)
	const [hover, setHover] = useState(false);
	useFrame(() => {
	  if (!ref.current) return
	
	  const targetZ = hover ? 0.2 : 0.0
	
	  ref.current.position.z += (targetZ - ref.current.position.z) * 0.1
	})
	return (
		<group 
			ref={ref}
			onPointerEnter={(e) => {
				e.stopPropagation()
				setHover(true)
			}}
			onPointerLeave={(e) => {
				e.stopPropagation()
				setHover(false)
			}}
			onClick={(e) => {
				e.stopPropagation()
				const distance = camera.position.distanceTo(locationMap[text].position);
				if (!ascii && distance > .3) {
					toggleAscii();
				}

				setCameraLocation(text);

			}}
			{...props}>
			<mesh scale={.25}>
				<meshBasicMaterial transparent map={texture} side={THREE.DoubleSide} />
				<planeGeometry args={[5, 1]}/>
			</mesh>
			<mesh 

			scale={.25}>
				<meshPhysicalMaterial metalness={1.2} clearcoat roughness={.2} ior={0.9} envMapIntensity={.9} transmission={.95} transparent side={THREE.DoubleSide} color={color} opacity={.7} reflectivity={.2} refractionRatio={.75} depthWrite={false} />
				<RoundedBoxGeometry args={[5, 1, .5]} bevelSegments={1} />
			</mesh>
		</group>
	)
}

export default function Menu() {
	const ref = useRef<THREE.Group | null>(null)
	return (
	<group ref={ref} position={[-.7, 0, 0]} rotation={[0, .75, 0]}>
		<MenuItem text="Resume" image="hello" color="#FF88FF" position={[0, .5, 0]} />
		<MenuItem text="Projects" image="hello" color="#FF88FF" position={[0, 0, 0]} />
		<MenuItem text="Github" image="hello" color="#FF88FF" position={[0, -.5, 0]} />
	</group>
)

}

