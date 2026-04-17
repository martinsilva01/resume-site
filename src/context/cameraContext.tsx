import { useState, useContext, createContext } from 'react'
import { useMemo } from 'react'
import * as THREE from 'three'

type CameraContextType = {
	camera: THREE.Camera
	position: THREE.Vector3
	target: THREE.Vector3
	upVector: THREE.Vector3
	setCameraLocation: (sceneName: SceneName) => void;
}

export type SceneName = "Main" | "Resume" | "Projects" | "Github";

interface CameraProviderProps {
	children: React.ReactNode
}

const locationMap = {
	Main: 
		{ position: new THREE.Vector3(0.1, 0, 3),
			target:  new THREE.Vector3(0.1, 0, 0),
			upVector: new THREE.Vector3(0, 1, 0)
		},
	Resume: 
		{ position: new THREE.Vector3(-4,0,-2.5),
			target:  new THREE.Vector3(0, 0, -2.5),
			upVector: new THREE.Vector3(0, 0, -1)
		},
	Projects: 
		{ position: new THREE.Vector3(0.1,0,10),
			target:  new THREE.Vector3(0.1,0,0),
			upVector: new THREE.Vector3(0, 1, 0)

		},
	Github: 
		{ position: new THREE.Vector3(0.1,0,3),
			target:  new THREE.Vector3(0.1,0,0),
			upVector: new THREE.Vector3(0, 1, 0)
		},
}

const CameraContext = createContext<CameraContextType | null>(null);

export function CameraProvider ({ children }: CameraProviderProps) {
	const [position, setPosition] = useState(locationMap.Main.position);
	const [target, setTarget] = useState(locationMap.Main.target);
	const [upVector, setUpVector] = useState(new THREE.Vector3(0, 1, 0))
	const camera = useMemo(() => {
		const cam = new THREE.PerspectiveCamera(40)
		cam.position.set(locationMap.Main.position.x, locationMap.Main.position.y, locationMap.Main.position.z);
		cam.lookAt(locationMap.Main.target);
		return cam;
	}, []);



	const setCameraLocation = (sceneName: SceneName) => {
		if (locationMap[sceneName]) {
			const newPos = locationMap[sceneName].position
			const newTarget = locationMap[sceneName].target
			const newUp = locationMap[sceneName].upVector
			setPosition(newPos)
			setTarget(newTarget)
			setUpVector(newUp)
		}
	}
	
	const contextValue: CameraContextType = {
		camera,
		position,
		target,
		upVector,
		setCameraLocation
	}
		
	return (
		<CameraContext.Provider value={contextValue}>
			{children}
		</CameraContext.Provider>
	)
};

export function useCameraContext() {
	const context = useContext(CameraContext)
	if (!context) {
		throw new Error('useCamera must be used within CameraProvider');
	}
	return context;
}

