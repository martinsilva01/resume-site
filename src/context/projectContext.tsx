import { useState, useContext, createContext } from 'react'

type ProjectContextType = {
	projects: ProjectType[]	
	active: number
	setActive: (index: number) => void
}

type ProjectType = {
	name: string
	img: string
	summary: string
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
			summary: "yumnom"
		}, 
		{
			name: "ArcGIS StoryMap",
			img: "./storymap.png",	
			summary: "arcgis"
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

