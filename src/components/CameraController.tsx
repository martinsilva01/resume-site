import { useCameraContext } from '../context/cameraContext.tsx'
import { useAsciiContext } from '../context/asciiContext.tsx'
import  { useFrame } from '@react-three/fiber'

export default function CameraController() {
	const { camera, position } = useCameraContext();
	const { ascii, toggleAscii } = useAsciiContext();
	useFrame(() => {
		camera.position.lerp(position, 0.05);
		const distance = camera.position.distanceTo(position);
		if (ascii && distance < .3) {
			toggleAscii();
		}
	})
	return (
		<></>
	)
}
