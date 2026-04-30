import * as THREE from 'three'
import { useRef, useEffect, useMemo, useState } from 'react'
import { TextureLoader } from 'three'
import { useLoader, useFrame, extend, createPortal } from '@react-three/fiber'
import AsciiMaterial from '../ASCIIMaterial.tsx'
import { type ThreeElements } from '@react-three/fiber'
import { useCameraContext } from '../../../context/cameraContext.tsx'
import { Select } from '@react-three/postprocessing'
extend({ AsciiMaterial })

type Image3DProps = {
	path: string,
} & ThreeElements['mesh']

export default function Image3D({path, ...props}: Image3DProps) {
	const meshRef = useRef<THREE.Mesh | null>(null);
	const { scene, position } = useCameraContext();
	const positionVector = useMemo(() => new THREE.Vector3(),[]);

	useFrame((state, delta) => {
		const clock = state.clock
		if (!meshRef.current) return
		meshRef.current.position.z = 3 + .01 * Math.sin(clock.elapsedTime * 2) //hardcoded
		if (scene == "Projects") {
			meshRef.current.lookAt(positionVector.fromArray(position))
		}
	})

	const map = useLoader(TextureLoader, path)
	return (
			<Select enabled={false}>
				<mesh ref={meshRef} scale={.125} {...props} >
					<planeGeometry  args={[16,9] } />
					<meshBasicMaterial map={map} color={[1,1,1]}/>
				</mesh>		
			</Select>
	)
}
