import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('apex_admin_auth') === 'true'
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />
}
