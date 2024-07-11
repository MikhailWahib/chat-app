import { useState, useEffect } from 'react'
import RoomCard from '../components/Rooms/RoomCard'
import { Room } from '../types'

const Rooms = () => {
	const [rooms, setRooms] = useState<Room[]>([])

	const getRooms = async () => {
		const res = await fetch('http://localhost:8080/rooms')
		const data = await res.json()

		setRooms(data)
	}

	useEffect(() => {
		getRooms()
	}, [])

	return (
		<>
			<h2 className='text-2xl mb-5'>Online Rooms: </h2>
			<div className='flex gap-5'>
				{rooms?.map((room, i) => {
					return <RoomCard key={i} room={room} />
				})}
			</div>
		</>
	)
}

export default Rooms
