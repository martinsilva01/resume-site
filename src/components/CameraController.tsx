import { useCameraContext } from '../context/cameraContext.tsx'
import { useAsciiContext } from '../context/asciiContext.tsx'
import  { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo } from 'react'

export default function CameraController() {
	const { camera, position, target, up } = useCameraContext();
	const { ascii, setAscii } = useAsciiContext();
	const targetMat = useMemo(() => new THREE.Matrix4(), []);
	const targetQuat = useMemo(() => new THREE.Quaternion(), []);
	const positionVector = useMemo(() => new THREE.Vector3(), [])
	const targetVector = useMemo(() => new THREE.Vector3(), [])
	const upVector = useMemo(() => new THREE.Vector3(), [])

	useFrame(() => {
		positionVector.fromArray(position)
		targetVector.fromArray(target)
		upVector.fromArray(up)
		targetMat.lookAt(positionVector, targetVector, upVector);
		targetQuat.setFromRotationMatrix(targetMat);

		camera.quaternion.slerp(targetQuat, 0.05);
		camera.position.lerp(positionVector, 0.05);
		

		const distance = camera.position.distanceTo(positionVector);
		if (!ascii && distance > .3) {
			setAscii(true);
			setTimeout(() => {
				setAscii(false);
			}, 1200);
		}
	})
	return (
		<></>
	)
}
