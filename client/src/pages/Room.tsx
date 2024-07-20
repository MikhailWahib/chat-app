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
    let socket: WebSocket

    if (roomId && username) {
      socket = connectWs(roomId, username)
      setWS(socket)

      socket.onmessage = (event) => {
        const newMsg = JSON.parse(event.data)
        setMessages((prevMessages) => [...prevMessages, newMsg])
      }
    }

    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [roomId, username, setWS, setMessages])

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
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      <header>
        <h1>{room?.name}</h1>
        <h2>
          <span className="text-green-500">Online members:</span>{' '}
          {room?.members.join(',')}
        </h2>
      </header>
      <main
        className="pb-5 overflow-y-scroll"
        style={{ scrollbarWidth: 'none' }}
      >
        {messages.map((msg, i) => {
          return (
            <div key={i} className="overflow-hidden break-words">
              <Message msg={msg} />
            </div>
          )
        })}
        <div ref={messagesEndRef}></div>
      </main>
      <div className="mt-auto">
        <ChatInput ws={ws} roomId={roomId} username={username} />
      </div>
    </div>
  )
}

export default Room
