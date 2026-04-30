import { useProjectContext } from "../../../context/projectContext.tsx"
import '../../../styles/ProjectsPage.css'


const Header = () => {
const { projects, active, setActive } = useProjectContext();
	return (
		<div className="project-header">
			<ul>
				{projects.map((project, i) => (
					<li className={`project-list ${active == i ? "active" : ""}`} onClick={() => setActive(i)} key={i}>
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
