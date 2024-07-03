import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateRoomModal = ({
	setShowModal,
}: {
	setShowModal: (val: boolean) => void
}) => {
	const navigate = useNavigate()

	const [name, setName] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string>('')

	const formHandler = async (e: React.FormEvent) => {
		e.preventDefault()

		if (name === '' || password === '') {
			setError('Please enter valid name and password')
			return
		}

		const res = await fetch(
			`http://localhost:8080/rooms?name=${name}&password=${password}`,
			{
				method: 'POST',
			}
		)

		if (res.status !== 201) {
			setError('Something went wrong!')
			return
		}

		const data = await res.json()

		console.log(data)

		navigate(`/${data.roomId}`)
	}

	return (
		<div className='flex absolute top-0 left-0 h-screen w-full z-50 bg-black/50'>
			<div className='relative flex justify-center items-center h-[50%] rounded border border-gray-600 bg-black m-auto'>
				<button
					className='absolute top-4 right-5'
					onClick={() => setShowModal(false)}
				>
					X
				</button>
				<form
					onSubmit={formHandler}
					className='flex flex-col px-10 text-start gap-1 text-xl'
				>
					<label>Room name: </label>
					<input
						type='text'
						className='mb-5 rounded bg-black border border-gray-600'
						onChange={(e) => setName(e.target.value)}
					/>
					<label>Room Password</label>
					<input
						type='text'
						className='rounded bg-black border border-gray-600'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className='text-red-700 text-sm'>{error}</div>
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
