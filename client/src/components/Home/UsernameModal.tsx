import { useContext, useState } from 'react'
import { UsernameContext } from '../../providers/UsernameProvider'
import { useNavigate } from 'react-router-dom'
import Button from '../Shared/Button'

const UsernameModal = ({
	setShowUsernameModal,
}: {
	setShowUsernameModal: (val: boolean) => void
}) => {
	const navigate = useNavigate()
	const { username, setUsername } = useContext(UsernameContext)
	const [error, setError] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!username) {
			setError('Please enter a username')
			return
		}

		navigate('/rooms')
	}

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
			<div className="bg-gray-800/90 rounded-xl p-6 w-full max-w-md animate-fadeIn relative">
				<button
					onClick={() => setShowUsernameModal(false)}
					className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				<h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
					Enter Username
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="text"
						placeholder="Username"
						defaultValue={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full px-4 py-2 bg-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
						autoFocus
					/>
					{error && <p className="text-red-400 text-sm">{error}</p>}
					<div className="flex">
						<Button type="submit" className="w-full">
							Continue
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default UsernameModal
