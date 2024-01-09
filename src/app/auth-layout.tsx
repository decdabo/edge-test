'use client'
import React, { useEffect } from 'react'
import { Layout } from 'antd'
import { SiderbarComponent } from '@/components/ui/SiderbarComponent'
import { useAuthContext } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { PAGES } from '@/utils/pages'
import Login from './login/page'

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { state }: any = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!state.isAuth) {
      router.push(PAGES.LOGIN)
    } else {
      router.push(PAGES.HOME)
    }

  }, [state.token])
  return (
    <>
      {
        !state.isAuth && (
          <Login />
        )
      }
      {
        (state.isAuth) && (
          <Layout style={{ minHeight: '98vh', borderRadius: '5px' }}>
            <SiderbarComponent />     
            <Layout.Content style={{ padding: '10px' }}>
              {children}        
            </Layout.Content> 
          </Layout>
        )
      }
    </>
  )
}
