import { connectWs } from '../utils/connectWs'
import { useContext, useEffect, useRef, useState } from 'react'
import { UsernameContext } from '../providers/UsernameProvider'
import { useWS } from '../providers/WSProvider'
import { IMessage, IRoom } from '../types'
import { useParams } from 'react-router-dom'
import Message from '../components/Room/Message'
import ChatInput from '../components/Room/ChatInput'

const Room = () => {
  const { roomId } = useParams()
  const [room, setRoom] = useState<IRoom>()
  const { ws, setWS } = useWS()
  const { username } = useContext(UsernameContext)
  const [messages, setMessages] = useState<IMessage[]>([])
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const getRoomInfo = async (roomId: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/room/${roomId}`
    )
    const data = await res.json()

    if (res.status !== 200) {
      console.error(data.error)
      return
    }

    setRoom(data)
  }

  // Establish WS connection
  useEffect(() => {
    if (!roomId || !username) return

    const socket = connectWs(roomId, username)
    setWS(socket)

    socket.onmessage = (event) => {
      const newMsg = JSON.parse(event.data)
      setMessages((prevMessages) => [...prevMessages, newMsg])
    }

    return () => {
      socket.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, username])

  // Update Room members on each join/leave
  useEffect(() => {
    const lastMsg = messages[messages.length - 1]

    if (roomId && (lastMsg?.type === 'join' || lastMsg?.type === 'leave'))
      getRoomInfo(roomId)
  }, [messages, roomId])

  // Scroll to the last message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!roomId) return <div>Error: Room ID not found!</div>
  if (!room) return <div>Error: Room not found</div>

  return (
    <div className='flex flex-col h-[calc(100vh-5rem)] max-w-6xl mx-auto px-4'>
      <header className='mb-6 p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm'>
        <h1 className='font-bold text-3xl bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent'>
          {room?.name}
        </h1>
        <h2 className='mt-2'>
          <span className='text-emerald-400 font-semibold'>Online members</span>
          <div className='mt-1 flex flex-wrap gap-2'>
            {room?.members.map((member) => (
              <span className='px-3 py-1 bg-gray-700/50 rounded-full text-sm'>
                {member}
              </span>
            ))}
          </div>
        </h2>
      </header>
      <main
        className='pb-5 overflow-y-scroll text-lg px-2'
        style={{ scrollbarWidth: 'none' }}
      >
        {messages.map((msg, i) => {
          return (
            <div
              key={i}
              className='overflow-hidden break-words animate-messageIn'
            >
              <Message msg={msg} />
            </div>
          )
        })}
        <div ref={messagesEndRef}></div>
      </main>
      <div className='mt-auto p-4 bg-gray-800/30 rounded-t-lg backdrop-blur-sm'>
        <ChatInput ws={ws} roomId={roomId} username={username} />
      </div>
    </div>
  )
}

export default Room
