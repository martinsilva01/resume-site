import * as React from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { AsciiEffect } from 'three-stdlib'

export type AsciiRendererProps = {
	/** enabled, default: true */
	enabled?: boolean
  /** Render index, default: 1 */
  renderIndex?: number
  /** CSS background color (can be "transparent"), default: black */
  bgColor?: string
  /** CSS character color, default: white */
  fgColor?: string
  /** Characters, default: ' .:-+*=%@#' */
  characters?: string
  /** Invert character, default: true */
  invert?: boolean
  /** Colorize output (very expensive!), default: false */
  color?: boolean
  /** Level of detail, default: 0.15 */
  resolution?: number
	scale?: number
}

export function AsciiRenderer({
	enabled = true,
  renderIndex = 0,
  bgColor = 'black',
  fgColor = 'white',
  characters = ' .:-+*=%@#',
  invert = true,
  color = false,
  resolution = 0.15,
}: AsciiRendererProps) {
  // Reactive state
  const { size, gl, scene, camera } = useThree()
	const percentage = React.useRef(0);
  // Create effect
  const effect = React.useMemo(() => {
    const effect = new AsciiEffect(gl, characters, { invert, color, resolution })
    effect.domElement.style.position = 'absolute'
    effect.domElement.style.top = '0px'
    effect.domElement.style.left = '0px'
    effect.domElement.style.pointerEvents = 'none'
    return effect
  }, [characters, invert, color, resolution ])

  // Styling
  React.useLayoutEffect(() => {
    effect.domElement.style.color = fgColor
    effect.domElement.style.backgroundColor = bgColor

  }, [fgColor, bgColor])

  // Append on mount, remove on unmount
  React.useEffect(() => {
    gl.domElement.parentNode!.appendChild(effect.domElement)
    return () => {
      gl.domElement.parentNode!.removeChild(effect.domElement)
    }
  }, [effect, gl])

	React.useEffect(() => {
	  effect.domElement.style.opacity = enabled ? '1' : '0'
		if (!enabled)
			percentage.current = 0
	}, [enabled, gl, effect])

  // Set size
  React.useEffect(() => {
    effect.setSize(size.width, size.height)
  }, [effect, size])

  // Take over render-loop (that is what the index is for)
  useFrame((state, delta) => {
		if (!enabled) return
		percentage.current = Math.min(1, percentage.current + delta)
		effect.domElement.style.opacity = (1 - (Math.abs(.5 - percentage.current) / .5))
    effect.render(scene, camera)
  }, renderIndex)

  // return something to not break type signatures
  return <></>
}
