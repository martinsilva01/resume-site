import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, DepthOfField} from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei'
import WindowGroup from './Window.tsx'
import Background from './Background.tsx'
import Menu from './Menu.tsx'

export default function ThreeScene() {

	return (
		<Canvas camera={{ position: [0.36,0.0,3], fov: 40} }>
		 	<directionalLight position={[1,1,-1]} intensity={1} />
		 	<directionalLight position={[-1,-1,1]} intensity={1} />
			<EffectComposer >
				<Bloom luminanceThreshold={.2} intensity={1} radius={.4} />
				<DepthOfField focusDistance={2.5} focalLength={3} bokehScale={3} />
			</EffectComposer>
			<Menu />
			<WindowGroup/>
			<Background />
			<OrbitControls />
		</Canvas>
	)
}

