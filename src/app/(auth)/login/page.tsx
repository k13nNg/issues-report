import { Button, TextField } from '@radix-ui/themes'
import React from 'react'

const Login = () => {
  return (
    <div className='flex justify-center items-center'>
        <div className='border-solid border-2 rounded-sm border-blue-400 space-y-5 p-5'>
            <h1 className='text-3xl text-center font-bold'>Login</h1>
            <TextField.Root placeholder='Username'></TextField.Root>
            <TextField.Root placeholder='Password'></TextField.Root>
            <div className='text-right'>
                <Button>Login</Button>
            </div>
        </div>
    </div>
  )
}

export default Login