export interface IRoom {
	id: string
	name: string
	members: string[]
}

export interface IMessage {
	type: string
	username: string
	content: string
	roomId: string
}
