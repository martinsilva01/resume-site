import { useRef } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { useAsciiContext, AsciiProvider } from '../../context/asciiContext.tsx'
import { useCameraContext, CameraProvider } from  '../../context/cameraContext.tsx'
import { useProjectContext } from  '../../context/projectContext.tsx'
import { Selection, Select, EffectComposer, Bloom, SelectiveBloom, DepthOfField} from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei'
import CameraController from '../CameraController.tsx'
import { AsciiRenderer } from './AsciiRenderer.tsx'
import WindowGroup from './Window.tsx'
import Background from './Background.tsx'
import Menu from './Menu.tsx'
import Image3D from './Projects/3DImage.tsx'

export default function ThreeScene() {
	return (
		<SceneContent />
	)
}

function SceneContent() {
	const { ascii } = useAsciiContext();
	const { camera } = useCameraContext();
	const { projects, active } = useProjectContext();

	return (
		<Canvas camera={camera}>
			<CameraController />
		 	<directionalLight position={[1,1,-1]} intensity={1} />
		 	<directionalLight position={[-1,-1,1]} intensity={1} />
				<EffectComposer>
					<Bloom luminanceThreshold={1} intensity={.1} radius={.4} />
					<DepthOfField focusDistance={2.5} focalLength={3} bokehScale={3} />
				</EffectComposer>
				<Menu />
				<WindowGroup position={[1, 0, 0]} />
				<Background />
				<Image3D path={projects[active].img} up={[0, 0, -1]} position={[-0.8, -1, 3]} rotation={new THREE.Euler(0, .5, 0)} />
			<AsciiRenderer enabled={ascii} invert={false} fgColor="#FF00FF" bgColor="#220022" resolution={.1666} /> 
		</Canvas>
	)
}

