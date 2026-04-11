import ThreeScene from '../components/MainPage/ThreeScene.tsx'
import '../styles/MainPage.css'

function MainPage() {
	return (
		<>
			<div className="mainpage-overlay">
			<ThreeScene />
			{/*<div className="mainpage-body">
			<ul>
						<li> Resume </li>
						<li> Projects </li>
						<li> Github Repo </li>
					</ul>
				</div>*/}
			</div>
		</>
	)
}


export default MainPage
