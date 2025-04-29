import { Link } from 'react-router-dom'
import { IRoom } from '../../types'

const RoomCard = ({ room }: { room: IRoom }) => {
  return (
    <Link to={`/room/${room.id}`}>
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-700/50 transition-all duration-300">
        <h3 className="text-xl font-bold mb-3">{room.name}</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-400">
              {room.members.length} online
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {room.members.slice(0, 3).map((member, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-gray-700/50 rounded-full">
                {member}
              </span>
            ))}
            {room.members.length > 3 && (
              <span className="text-xs px-2 py-1 bg-gray-700/50 rounded-full">
                +{room.members.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RoomCard
