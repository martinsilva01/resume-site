import { useCameraContext } from "../../../context/cameraContext.tsx"
import '../../../styles/ResumePage.css'

const Header = () => {
	const { setCameraLocation } = useCameraContext();

	return (
		<div className="resume-header">
			<button className="resume-button" type="button" onClick={()=> {setCameraLocation("Main")}}>{`<`}</button>
		</div>
	);
};

const Body = () => {
	return (
		<div className="resume-body">
			<h2> Martin	Silva </h2>
			<p> An aspiring developer looking to step into the industry. Eager to learn from and work with the best. 
				As a person who is constantly working with new tools and frameworks, I strive at being a fast, 
				adaptive learner in an environment that requires it now more than ever.</p>

			<p> My journey through California State University, Long Beach, has built me for success. 
					Excelling in courses such as Artificial Intelligence, Machine Learning, and Operating Systems, I am able
					to apply my learning and rigorous study to projects which showcase my strengths. Additionally, I had the 
					opportunity to learn through an internship with the California Consortium for Public Health Informatics & Technology. 
			</p>
			<a href="./MartinSilva_Jan2026.pdf" download>Download Resume PDF.</a>
		</div>	
	)
}

export default function ResumePage() {
	return (
		<div className="resumepage-overlay">
			<Header />
			<Body />
		</div>
	);
}
