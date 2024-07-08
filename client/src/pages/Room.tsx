import { connectWs } from '../utils/connectWs'
import { useContext, useEffect, useState } from 'react'
import { UsernameContext } from '../providers'
import { Message } from '../types'
import { useParams } from 'react-router-dom'

const Room = () => {
	const { roomId } = useParams()
	const { username } = useContext(UsernameContext)
	const [ws, setWs] = useState<WebSocket | null>()
	const [messages, setMessages] = useState<Message[]>([])

	useEffect(() => {
		if (!ws) {
			const socket = connectWs(roomId!, username)
			setWs(socket)
		}

		if (!ws) {
			// TODO: Handle error here
			console.log('HIHIHIH')
			return
		}

		ws.onmessage = (event) => {
			setMessages([...messages, JSON.parse(event.data)])
		}

		return () => {
			ws.close()
		}
		// eslint-disable-next-line
	}, [ws])

	console.log(messages)

	return (
		<div>
			{roomId}
			{messages.map((msg, i) => {
				return (
					<div key={i} className={`${msg.type === 'join' && 'text-green-500'}`}>
						{msg.type !== 'join' && <span>{msg.username}: </span>}
						<span>
							{msg.username} {msg.content}
						</span>
					</div>
				)
			})}
		</div>
	)
}

export default Room
