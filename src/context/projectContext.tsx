import { useState, useContext, createContext } from 'react'

type ProjectContextType = {
	projects: ProjectType[]	
	active: number
	setActive: (index: number) => void
}

export type ProjectType = {
	name: string
	img: string
	summary: string[]
}

interface ProjectProviderProps {
	children: React.ReactNode
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider ({ children }: ProjectProviderProps) {
		
	const [active, setActive] = useState<number>(0)
	const projects: ProjectType[] =	[
		{
			name: "YumNom AI",
			img: "./yumnom.png",
			summary: [
				"",
				" • Collaborated on a year-long project in order to develop a completed",
			 	"	website, utilizing APIs,Google Firebase, Firestore and Authentication",
				"functionality, and an AI agent for customer support and food ",
				"recommendation activities.",
				"",
			 	" • Led and developed the entire backend, supporting real-time user",
			 	"	activities, database logic, and secure API routing.",
				"",
 				" • Implemented secure authentication flows with token-based session ",
				"handling and role-based access controls."
			]
		}, 
		{
			name: "ArcGIS StoryMap",
			img: "./storymap.png",	
			summary: [
				"",
				" • Created interactive ArcGIS StoryMaps to visualize and communicate",
				"geographical data with dynamic, web-based mapping.",
				"",
				"• Integrated third-party APIs into existing GIS platforms, expanding",
				"functionality and improving user experience.",
				"",
				"• Designed and implemented spatial databases to store geospatial data",
				"for efficient retrieval and analysis.",
				"",
				"• Collaborated in a 12-week internship program, presenting technical",
				"deliverables to industry mentors."
			]
		}
	];

	const contextValue: ProjectContextType = {
		projects,
		active,
		setActive
	}
		
	return (
		<ProjectContext.Provider value={contextValue}>
			{children}
		</ProjectContext.Provider>
	)
};

export function useProjectContext() {
	const context = useContext(ProjectContext)
	if (!context) {
		throw new Error('useProject must be used within ProjectProvider');
	}
	return context;
}

