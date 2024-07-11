import { connectWs } from '../utils/connectWs'
import { useContext, useEffect, useRef, useState } from 'react'
import { UsernameContext } from '../providers'
import { IMessage } from '../types'
import { useParams } from 'react-router-dom'
import Message from '../components/Room/Message'
import ChatInput from '../components/Room/ChatInput'

const Room = () => {
	const { roomId } = useParams()
	const { username } = useContext(UsernameContext)
	const [ws, setWs] = useState<WebSocket | null>()
	const [messages, setMessages] = useState<IMessage[]>([])
	const messagesEndRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!ws) {
			const socket = connectWs(roomId!, username)
			setWs(socket)
		}

		if (!ws) return
		ws.onmessage = (event) => {
			const newMsg = JSON.parse(event.data)
			setMessages((prevMessages) => [...prevMessages, newMsg])
		}

		return () => {
			ws.close()
		}
		// eslint-disable-next-line
	}, [ws])

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	if (!roomId) return <div>Error: roomId not found!</div>

	return (
		<div className='flex flex-col h-[calc(100vh-5rem)]'>
			<header>
				<h1>{roomId}</h1>
			</header>
			<main
				className='pb-5 overflow-y-scroll'
				style={{ scrollbarWidth: 'none' }}
			>
				{messages.map((msg, i) => {
					return (
						<div key={i}>
							<Message msg={msg} />
						</div>
					)
				})}
				<div ref={messagesEndRef}></div>
			</main>
			<div className='mt-auto'>
				<ChatInput ws={ws} roomId={roomId} username={username} />
			</div>
		</div>
	)
}

export default Room