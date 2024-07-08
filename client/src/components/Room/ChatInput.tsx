import { useState } from 'react'
const ChatInput = ({ ws }: { ws: WebSocket }) => {
	const [message, setMessage] = useState<string>('')

	const handleSend = (e: React.FormEvent) => {
		e.preventDefault()

		if (message === '') return
	}

	return (
		<form onSubmit={handleSend}>
			<input
				onChange={(e) => setMessage(e.target.value)}
				type='text'
				placeholder='Type your message here'
			/>
			<button formAction='submit'>Send</button>
		</form>
	)
}

export default ChatInput
