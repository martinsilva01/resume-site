import ThreeScene from '../components/MainPage/ThreeScene.tsx'
import ProjectsPage from '../components/MainPage/Projects/ProjectsPage.tsx'
import { CameraProvider, useCameraContext } from '../context/cameraContext.tsx'
import { ProjectProvider } from '../context/projectContext.tsx'
import { AsciiProvider } from '../context/asciiContext.tsx'
import '../styles/MainPage.css'

function GetPageFromScene() {
	const { scene } = useCameraContext();
	if (scene == "Projects") {
		return (<ProjectsPage />)
	}
	return null
		
}

function MainPage() {
	return (
		<>
		
			<AsciiProvider>
			<ProjectProvider>
			<CameraProvider>
				<div className="mainpage-overlay">
					<ThreeScene />
					<GetPageFromScene />
				</div>
			</CameraProvider>
			</ProjectProvider>
			</AsciiProvider>
		</>
	)
}


export default MainPage
