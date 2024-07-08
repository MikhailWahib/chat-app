export interface Room {
	id: string
	name: string
	members: string[]
}

export interface Message {
	type: string
	username: string
	content: string
	roomId: string
}
