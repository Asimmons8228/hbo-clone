import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useStateContext } from '@/components/HBOprovider'
import ls from 'local-storage'
import {v4} from 'uuid'
import { useRouter } from 'next/router'

// Font subset configuration
const inter = Inter({ subsets: ['latin'] })

export default function CreateUser() {
  const globalState = useStateContext();
  const router = useRouter();

  // Function to save user data
  const saveUser = () => {
    let users = [],
    user;

    // Check if there are no existing users in local storage
    if (ls('users') < 1) {
      // Create a new user object
      user = {
        id: v4(),
        user: globalState.user,
        myListId: []
      }
      // Add the user to the users array and store it in local storage
      users.push(user)
      ls('users', users)
      // Redirect to the login page
      router.push('/login')

      // Log users and local storage users for debugging
      console.log('users:', users)
      console.log('lsusers', ls('users'))
    } else {
      // Retrieve existing users from local storage
      users = ls('users')
      // Create a new user object
      user = {
        id: v4(),
        user: globalState.user,
        myListId: []
      }
      // Add the user to the existing users array and store it in local storage
      users.push(user)
      ls('users', users)

      // Log users and local storage users for debugging
      console.log('users:', users)
      console.log('lsusers', ls('users'))
      // Redirect to the login page
      router.push('/login')
    }
  }

  return (
    <div>
      <div className='create-user'>
        <div className='create-user__top'>
          <div className='create-user__logo' />
          <span className='create-user__title'>
            Who is Watching
          </span>
        </div>
        <div className='create-user__form'>
            <img className='create-user__user-img' src={globalState.defaultUserImg} width={200} />
            <div className='create-user__input-group'>
                <label>Name</label>
                {/* Input for user name */}
                <input value={globalState.user} onChange={globalState.createUserAction} type='text' className='create-user__inputText'/>
                <div className='create-user__colors'>
                    {/* Color options for user */}
                    <div className='create-user__color create-user__color--active' style={{background: 'rgb(2, 27, 64)', background:'linear-gradient(135deg, rgba(2,27,64,1) 11%, rgba(119,30,135,1)100%)'}}/>
                    <div className='create-user__color' style={{background: 'rgb(34,193,195)', background: 'linear-gradient(135deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)'}}/>
                    <div className='create-user__color' style={{background: 'rgb(131,58,180)', background:'linear-gradient(135deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)'}}/>
                    <div className='create-user__color' style={{background: 'rgb(238,174,202)', background:'linear-gradient(135deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'}}/>
                    <div className='create-user__color' style={{background: 'rgb(180,179,58)', background:'linear-gradient(135deg, rgba(180,179,58,1) 0%, rgba(79,253,29,1) 100%, rgba(252,176,69,1) 100%)'}}/>
                </div>
            </div>
        </div>
        <div className='create-user__buttons'>
          {/* Button to cancel user creation */}
          <button className='create-user__cancel'>Cancel</button>
          {/* Button to save user */}
          <button className='create-user__save' onClick={saveUser}>Save</button>
        </div>
      </div>
    </div>
  )
}
