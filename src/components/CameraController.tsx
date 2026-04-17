import { useCameraContext } from '../context/cameraContext.tsx'
import { useAsciiContext } from '../context/asciiContext.tsx'
import  { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useEffect } from 'react'

export default function CameraController() {
	const { camera, position, target, upVector } = useCameraContext();
	const { ascii, toggleAscii } = useAsciiContext();
	const targetMat = useMemo(() => new THREE.Matrix4(), []);
	const targetQuat = useMemo(() => new THREE.Quaternion(), []);

	useFrame(() => {

		targetMat.lookAt(position, target, upVector);
		targetQuat.setFromRotationMatrix(targetMat);

		camera.quaternion.slerp(targetQuat, 0.05);
		camera.position.lerp(position, 0.05);
		

		const distance = camera.position.distanceTo(position);
		console.log(ascii)
		if (ascii && distance < .3) {
			toggleAscii();
		}
	})
	return (
		<></>
	)
}
