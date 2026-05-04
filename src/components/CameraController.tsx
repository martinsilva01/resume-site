import { useCameraContext } from '../context/cameraContext.tsx'
import { useAsciiContext } from '../context/asciiContext.tsx'
import  { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useEffect } from 'react'

export default function CameraController() {
	const { position, target, up } = useCameraContext();
	const { ascii, setAscii } = useAsciiContext();
	const targetMat = useMemo(() => new THREE.Matrix4(), []);
	const targetQuat = useMemo(() => new THREE.Quaternion(), []);
	const positionVector = useMemo(() => new THREE.Vector3(), [])
	const targetVector = useMemo(() => new THREE.Vector3(), [])
	const upVector = useMemo(() => new THREE.Vector3(), [])
	const camera = useMemo(() => new THREE.PerspectiveCamera(40), [])
  const set = useThree((s) => s.set)

  useEffect(() => {
    set({ camera })
  }, [camera, set])

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
	return null
}
