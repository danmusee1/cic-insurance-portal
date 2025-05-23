import React, { useEffect } from 'react'
import { useState } from 'react'
import {useForm} from 'react-hook-form'
import './RegisterPage.module.css'
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod'

import toast from "react-hot-toast";
import { httpsService } from 'services/https.service'
import { Button } from '@tremor/react'
import { FormDatSchemaRegester } from 'lib/zod-schemas/regesterSchema'
/* import jwt from 'jsonwebtoken'; */
import { Link, useNavigate } from 'react-router'
type Inputs= z.infer<typeof FormDatSchemaRegester>
/* type Inputs ={
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  referralId: string,
} */
interface TokenData {
  email: string | null;
  affiliatedBy: string | null;
}



const SignUp = () => {
  const [data, setData] = useState<Inputs>()
  const [tokendata, setTokenData]: any = useState({});
  const [affiliatedBy, setAffiliatedBy] = useState<string | null>(null)
  const navigate = useNavigate();

   const service = new httpsService();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState : {errors}
  } = useForm<Inputs>({
    resolver:zodResolver(FormDatSchemaRegester),
    /* defaultValues:{
     name:'User_Profile',
    } */
  })

  useEffect(() => {

  }, []);



     const registerUser = async (registrationDetails:Inputs,session:any)=>{
      console.log("registration details",registrationDetails )
            const results = await service.post(registrationDetails, 'user/register', session);
            if (results.response.code === 200) {
               toast.success("Registration success");
        navigate('/'); // Redirect to a success page if needed
        reset();
            }else{
              toast.error(results.response.message)
            }
             }
  

  const password = watch('password', '');








  return (
    <div className='bg-white pageHeight relative'>
    <div className='flex justify-center bg-black'>
    <Link to='/' className='cursor-pointer'>
    <img src="/images/cic-logo.png" alt="binance logo" className='rounded-full ' width={100} height={100}/>
        </Link>

</div>
 <div className="flex-grow flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-md">
 <form onSubmit={handleSubmit(registerUser)} className='space-y-2'>
            <div>
              <div>
           <h1 className=' text-black text-lg font-bold pt-2'>Welcome! </h1>
          <h1 className='text-lg text-center text-black lg:pt-5 pt-10 pb-5 '>SignUp to continue </h1>
              </div>
                <p>First Name</p>
               {/*  <input value={name} className='py-1 border border-gray-400    w-full text-sm  lg:px-10 text-black' onChange={(e)=>setName(e.target.value)} /> */}
                <input type="text" className='py-1 border border-gray-400    w-full text-sm  lg:px-10 text-black' placeholder='firstName' 
                {...register('firstName')}
                />
                 {errors.firstName?.message &&(
                      <p className='text-sm text-red-400'>{errors?.firstName?.message}</p>
                )}
            </div>
             <div>
                <p>Middle Name</p>
               {/*  <input value={name} className='py-1 border border-gray-400    w-full text-sm  lg:px-10 text-black' onChange={(e)=>setName(e.target.value)} /> */}
                <input type="text" className='py-1 border border-gray-400    w-full text-sm  lg:px-10 text-black' placeholder='Middle Name' 
                {...register('middleName')}
                />
                 {errors.middleName?.message &&(
                      <p className='text-sm text-red-400'>{errors?.middleName?.message}</p>
                )}
            </div>
             <div>
                <p>Last Name</p>
               {/*  <input value={name} className='py-1 border border-gray-400    w-full text-sm  lg:px-10 text-black' onChange={(e)=>setName(e.target.value)} /> */}
                <input type="text" className='py-1 border border-gray-400    w-full text-sm  lg:px-10 text-black'  placeholder='last Name' 
                {...register('lastName')}
                />
                 {errors.lastName?.message &&(
                      <p className='text-sm text-red-400'>{errors?.lastName?.message}</p>
                )}
            </div>
              <div>
                <p>Email</p>
                {/* <input value={email} className='py-1 border border-gray-400    w-full text-sm  lg:px-10 text-black' onChange={(e)=>setEmail(e.target.value)} /> */}
                 <input type="email" className='py-1 border border-gray-400    w-full text-sm  lg:px-10 text-black'  placeholder='email' 
                {...register('email')}
                />
                 {errors.email?.message &&(
                      <p className='text-sm text-red-400'>{errors?.email?.message}</p>
                )}
            </div>
               <div>
                <p>Phone</p>
                {/* <input value={phone} className='py-1 border border-gray-400    w-full text-sm  lg:px-10 text-black' onChange={(e)=>setPhone(e.target.value)} /> */}
                  <input type="text" className='py-1 border border-gray-400    w-full text-sm  lg:px-10 text-black'  placeholder='Phone number' 
                {...register('phoneNumber')}
                />
                 {errors.phoneNumber?.message &&(
                      <p className='text-sm text-red-400'>{errors?.phoneNumber?.message}</p>
                )}
            </div>
             <div>
                <p>Address</p>
                {/* <input value={phone} className='py-1 border border-gray-400    w-full text-sm  lg:px-10 text-black' onChange={(e)=>setPhone(e.target.value)} /> */}
                  <input type="text" className='py-1 border border-gray-400    w-full text-sm  lg:px-10 text-black'  placeholder='Address' 
                {...register('address')}
                />
                 {errors.address?.message &&(
                      <p className='text-sm text-red-400'>{errors?.address?.message}</p>
                )}
            </div>
             <div>
                <p>Password</p>
                {/* <input value={phone} className='py-1 border border-gray-400    w-full text-sm  lg:px-10 text-black' onChange={(e)=>setPhone(e.target.value)} /> */}
                  <input type="password" className='py-1 border border-gray-400    w-full text-sm  lg:px-10 text-black'  placeholder='Password' 
                {...register('password')}
                />
                 {errors.password?.message &&(
                      <p className='text-sm text-red-400'>{errors?.password?.message}</p>
                )}
            </div>
            <div>
                <p>Confirm Password</p>
                {/* <input value={phone} className='py-1 border border-gray-400    w-full text-sm  lg:px-10 text-black' onChange={(e)=>setPhone(e.target.value)} /> */}
                  <input type="password" className='py-1 border border-gray-400    w-full text-sm  lg:px-10 text-black' placeholder='Confirm Password' 
                {...register('passwordConfirm')}
                />
                 {errors.passwordConfirm?.message &&(
                      <p className='text-sm text-red-400'>{errors?.passwordConfirm?.message}</p>
                )}
            </div>
             <button
                            type="submit"
                            className="hover:bg-blue-400 text-white bg-gray-500 flex justify-center w-full space-x-4 items-center p-2 rounded-lg"
                        >
                            Create Account
                        </button>
        </form>
</div>
  </div>
  </div>

  )
}

export default SignUp