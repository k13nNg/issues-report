"use client"
import {useState} from 'react';
import { Button } from '@radix-ui/themes';
import {useForm} from "react-hook-form";
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface ChangePasswordForm {
    username: string,
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
}

const ChangePassword = () => {
    const {register, handleSubmit} = useForm<ChangePasswordForm>();
    const [error, setError] = useState("");
    const router = useRouter();

    return (
        <div className='flex justify-center content-center'>
            <form 
                className="flex flex-col max-w-96 space-y-5 border-solid border-2 rounded-sm border-blue-400 p-5 my-5"
                onSubmit = {handleSubmit( async(data) => {
                    if (data.newPassword != data.confirmNewPassword) {
                        setError("New passwords do not match!")
                    }
                    else {
                        try {
                            await axios.put("/api/user/changePassword", data, {
                                headers: {
                                    "Authorization": process.env.NEXT_PUBLIC_API_KEY
                                }
                            })  
                            router.push("/")
    
                        } catch (err:any) {

                            if (err.response.data instanceof Array) {
                                const errObject = (err.response.data).find((i:any) => i.code === "custom");
                                setError(errObject.message);
                            } else {
                                setError(err.response.data);
                            }

                        }
                    }
                })}>
                <h1 className='text-3xl text-center font-bold'>Change Password</h1>
                {
                    (error) && (
                        <div className='bg-red-200 rounded-sm p-2'>
                           <h1 className="text-red-600">{error}</h1>
                        </div>
                    ) 
                }
                <input className='border-solid border-2 rounded-sm p-2' placeholder='Username' {...register("username")}/>
                <input type="password" className='border-solid border-2 rounded-sm p-2' placeholder='Current Password' {...register("currentPassword")}/>
                <input type="password" className='border-solid border-2 rounded-sm p-2' placeholder='New Password' {...register("newPassword")}/>
                <input type="password" className='border-solid border-2 rounded-sm p-2' placeholder='Confirm New Password' {...register("confirmNewPassword")}/>
                <div className='text-right'>
                    <Button className='hover:cursor-pointer'>Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword