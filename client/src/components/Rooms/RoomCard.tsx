import { Link } from 'react-router-dom'
import { Room } from '../../types'

const RoomCard = ({ room }: { room: Room }) => {
  return (
    <Link to={`/room/${room.id}`}>
      <div className="relative w-52 h-full p-2 border border-gray-600 rounded hover:shadow-2xl hover:shadow-white/15 hover:scale-[1.01] transition-all duration-200">
        <span className="absolute top-3 right-2 w-2 h-2 bg-green-500 rounded-full"></span>
        <div>Name: {room.name}</div>
        <div>Members: {room.members.length}</div>
      </div>
    </Link>
  )
}

export default RoomCard
