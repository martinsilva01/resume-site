import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { useAsciiContext } from '../../context/asciiContext.tsx'
import { useProjectContext } from  '../../context/projectContext.tsx'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import CameraController from '../CameraController.tsx'
import { AsciiRenderer } from './AsciiRenderer.tsx'
import WindowGroup from './Window.tsx'
import Background from './Background.tsx'
import Menu from './Menu.tsx'
import Image3D from './Projects/3DImage.tsx'
import { Html, useProgress } from '@react-three/drei'

export default function ThreeScene() {
	return (
		<SceneContent />
	)
}


function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

function SceneContent() {
	const { ascii } = useAsciiContext();
	const { projects, active } = useProjectContext();

	return (
		<Canvas> 
			<Suspense fallback={<Loader />}>
			<CameraController />
		 	<directionalLight position={[15,8,20]} intensity={.5} />
		 	<directionalLight position={[-10,20,-2]} intensity={.5} />
			<EffectComposer>
				<Bloom luminanceThreshold={.99} intensity={.1} />
			</EffectComposer>
			<Menu />
			<WindowGroup position={[1, 0, .5]} />
			<Background />
			<Image3D path={projects[active].img} up={[0, 0, -1]} position={[-0.8, -1, 3]} rotation={new THREE.Euler(0, .5, 0)} />
			<AsciiRenderer enabled={ascii} invert={false} fgColor="#FF00FF" bgColor="#220022" resolution={.1666} /> 
			</Suspense>
		</Canvas>
	)
}

