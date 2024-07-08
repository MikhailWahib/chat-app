export const authRoom = async (roomId: string, roomPassword: string) => {
	const res = await fetch(
		`http://localhost:8080/ws?id=${roomId}&password=${roomPassword}`
	)

	if (res.status === 403 || res.status === 500) return false

	return true
}

export const connectWs = (roomId: string, userName: string) => {
	const socket = new WebSocket(
		`ws://localhost:8080/ws/${roomId}?username=${userName}`
	)

	return socket
}
