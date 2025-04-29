import { useState, KeyboardEvent } from 'react'
import Button from '../Shared/Button'

interface Props {
	ws: WebSocket | null
	username: string
	roomId: string
}

const ChatInput = ({ ws, username, roomId }: Props) => {
	const [message, setMessage] = useState('')

	const sendMessage = () => {
		if (!ws || message.trim() === '') return

		ws.send(JSON.stringify({
			type: 'message',
			content: message,
			username,
			roomId,
			timestamp: new Date().toISOString(),
		}))

		setMessage('')
	}

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			sendMessage()
		}
	}

	return (
		<div className="flex gap-3">
			<textarea
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyDown={handleKeyPress}
				placeholder="Type a message..."
				className="flex-1 bg-gray-700/50 rounded-lg p-3 min-h-[45px] max-h-32 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
			/>
			<Button
				onClick={sendMessage}
				size="sm"
				className="self-end"
			>
				Send
			</Button>
		</div>
	)
}

export default ChatInput
