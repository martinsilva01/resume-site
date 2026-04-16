import { useState, useContext, createContext } from 'react'

type AsciiContextType = {
	ascii: boolean;
	toggleAscii: () => void;
}

interface AsciiProviderProps {
	children: React.ReactNode
}

const AsciiContext = createContext<AsciiContextType | null>(null);

export function AsciiProvider  ({ children }: AsciiProviderProps) {
	const [ascii, setAscii] = useState(false);
	const toggleAscii = () => setAscii(prev => !prev);

	const contextValue: AsciiContextType = {
		ascii,
		toggleAscii
	}

	return (
		<AsciiContext.Provider value={contextValue}>
			{children}
		</AsciiContext.Provider>
	)
}

export function useAsciiContext() {
	const context = useContext(AsciiContext)
	if (!context) {
		throw new Error('useAscii must be used within AsciiProvider');
	}
	return context;
}
