import { Navigate, createBrowserRouter } from 'react-router-dom'
import PublicPage from '../features/public/PublicPage'
import { AdminGuard, AdminLayout } from '../features/admin/AdminLayout'
import LoginPage from '../features/admin/LoginPage'
import BusinessPage from '../features/admin/BusinessPage'
import ServicesPage from '../features/admin/ServicesPage'
import ProjectsPage from '../features/admin/ProjectsPage'
import ReviewsPage from '../features/admin/ReviewsPage'

export const router = createBrowserRouter([
  { path: '/', element: <PublicPage locale="en" /> },
  { path: '/es', element: <PublicPage locale="es" /> },
  { path: '/admin/login', element: <LoginPage /> },
  {
    path: '/admin',
    element: <AdminGuard />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="business" replace /> },
          { path: 'business', element: <BusinessPage /> },
          { path: 'services', element: <ServicesPage /> },
          { path: 'projects', element: <ProjectsPage /> },
          { path: 'reviews', element: <ReviewsPage /> },
        ],
      },
    ],
  },
])
