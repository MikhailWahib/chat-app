export const connectWs = (roomId: string, userName: string) => {
	const socket = new WebSocket(
		`ws://localhost:8080/ws/${roomId}?username=${userName}`
	)

	return socket
}
