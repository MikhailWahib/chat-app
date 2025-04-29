import { IMessage } from '../../types'
import { getUserColor } from '../../utils/colors'

const Message = ({ msg }: { msg: IMessage }) => {
	if (msg.type === 'join' || msg.type === 'leave') {
		return (
			<div className="text-center py-2">
				<span className="text-sm px-3 py-1 rounded-full bg-gray-700/50">
					{msg.username} has {msg.type === 'join' ? 'joined' : 'left'} the room
				</span>
			</div>
		)
	}

	const [bgColor, textColor] = getUserColor(msg.username);

	return (
		<div className="mb-4 group transition-opacity hover:opacity-100">
			<div className="flex items-start gap-2">
				<div className={`w-8 h-8 rounded-full bg-gradient-to-br ${bgColor} flex items-center justify-center`}>
					<span className={`text-sm font-bold ${textColor}`}>
						{msg.username[0].toUpperCase()}
					</span>
				</div>
				<div>
					<div className="flex items-baseline gap-2">
						<span className={`font-semibold bg-gradient-to-r ${bgColor} bg-clip-text text-transparent`}>
							{msg.username}
						</span>
					</div>
					<p className="text-gray-200 mt-1">{msg.content}</p>
				</div>
			</div>
		</div>
	)
}

export default Message
