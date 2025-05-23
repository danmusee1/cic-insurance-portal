import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import './LoginPage.module.css'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'
import toast from "react-hot-toast";
import { Button, Card } from '@tremor/react'
import axios from 'axios'
import { Link, useNavigate, useSearchParams } from 'react-router'
import  { FormDatSchemaLogin } from 'lib/zod-schemas/schemalogin'
import { httpsService } from 'services/https.service'
import { useUser } from '~/contexts/UserContext';

type Inputs = z.infer<typeof FormDatSchemaLogin>
const Login = () => {
  const { setUser } = useUser();
  /* const { data: session, status } = useSession(); */
  // Use id to append to the href

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDatSchemaLogin)
    /*  defaultValues:{
       firstName: '',
       lastName: '',
       email: '',
       password: '',
       referralId: '',
     } */
  })


  const navigate = useNavigate();

 /*  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo');
  const id = searchParams.get('id')
  console.log('the parammm  id', id) */


  const href = `${import.meta.env.VITE_PUBLIC_API_URL}google`;
  const [loginError, setLoginError] = React.useState("");
  const handleLoginErrorChange = (errorMessage: string) => setLoginError(errorMessage);



 const [searchParams] = useSearchParams();

  useEffect(() => {
    const redirectTo = searchParams.get("redirectTo");
    if (redirectTo) {
      navigate(redirectTo);
    }
  }, [searchParams, navigate]);
  const processForm = async (formData: Inputs, session: any) => {
    const service = new httpsService();
    console.log("the form data", JSON.stringify(formData));
    const loginDetails = { ...formData };
    try {
      await service.post(loginDetails, 'auth/login', session).then((results:any) => {   
        if (results?.response?.code === 200) {
  const user = {
    id: results.data.id,
    name: results.data.name,
    email: results.data.email,
  };
          localStorage.setItem('token',results.data.jwt)
          localStorage.setItem('user', JSON.stringify(user ));
          setUser(user, results.data.jwt); // <- context is what your UI listens to

         //setUser(user);
          console.log('saved successfully');
          toast.success(results.response.message);
          reset();
          navigate('/dashboard');
        
        } else {
          toast.error(results.response.message);
           
        }
    })} catch (error) {
      toast.success('Login success');
        console.error('Error:', error);
    }
  
    } 
  













  return (
    <div className='bg-white pageHeight relative'>
      <div className='flex justify-center bg-black'>
        <Link to='/' className='cursor-pointer'>
          <img src="/images/cic-logo.png" alt="binance logo" className='rounded-full ' width={100} height={100}/>
        </Link>

      </div>
 <div className="flex-grow flex items-center justify-center px-4 pt-20">
    <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-md">
          <form onSubmit={handleSubmit(processForm)} className='  '>
            <div className='w-full ' >
              <h1 className=' text-black text-lg font-bold pt-2'>Welcome! </h1>
              <h1 className='text-sm text-center text-black lg:pt-5 pt-10 pb-5 '>Login to continue </h1>
              <div className='space-y-4 ' >
                <div>
                  <div>
                    <div className='text-xs text-red-500 text-center' id="error-message"></div>
                  </div>

                  <input className='py-1 border border-gray-400  w-full text-sm lg:px-10 text-black' type='email' placeholder='Email'
                    {...register('email')} />
                  {errors.email?.message && (
                    <p className='text-sm text-red-400'>{errors.email.message}</p>
                  )}

                </div>
                <div>

                  <input className='py-1 border border-gray-400    w-full text-sm  lg:px-10 text-black' type='password' placeholder='Password'
                    {...register('password')}

                  />
                  {errors.password?.message && (
                    <p className='text-sm text-red-400'>{errors.password.message}</p>
                  )}

                </div>
              </div>



              <Link to="/email-forget-password">
              <h1 className='text-xs text-red-500 pt-5'> Forgot Password?</h1>
              </Link>
             

              <div className='flex space-x-5 items-center pt-5 pb-10'>

                <Button  type='submit' className='bg-gray-500 w-full text-white rounded-lg py-2 px-8 text-xs'>
                  Login</Button>



              </div>

              <div className='flex justify-between items-center'>
                <div className='bg-black h-0.5 w-1/4'></div>
                <h1 className='text-black text-sm'>or continue with</h1>
                <div className='bg-black h-0.5 w-1/4'></div>
              </div>
              <div className='pt-10'>

                <Link to={href} >
                  <div className='hover:bg-blue-400 bg-gray-500 flex justify-center w-full space-x-4 items-center p-2 rounded-lg'>
                    <img src="/images/google-logo.png" alt="google image" height={16} width={20} />
                    <h1 className='text-sm'>Google</h1>
                  </div>
                </Link>

              </div>

              <div className='flex space-x-2 pt-10 pb-10'>
                <h1 className='text-black text-xs'> dont have an account yet?</h1>
                <Link to="/signup">
                  <h1 className='text-xs text-red-500'>Create a new account</h1>

                </Link>
              </div>


            </div>
          </form>
        </div>
      </div>
    </div>



  )
}

export default Login