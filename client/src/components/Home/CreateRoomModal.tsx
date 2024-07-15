import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UsernameContext } from '../../providers/UsernameProvider'

const CreateRoomModal = ({
	setShowCreateRoomModal,
}: {
	setShowCreateRoomModal: (val: boolean) => void
}) => {
	const navigate = useNavigate()
	const { username, setUsername } = useContext(UsernameContext)

	const usernameInputRef = useRef<HTMLInputElement>(null)

	const [roomName, setRoomName] = useState<string>('')
	const [error, setError] = useState<string>('')

	const formHandler = async (e: React.FormEvent) => {
		e.preventDefault()

		if (username === '' || roomName === '') {
			setError('Please fill all fields')
			return
		}

		const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rooms?name=${roomName}`, {
			method: 'POST',
		})

		if (res.status !== 201) {
			setError('Something went wrong!')
			return
		}

		const data = await res.json()
		console.log(data)

		navigate(`/room/${data.roomId}`)
	}

	useEffect(() => {
		if (username.length > 0 && usernameInputRef.current) {
			usernameInputRef.current.value = username
		}
		// eslint-disable-next-line
	}, [])

	return (
		<div className='flex absolute top-0 left-0 h-screen w-full z-50 bg-black/50'>
			<div className='relative flex justify-center items-center w-full max-w-[75%] md:max-w-[30%] py-10 rounded border border-gray-600 bg-black m-auto'>
				<button
					className='absolute top-4 right-5'
					onClick={() => setShowCreateRoomModal(false)}
				>
					X
				</button>
				<form
					onSubmit={formHandler}
					className='flex flex-col w-full px-5 text-start gap-1 text-xl'
				>
					<label>Your Name</label>
					<input
						autoFocus
						ref={usernameInputRef}
						type='text'
						className='mb-5 px-2 py-1 text-sm rounded bg-black border border-gray-600'
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label>Room Name: </label>
					<input
						type='text'
						className='mb-5 px-2 py-1 text-sm rounded bg-black border border-gray-600'
						onChange={(e) => setRoomName(e.target.value)}
					/>
					{error && <div className='text-red-700 text-sm'>{error}</div>}
					<button
						formAction='submit'
						className='mt-5 p-2 bg-black border border-gray-600 rounded hover:shadow-2xl hover:shadow-white/15 hover:scale-[1.01] transition-all duration-200'
					>
						Create
					</button>
				</form>
			</div>
		</div>
	)
}

export default CreateRoomModal
