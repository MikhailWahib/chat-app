export const connectWs = (roomId: string, userName: string) => {
	const socket = new WebSocket(
		`${import.meta.env.VITE_WS_BASE_URL}/ws/${roomId}?username=${userName}`
	)

	return socket
}
