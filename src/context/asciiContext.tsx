import { useState, useRef, useContext, createContext } from 'react'

type AsciiContextType = {
	ascii: boolean;
	setAscii: (ascii: boolean) => void;
}

interface AsciiProviderProps {
	children: React.ReactNode
}

const AsciiContext = createContext<AsciiContextType | null>(null);

export function AsciiProvider  ({ children }: AsciiProviderProps) {
	const [ascii, setAscii] = useState(false);

	const contextValue: AsciiContextType = {
		ascii,
		setAscii
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
