import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import MainLayout from './components/Shared/MainLayout.tsx'
import Home from './pages/Home.tsx'
import Rooms from './pages/Rooms.tsx'
import Room from './pages/Room.tsx'
import { UsernameProvider } from './providers/UsernameProvider.tsx'
import { WebSocketProvider } from './providers/WSProvider.tsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout children={<Home />} />,
	},
	{
		path: '/rooms',
		element: <MainLayout children={<Rooms />} />,
	},
	{
		path: '/room/:roomId',
		element: <MainLayout children={<Room />} />,
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<WebSocketProvider>
			<UsernameProvider>
				<RouterProvider router={router} />
			</UsernameProvider>
		</WebSocketProvider>
	</React.StrictMode>
)
