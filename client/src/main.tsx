import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.tsx'
import Rooms from './pages/Rooms.tsx'
import MainLayout from './components/Shared/MainLayout.tsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout children={<Home />} />,
	},
	{
		path: '/rooms',
		element: <MainLayout children={<Rooms />} />,
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
