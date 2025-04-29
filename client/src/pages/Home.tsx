import CreateRoomModal from '../components/Home/CreateRoomModal'
import { useState } from 'react'
import UsernameModal from '../components/Home/UsernameModal'

const Home = () => {
	const [showCreateRoomModal, setShowCreateRoomModal] = useState<boolean>(false)
	const [showUsernameModal, setShowUsernameModal] = useState<boolean>(false)

	return (
		<div className='min-h-screen flex flex-col items-center justify-center px-4'>
			{showCreateRoomModal && (
				<CreateRoomModal setShowCreateRoomModal={setShowCreateRoomModal} />
			)}
			{showUsernameModal && (
				<UsernameModal setShowUsernameModal={setShowUsernameModal} />
			)}
			<div className='text-center space-y-8 animate-fadeIn'>
				<h1 className='text-5xl md:text-7xl font-bold bg-gradient-to-r from-sky-400 via-purple-500 to-pink-600 bg-clip-text text-transparent'>
					Welcome to ChatApp
				</h1>
				<p className='text-gray-400 text-xl max-w-2xl mx-auto'>
					Join the conversation in real-time chat rooms or create your own space
				</p>
				<div className='flex flex-col md:flex-row gap-6 justify-center mt-12'>
					<button
						onClick={() => setShowCreateRoomModal(true)}
						className='group relative px-8 py-4 text-xl font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90 transition-all duration-300 transform hover:scale-105'
					>
						Create Room
						<div className='absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
					</button>
					<button
						onClick={() => setShowUsernameModal(true)}
						className='group relative px-8 py-4 text-xl font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:opacity-90 transition-all duration-300 transform hover:scale-105'
					>
						Join Room
						<div className='absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Home
