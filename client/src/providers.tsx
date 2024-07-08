import { useState, createContext, useEffect } from 'react'

const UsernameContext = createContext<{
	username: string
	setUsername: React.Dispatch<React.SetStateAction<string>>
}>({
	username: '',
	setUsername: () => {},
})

const UsernameProvider = ({ children }: { children: React.ReactNode }) => {
	const [username, setUsername] = useState(
		localStorage.getItem('username') || ''
	)

	useEffect(() => {
		const storedUsername = localStorage.getItem('username')
		if (storedUsername) setUsername(storedUsername)
	}, [])

	useEffect(() => {
		localStorage.setItem('username', username)
	}, [username])

	return (
		<UsernameContext.Provider value={{ username, setUsername }}>
			{children}
		</UsernameContext.Provider>
	)
}

export { UsernameContext, UsernameProvider }
