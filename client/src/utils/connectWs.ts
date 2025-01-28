export const connectWs = (roomId: string, userName: string) => {
	const socket = new WebSocket(
		`${import.meta.env.VITE_WS_BASE_URL}/${roomId}?username=${userName}`
	)

	return socket
}
