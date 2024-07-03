import { useEffect, useState } from 'react'
import { Room } from './types'
import RoomCard from './components/RoomCard'

function App() {
	const [rooms, setRooms] = useState<Room[]>([
		{ name: 'HIHVDK', id: 'ascjbkjas', members: ['ascnklsc', 'dkjbvkdsj'] },
		{ name: 'LJKBKDJ', id: 'skjdbv', members: ['ascnklsc', 'dkjbvkdsj'] },
		{ name: 'KJBCKJ', id: '.m.lklkll', members: ['ascnklsc', 'dkjbvkdsj'] },
	])

	const getRooms = async () => {
		const res = await fetch('http://localhost:8080/rooms')
		const data = await res.json()

		console.log(data)

		setRooms(data)
	}

	useEffect(() => {
		getRooms()
	}, [])

	return (
		<main className='min-h-screen bg-black text-white p-10'>
			<h2 className='text-2xl mb-5'>Online Rooms: </h2>
			<div className='flex gap-5'>
				{rooms?.map((room) => {
					return <RoomCard room={room} />
				})}
			</div>
		</main>
	)
}

export default App
