import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { type ThreeElements } from '@react-three/fiber'
import { Trail } from '@react-three/drei'

type OrbitProps = {
	sphereCount: number
	radius: number
	scale: number
	color: string
	speed: number
} & ThreeElements['group']

type SphereProps = {
	color: string
	scale: number
} & ThreeElements['mesh'] 

function Sphere({color, scale, ...props}: SphereProps) {

	return (
			<mesh scale={scale} {...props}>
				<meshBasicMaterial color={color}/>
				<sphereGeometry /> 
			</mesh>
	)
}

function Orbit({ sphereCount, radius, scale, color, speed, ...props }: OrbitProps) {
  const ref = useRef<THREE.Group | null>(null)
	const offset = (2 * Math.PI / sphereCount)

  useFrame(( state, delta ) => {
		if (!ref.current) return
		const t = speed * delta
		const clock = state.clock
		ref.current.rotation.z += t
		ref.current.rotation.x += t
		ref.current.children.forEach((child, i) => {
			if ( i % 2 == 0 ) {
				const currentChildCoordX = radius * Math.cos(i * offset)    // global location of current sphere
				const localOffsetX  = (radius * Math.cos((i + (.7 * Math.sin(clock.elapsedTime / 4))) * offset)) - currentChildCoordX
				child.position.x = localOffsetX
				const currentChildCoordY = radius * Math.sin(i * offset)    // global location of current sphere
				const localOffsetY = (radius * Math.sin((i + (.7 * Math.sin(clock.elapsedTime / 4))) * offset)) - currentChildCoordY
				child.position.y = localOffsetY

			}
		})
  })
	return (
		<group ref={ref}  {...props}>
			{Array.from({length: sphereCount},(_, i) => (
				<Trail key={i} width={1} length={3} color={color} attenuation={(t) => t * t}>
					<Sphere position={[radius * Math.cos(i * offset), radius * Math.sin(i * offset), 0]} scale={scale} color={color}/>		
				</Trail>
			))}			
		</group>
	)
}

type CylinderProps = {
	color: string,
	scale: number
} & ThreeElements['mesh'] 

type CylinderDecoProps = {
	cylinderCount: number
	radius: number
	scale: number
	color: string
	cylinderSpeed: number,
	decoSpeed: number,
} & ThreeElements['group']


function Cylinder({color, scale, ...props}: CylinderProps) {

	return (
			<mesh scale={scale} {...props}>
				<meshPhysicalMaterial metalness={1.2} clearcoat roughness={.2} ior={0.9} envMapIntensity={.9} transmission={.95} transparent side={THREE.DoubleSide} color={color} opacity={.7} reflectivity={.2} refractionRatio={.75} />
				<cylinderGeometry args={[1, 1, 10, 6]}/> 
			</mesh>
	)
}
function CylinderDeco({ cylinderCount, radius, scale, color, cylinderSpeed, decoSpeed, ...props }: CylinderDecoProps) {
  const ref = useRef<THREE.Group | null>(null)
	const offset = (2 * Math.PI / cylinderCount)

  useFrame(( state, delta ) => {
		if (!ref.current) return
		const deco_t = decoSpeed * delta
		const cylinder_t = cylinderSpeed * delta
		const clock = state.clock
		ref.current.rotation.z += deco_t
		ref.current.children.forEach((child, i) => {
				child.rotateY(cylinder_t)
			})
  })

	return (
		<group ref={ref}  {...props}>
			{Array.from({length: cylinderCount},(_, i) => (
					<Cylinder key={i} rotation={[0,0,(2 * (i - 2) * (Math.PI / cylinderCount))]} position={[radius * Math.cos(i * offset), radius * Math.sin(i * offset), 0]} scale={scale} color={color}/>		
			))}			
		</group>
	)
}

export default function Background() {

	return (
		<group>
			<CylinderDeco cylinderCount={8} radius={2.5 * (.5)} scale={2.5 * (.035)} color="#FF88FF" cylinderSpeed={1} decoSpeed={.1} position={[-1.5, 0, -2]} />
			<Orbit sphereCount={8} radius={.5} scale={.02} color="#FF88FF" speed={1} position={[-1.5, 0, -2]} />
		</group>
	)
}

