import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UsernameContext } from '../../providers/UsernameProvider'
import Button from '../Shared/Button'

const CreateRoomModal = ({
	setShowCreateRoomModal,
}: {
	setShowCreateRoomModal: (val: boolean) => void
}) => {
	const navigate = useNavigate()
	const { username, setUsername } = useContext(UsernameContext)
	const [roomName, setRoomName] = useState<string>('')
	const [error, setError] = useState<string>('')

	const formHandler = async (e: React.FormEvent) => {
		e.preventDefault()

		if (username === '' || roomName === '') {
			setError('Please fill all fields')
			return
		}

		const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rooms?name=${roomName}`, {
			method: 'POST',
		})

		if (res.status !== 201) {
			setError('Something went wrong!')
			return
		}

		const data = await res.json()
		console.log(data)

		navigate(`/room/${data.roomId}`)
	}

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
			<div className="bg-gray-800/90 rounded-xl p-6 w-full max-w-md animate-fadeIn relative">
				<button
					onClick={() => setShowCreateRoomModal(false)}
					className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				<h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
					Create Room
				</h2>
				<form onSubmit={formHandler} className="space-y-4">
					<div>
						<label className="text-sm text-gray-300 mb-1 block">Your Name</label>
						<input
							autoFocus
							type="text"
							placeholder="Username"
							defaultValue={username}
							className="w-full px-4 py-2 bg-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div>
						<label className="text-sm text-gray-300 mb-1 block">Room Name</label>
						<input
							type="text"
							placeholder="Room name"
							className="w-full px-4 py-2 bg-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
							onChange={(e) => setRoomName(e.target.value)}
						/>
					</div>
					{error && <p className="text-red-400 text-sm">{error}</p>}
					<div className="flex">
						<Button type="submit" className="w-full">
							Create Room
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreateRoomModal
