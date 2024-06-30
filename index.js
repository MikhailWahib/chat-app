async function validateRoom(roomId, roomPassword) {
	const response = await fetch(
		`http://localhost:8080/ws?roomId=${roomId}&roomPassword=${roomPassword}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error)
	}
}

async function main() {
	validateRoom()
}

main()
