import { QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Outlet, useRouter } from "@tanstack/react-router";
import Header from "./Header";
import { queryClient } from "@/queryClient";
import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider, useAuth } from "@/context/AuthContext";

export default function RootComponent() {
    const {user} = useAuth();
    
    return <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
            <div className="h-screen flex overflow-hidden">
              {user && <Header />}
              <div className="p-6 flex-1">
                <Outlet />
              </div>
            </div>
        </ThemeProvider>
      </QueryClientProvider>
    </>
}