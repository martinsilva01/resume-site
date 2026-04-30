import ThreeScene from '../components/MainPage/ThreeScene.tsx'
import ProjectsPage from '../components/MainPage/Projects/ProjectsPage.tsx'
import { CameraProvider, useCameraContext } from '../context/cameraContext.tsx'
import { ProjectProvider } from '../context/projectContext.tsx'
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
			<ProjectProvider>
			<CameraProvider>
				<div className="mainpage-overlay">
					<ThreeScene />
					<GetPageFromScene />
				</div>
			</CameraProvider>
			</ProjectProvider>
		</>
	)
}


export default MainPage
