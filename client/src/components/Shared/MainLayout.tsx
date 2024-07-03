const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='min-h-screen bg-black text-white p-10'>{children}</main>
	)
}

export default MainLayout
