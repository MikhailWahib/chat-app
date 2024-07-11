import { IMessage } from '../../types'

const Message = ({ msg }: { msg: IMessage }) => {
	switch (msg.type) {
		case 'join':
			return (
				<span className='text-green-500'>
					{msg.username} {msg.content}
				</span>
			)
		case 'leave':
			return (
				<span className='text-red-500'>
					{msg.username}: {msg.content}
				</span>
			)
		default:
			return (
				<span>
					{msg.username}: {msg.content}
				</span>
			)
	}
}

export default Message
