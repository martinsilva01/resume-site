import { 
	ShaderMaterial,
 	Vector2,
 	NoBlending, 
  CanvasTexture,
  Color,
  NearestFilter,
  RepeatWrapping,
  Texture,
} from "three";

interface IASCIIEffectProps {
  characters?: string; // The ASCII characters to use in brightness order dark -> light
  fontSize?: number; // Font Size of the characters drawn to the texture
  cellSize?: number; // Size of each cell in the grid
  color?: string; // Color of the characters
  invert?: boolean; // Flag which inverts the effect
}

const asciiFragmentShader= `
uniform sampler2D uTexture;
uniform sampler2D uCharacters;
uniform float uCharactersCount;
uniform float uCellSize;
uniform bool uInvert;
uniform vec3 uColor;
uniform vec2 winResolution;

varying vec2 vUv;

const vec2 SIZE = vec2(32.);

vec3 greyscale(vec3 color, float strength) {
    float g = dot(color, vec3(0.299, 0.587, 0.114));
    return mix(color, vec3(g), strength);
}

vec3 greyscale(vec3 color) {
    return greyscale(color, 1.0);
}

void main() {

		vec4 inputColor = vec4(uColor, 1.0);
		vec2 uv = vUv;


		vec2 cellCount = vec2(
		    floor(winResolution.x / uCellSize),
		    floor(winResolution.y / uCellSize)
		);
		
		vec2 grid = 1.0 / cellCount;
		vec2 pixelizedUV = grid * (0.5 + floor(uv / grid));
    vec4 pixelized = texture2D(uTexture, pixelizedUV);
    float greyscaled = clamp(greyscale(pixelized.rgb).r, 0.0 ,1.0);

    if (uInvert) {
        greyscaled = 1.0 - greyscaled;
    }

    float characterIndex = floor((uCharactersCount - 1.0) * greyscaled);
    vec2 characterPosition = vec2(mod(characterIndex, SIZE.x), floor(characterIndex / SIZE.y));
    vec2 offset = vec2(characterPosition.x, -characterPosition.y) / SIZE;
    vec2 charUV = mod(uv * (cellCount / SIZE), 1.0 / SIZE) - vec2(0., 1.0 / SIZE) + offset;
    vec4 asciiCharacter = texture2D(uCharacters, charUV);

    asciiCharacter.rgb = uColor * asciiCharacter.r;
    asciiCharacter.a = 1.0;
    gl_FragColor = asciiCharacter;
}
`;

const asciiVertexShader = `
varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`

class AsciiMaterial extends ShaderMaterial {
  constructor({
    characters = ` .:,'-^=*+?!|0#X%WM@`,
    fontSize = 34, 
    cellSize = 150,
    color = "#ff00ff",
    invert = false,
  }: IASCIIEffectProps = {}) {
			const uniforms = {
        uTexture: {
          value: null
        },
				uCharacters: {
					value: new Texture()
				},
        uCellSize: {
          value: cellSize
        },
        uCharactersCount: {
          value: characters.length
        },
        uColor: {
          value: new Color(color)
        },
        uInvert: {
          value: invert
        },
        winResolution: {
          value: new Vector2(4096, 4096)
        }
			}

			super( { uniforms: uniforms,
      vertexShader: asciiVertexShader,
      fragmentShader: asciiFragmentShader,
      blending: NoBlending,
      depthWrite: false,
      depthTest: false
    } )

    const charactersTextureUniform = this.uniforms.uCharacters;

    if (charactersTextureUniform) {
      charactersTextureUniform.value = this.createCharactersTexture(
        characters,
        fontSize
      );
		}
  }

  public createCharactersTexture(
    characters: string,
    fontSize: number
  ): Texture {
    const canvas = document.createElement("canvas");

    const SIZE = 1024;
    const MAX_PER_ROW = 32;
    const CELL = SIZE / MAX_PER_ROW;

    canvas.width = canvas.height = SIZE;

    const texture = new CanvasTexture(
      canvas,
      undefined,
      RepeatWrapping,
      RepeatWrapping,
      NearestFilter,
      NearestFilter
    );

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Context not available");
    }

    context.clearRect(0, 0, SIZE, SIZE);
		context.font = `${fontSize}px "monospace"`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#fff";

    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      const x = i % MAX_PER_ROW;
      const y = Math.floor(i / MAX_PER_ROW);

      context.fillText(char, x * CELL + CELL / 2, y * CELL + CELL / 2);
    }

    texture.needsUpdate = true;

    return texture;
  }
}

export default AsciiMaterial
