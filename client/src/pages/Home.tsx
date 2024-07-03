import { Link } from 'react-router-dom'
import CreateRoomModal from '../components/Home/CreateRoomModal'
import { useState } from 'react'

const Home = () => {
	const [showModal, setShowModal] = useState<boolean>(false)
	return (
		<div className='text-center'>
			{showModal && <CreateRoomModal setShowModal={setShowModal} />}
			<h1 className='text-5xl'>Welcome!</h1>
			<div className='flex gap-16 justify-center text-3xl mt-52'>
				<button
					onClick={() => setShowModal(true)}
					className='w-72 h-24 p-2 border border-gray-600 rounded hover:shadow-2xl hover:shadow-white/15 hover:scale-[1.01] transition-all duration-200'
				>
					Create Room
				</button>
				<Link
					to={'/rooms'}
					className='flex justify-center items-center w-72 h-24 p-2 border border-gray-600 rounded hover:shadow-2xl hover:shadow-white/15 hover:scale-[1.01] transition-all duration-200'
				>
					Join Room
				</Link>
			</div>
		</div>
	)
}

export default Home
