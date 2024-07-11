import { useState } from 'react'

interface Props {
	ws: WebSocket | undefined | null
	username: string
	roomId: string
}

const ChatInput = ({ ws, username, roomId }: Props) => {
	const [messageContent, setMessageContent] = useState<string>('')

	const handleSend = (e: React.FormEvent) => {
		e.preventDefault()

		if (messageContent === '') return

		const msgToSend = JSON.stringify({
			type: 'message',
			content: messageContent,
			username: username,
			roomId: roomId,
		})

		ws?.send(msgToSend)
		setMessageContent('')
	}

	return (
		<form onSubmit={handleSend} className='flex gap-2 h-10'>
			<input
				value={messageContent}
				onChange={(e) => setMessageContent(e.target.value)}
				type='text'
				placeholder='Type your message here'
				className='flex-1 px-2 py-1 text-sm rounded bg-black border border-gray-600'
			/>
			<button
				formAction='submit'
				className='bg-white text-black rounded px-2 py-1'
			>
				Send
			</button>
		</form>
	)
}

export default ChatInput
