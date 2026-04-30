import { useState, useEffect, useContext, createContext } from 'react'
import { useMemo } from 'react'
import * as THREE from 'three'

type CameraContextType = {
	scene: SceneName
	camera: THREE.Camera
	position: number[]
	target: number[]
	up: number[]
	setCameraLocation: (sceneName: SceneName) => void;
}

export type SceneName = "Main" | "Resume" | "Projects" | "Github";

interface CameraProviderProps {
	children: React.ReactNode
}

const locationMap = {
	Main: 
		{ position: [0.1, 0, 3],
			target: [0.1, 0, 0],
			up: [0, 1, 0]
		},
	Resume: 
		{ position: [-4,0,-2.5],
			target:  [0, 0, -2.5],
			up: [0, 0, -1]
		},
	Projects: 
		{ position: [0.1,2,3],
			target:  [0.1,0,3],
			up: [0, 1, 0]

		},
	Github: 
		{ position: [0.1,0,3],
			target:  [0.1,0,0],
			up: [0, 1, 0]
		},
}

const CameraContext = createContext<CameraContextType | null>(null);

export function CameraProvider ({ children }: CameraProviderProps) {
	const [scene, setScene] = useState<SceneName>("Main");
	const [position, setPosition] = useState(locationMap.Main.position);
	const [target, setTarget] = useState(locationMap.Main.target);
	const [up, setUp] = useState(locationMap.Main.up);
	const camera = useMemo(() => {
		const cam = new THREE.PerspectiveCamera(40)
		return cam;
	}, []);
	


	const setCameraLocation = (sceneName: SceneName) => {
		if (locationMap[sceneName]) {
			const newPos = locationMap[sceneName].position
			const newTarget = locationMap[sceneName].target
			const newUp = locationMap[sceneName].up
			setScene(sceneName)
			setPosition(newPos)
			setTarget(newTarget)
			setUp(newUp)
		}
	}
	
	const contextValue: CameraContextType = {
		scene,
		camera,
		position,
		target,
		up,
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

