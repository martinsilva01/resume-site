import { Canvas } from '@react-three/fiber'
import { useAsciiContext, AsciiProvider } from '../../context/asciiContext.tsx'
import { useCameraContext, CameraProvider } from  '../../context/cameraContext.tsx'
import { EffectComposer, Bloom, DepthOfField} from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei'
import CameraController from '../CameraController.tsx'
import { AsciiRenderer } from './AsciiRenderer.tsx'
import WindowGroup from './Window.tsx'
import Background from './Background.tsx'
import Menu from './Menu.tsx'

export default function ThreeScene() {
	return (
		<CameraProvider>
		<AsciiProvider>
			<SceneContent />
		</AsciiProvider>
		</CameraProvider>
	)
}

function SceneContent() {
	const { ascii } = useAsciiContext();
	const { camera } = useCameraContext();

	return (
		<Canvas camera={camera}>
			<CameraController />
		 	<directionalLight position={[1,1,-1]} intensity={1} />
		 	<directionalLight position={[-1,-1,1]} intensity={1} />
			<EffectComposer>
				<Bloom luminanceThreshold={.2} intensity={1} radius={.4} />
				<DepthOfField focusDistance={2.5} focalLength={3} bokehScale={3} />
			</EffectComposer>
			<Menu />
			<WindowGroup/>
			<Background />
			<AsciiRenderer enabled={ascii} invert={false} fgColor="#FF00FF" bgColor="#220022" resolution={.1666} /> 
		</Canvas>
	)
}

