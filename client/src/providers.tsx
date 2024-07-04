import { useState, createContext } from 'react'

const UsernameContext = createContext<{
	username: string
	setUsername: React.Dispatch<React.SetStateAction<string>>
}>({
	username: '',
	setUsername: () => {},
})

const UsernameProvider = ({ children }: { children: React.ReactNode }) => {
	const [username, setUsername] = useState('')
	return (
		<UsernameContext.Provider value={{ username, setUsername }}>
			{children}
		</UsernameContext.Provider>
	)
}

export { UsernameContext, UsernameProvider }
