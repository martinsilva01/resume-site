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

export default function ResumePage() {
	return (
		<div className="resumepage-overlay">
			<Header />
		</div>
	);
}
