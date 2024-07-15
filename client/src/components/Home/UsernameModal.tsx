import { useContext, useEffect, useRef, useState } from 'react'
import { UsernameContext } from '../../providers/UsernameProvider'
import { useNavigate } from 'react-router-dom'

const UsernameModal = ({
	setShowUsernameModal,
}: {
	setShowUsernameModal: (val: boolean) => void
}) => {
	const navigate = useNavigate()

	const { username, setUsername } = useContext(UsernameContext)
	const [usernameInput, setUsernameInput] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)
	const [error, setError] = useState('')

	useEffect(() => {
		if (username !== '' && inputRef.current) {
			inputRef.current.value = username
			setUsernameInput(username)
		}
		// eslint-disable-next-line
	}, [])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (usernameInput === '' && username === '') {
			setError('Please enter a username')
			return
		}

		setUsername(usernameInput)
		navigate('/rooms')
	}

	return (
		<div className='flex absolute top-0 left-0 h-screen w-full z-50 bg-black/50'>
			<div className='relative flex justify-center items-center w-full max-w-[75%] md:max-w-[30%] py-10 rounded border border-gray-600 bg-black m-auto'>
				<button
					className='absolute top-4 right-5'
					onClick={() => setShowUsernameModal(false)}
				>
					X
				</button>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col w-full px-5 text-start gap-1 text-xl'
				>
					<label>Enter your name: </label>
					<input
						autoFocus
						ref={inputRef}
						type='text'
						onChange={(e) => setUsernameInput(e.target.value)}
						value={usernameInput}
						className='my-5 px-2 py-1 text-sm rounded bg-black border border-gray-600'
					/>
					{error && <div className='text-red-700 text-sm'>{error}</div>}
					<button
						formAction='submit'
						className='p-2 bg-black border border-gray-600 rounded hover:shadow-2xl hover:shadow-white/15 hover:scale-[1.01] transition-all duration-200'
					>
						Continue
					</button>
				</form>
			</div>
		</div>
	)
}

export default UsernameModal
