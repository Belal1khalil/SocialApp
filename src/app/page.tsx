import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";



export default function page() {
  return (
    <ProtectedRoute >
      <div>Welcome to the protected page!</div>
    </ProtectedRoute>
    
  )
}
