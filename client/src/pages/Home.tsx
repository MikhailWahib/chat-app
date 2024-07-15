import CreateRoomModal from '../components/Home/CreateRoomModal'
import { useState } from 'react'
import UsernameModal from '../components/Home/UsernameModal'

const Home = () => {
	const [showCreateRoomModal, setShowCreateRoomModal] = useState<boolean>(false)
	const [showUsernameModal, setShowUsernameModal] = useState<boolean>(false)

	return (
		<div className='text-center'>
			{showCreateRoomModal && (
				<CreateRoomModal setShowCreateRoomModal={setShowCreateRoomModal} />
			)}
			{showUsernameModal && (
				<UsernameModal setShowUsernameModal={setShowUsernameModal} />
			)}
			<h1 className='text-4xl md:text-5xl'>Welcome!</h1>
			<div className='flex flex-col md:flex-row gap-16 justify-center text-3xl mt-52'>
				<button
					onClick={() => setShowCreateRoomModal(true)}
					className='w-72 h-24 p-2 border border-gray-600 rounded hover:shadow-2xl hover:shadow-white/15 hover:scale-[1.01] transition-all duration-200'
				>
					Create Room
				</button>
				<button
					onClick={() => setShowUsernameModal(true)}
					className='flex justify-center items-center w-72 h-24 p-2 border border-gray-600 rounded hover:shadow-2xl hover:shadow-white/15 hover:scale-[1.01] transition-all duration-200'
				>
					Join Room
				</button>
			</div>
		</div>
	)
}

export default Home
