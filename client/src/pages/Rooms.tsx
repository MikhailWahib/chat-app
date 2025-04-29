import { useState, useEffect } from 'react'
import RoomCard from '../components/Rooms/RoomCard'
import { IRoom } from '../types'

const Rooms = () => {
  const [rooms, setRooms] = useState<IRoom[]>([])

  const getRooms = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rooms`)
    const data = await res.json()

    setRooms(data)
  }

  useEffect(() => {
    getRooms()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        Online Rooms
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
        {rooms?.map((room, i) => {
          return (
            <div className="transform transition-all duration-300 hover:scale-105">
              <RoomCard key={i} room={room} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Rooms
