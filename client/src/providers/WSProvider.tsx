import React, { createContext, useContext, useEffect, useState } from 'react'

interface WSType {
	ws: WebSocket | null
	setWS: (ws: WebSocket | null) => void
}

const WSContext = createContext<WSType | undefined>(undefined)

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [ws, setWS] = useState<WebSocket | null>(null)

	useEffect(() => {
		// Cleanup WebSocket connection when the component unmounts
		return () => {
			if (ws) {
				ws.close()
			}
		}
	}, [ws])

	return (
		<WSContext.Provider value={{ ws, setWS }}>{children}</WSContext.Provider>
	)
}

export const useWS = () => {
	const context = useContext(WSContext)
	if (!context) {
		throw new Error('useWebSocket must be used within a WebSocketProvider')
	}
	return context
}
