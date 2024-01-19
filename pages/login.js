import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useStateContext } from '@/components/HBOprovider'
import ls from 'local-storage'
import {v4} from 'uuid'
import { useRouter } from 'next/router'
import Login from '@/components/UI/Login/Login'


const inter = Inter({ subsets: ['latin'] })

const LoginPage = () => {
    return (
        <Login />
    )
  }
export default LoginPage;