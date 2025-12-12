import { Outlet, createRootRoute, useNavigate } from '@tanstack/react-router'

import Header from '../components/Header'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/queryClient'
import { supabase } from '@/supabaseClient'
import RootComponent from '@/components/RootComponent'
import { AuthProvider } from '@/context/AuthContext'

export const Route = createRootRoute({
  component: () => {
    return (
    <AuthProvider>
      <RootComponent />
    </AuthProvider>
    )
  },
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    return {user: data.user}
  }
})
