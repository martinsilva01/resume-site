import { useProjectContext } from "../../../context/projectContext.tsx"
import { useAsciiContext } from "../../../context/asciiContext.tsx"
import { useCameraContext } from "../../../context/cameraContext.tsx"

import '../../../styles/ProjectsPage.css'


const Header = () => {
	const { setAscii } = useAsciiContext();
	const { projects, active, setActive } = useProjectContext();
	const { setCameraLocation } = useCameraContext();
	const handleClick = (i: number) => {
		if (active == i) return;
		setAscii(true);
		setActive(i);
		setTimeout(() => {
			setAscii(false);
		}, 1200);
	}

	return (
		<div className="project-header">
			<button className="project-button" type="button" onClick={()=> {setCameraLocation("Main")}}>{`<`}</button>
			<ul>
				{projects.map((project, i) => (
					<li className={`project-list ${active == i ? "active" : ""}`} onClick={() => handleClick(i)} key={i}>
						{project.name}
					</li>
				))}
			</ul>
		</div>
	);
};

const ProjectSummary = () => {
	return (
		<></>
	);
}

const ProjectVisual = () => {
	return (
		<></>
	);
}

const Project = () => {
	return (
		<div className="project-columns">
			<ProjectVisual />
			<ProjectSummary/>
		</div>
	);
}

export default function ProjectPage() {
	return (
		<div className="projectpage-overlay">
			<Header />
			<Project />
		</div>
	);
}
