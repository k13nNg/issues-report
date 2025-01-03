import React from 'react'
import { getSession } from '../authentication'
import AdminPortal from '../components/adminPortal';
const Admin = async () => {
    const session = await getSession();

  return (
    <div>
        {
            (session !== null && session.user.role === "ADMIN") ? (
                <AdminPortal/>
            ) : (
                <div>
                    <h1 className='text-3xl'>Please log in to your admin account to continue</h1>
                </div>
            )
        }
    </div>
  )
}

export default Admin