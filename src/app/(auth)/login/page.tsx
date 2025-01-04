"use client"
import { Button } from '@radix-ui/themes';
import React from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import { login } from '@/app/authentication';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoginForm {
  username: string,
  password: string
}

const Login = () => {
  const {register, handleSubmit} = useForm<LoginForm>();
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <div className='flex justify-center content-center'>
        <form 
          className='border-solid border-2 rounded-sm border-blue-400 space-y-5 p-5 flex flex-col my-5'
          onSubmit={handleSubmit(async (data) => {
            try {
              const res = await axios.post("/api/user/login", data, {
                headers: {"Authorization": process.env.NEXT_PUBLIC_API_KEY}
              })

              await login(res.data);
              router.push("/");

            } catch (err: any) {
              console.log(err.response.data)
              setError("An unexpected error has occurred")
            }
          })}>
            <h1 className='text-3xl text-center font-bold'>Login</h1>
            { error && <div className='bg-red-200 rounded-sm p-2'>
              <h1 className="text-red-600">{error}</h1>
            </div>}
            <input className="border-solid border-2 rounded-sm p-2" placeholder='Username' {...register("username")}></input>
            <input className="border-solid border-2 rounded-sm p-2" type="password" placeholder='Password' {...register("password")}></input>
            <div className='text-right'>
                <Button className='text-right hover:cursor-pointer'>Login</Button>
            </div>
        </form>
    </div>
  )
}

export default Login