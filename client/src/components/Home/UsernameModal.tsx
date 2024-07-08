import { useContext, useEffect, useRef, useState } from 'react'
import { UsernameContext } from '../../providers'
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
		}
		// eslint-disable-next-line
	}, [])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (usernameInput === '') {
			setError('Please enter a username')
			return
		}

		setUsername(usernameInput)
		navigate('/rooms')
	}

	return (
		<>
			<button
				className='absolute top-4 right-5'
				onClick={() => setShowUsernameModal(false)}
			>
				X
			</button>
			<form onSubmit={handleSubmit}>
				<label>Enter your name: </label>
				<input
					autoFocus
					ref={inputRef}
					type='text'
					onChange={(e) => setUsernameInput(e.target.value)}
				/>
				{error && <div className='text-red-700 text-sm'>{error}</div>}
				<button formAction='submit'>Continue</button>
			</form>
		</>
	)
}

export default UsernameModal
