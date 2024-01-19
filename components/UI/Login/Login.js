import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useStateContext } from '@/components/HBOprovider'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ls from 'local-storage'
import { useMounted } from '@/components/Hooks/useMounted'


const inter = Inter({ subsets: ['latin'] })

const Login = () => {
  const globalState = useStateContext();
  const router = useRouter();
  const [loadingUsers, setLoadingUsers] = useState(false)
  let users = ls('users') !== null ? ls('users') : []
  let {hasMounted} = useMounted();

  useEffect(() => {
    if (users < 1) {
        setLoadingUsers(false)
    }
    console.log('load effect', users)
  }, [])

  console.log('declared users', users)
  const selectUser = (id) => {
    ls('activeUID', id)
    router.push('/')
  }

  const showUsers = () => {
    if (!loadingUsers) {
        return users.map((user) => {
            return (
        
          <div onClick={() => selectUser(user.id)} className='login-user__box' key={user.id}>
            <img className='login-user__user-img' src='https://mighty.tools/mockmind-api/content/human/46.jpg' width={200} />
            <div className='login-user__user-name'>{user.user}</div>
          </div>
            )
        })
    }
  }

  const createUser = () => {
    router.push('/create')
  }

  return (
      <div className='login-user'>
        <div className='login-user__top'>
          <div className='login-user__logo' />
          <span className='login-user__title'>
            Who is Watching
          </span>
        </div>
        <div className='login-user__form'>
          {hasMounted ? showUsers() : ''}  
        </div>
        <div className='login-user__buttons'>
          <button className='login-user__kid' onClick={createUser}>Create User</button>
        </div>
      </div>
  )
}

export default Login