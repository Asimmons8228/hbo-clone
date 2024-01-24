// Importing necessary modules and components
import Head from 'next/head';  // Head component for managing document head
import Image from 'next/image';  // Next.js component for image optimization
import { Inter } from 'next/font/google';  // Inter font from Google Fonts
import { useStateContext } from '@/components/HBOprovider';  // Custom hook to access global state
import { useRouter } from 'next/router';  // Next.js hook for accessing the router
import { useEffect, useState } from 'react';  // React hooks for side effects and state management
import ls from 'local-storage';  // Library for local storage operations
import { useMounted } from '@/components/Hooks/useMounted';  // Custom hook for checking if the component has mounted

// Initializing the Inter font with Latin subset
const inter = Inter({ subsets: ['latin'] });

// Login component definition
const Login = () => {
  const globalState = useStateContext();  // Accessing global state using custom hook
  const router = useRouter();  // Next.js router instance
  const [loadingUsers, setLoadingUsers] = useState(false);  // State for loading users
  let users = ls('users') !== null ? ls('users') : [];  // Retrieving user data from local storage
  let { hasMounted } = useMounted();  // Custom hook to check if the component has mounted

  // Effect to handle loading users state
  useEffect(() => {
    if (users < 1) {
      setLoadingUsers(false);
    }
    console.log('load effect', users);
  }, []);

  console.log('declared users', users);

  // Function to select a user and navigate to the home page
  const selectUser = (id) => {
    ls('activeUID', id);
    router.push('/');
  }

  // Function to render user boxes
  const showUsers = () => {
    if (!loadingUsers) {
      return users.map((user) => {
        return (
          <div onClick={() => selectUser(user.id)} className='login-user__box' key={user.id}>
            <img className='login-user__user-img' src='https://mighty.tools/mockmind-api/content/human/46.jpg' width={200} />
            <div className='login-user__user-name'>{user.user}</div>
          </div>
        );
      });
    }
  }

  // Function to navigate to the create user page
  const createUser = () => {
    router.push('/create');
  }

  // JSX structure for Login component
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
  );
}

export default Login;
