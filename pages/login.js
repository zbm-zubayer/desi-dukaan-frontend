import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const onSubmit = async (data) => {
    event.preventDefault();
    console.log(data);
    try {
      const response = await axios.post('http://localhost:3333/api/auth/customer/login', data);
      console.log('res: ' + response.data.message);
      if (data.Email == response.data) {
        router.push('/');
        sessionStorage.setItem('email', response.data);
      } else {
        setError('Invalid Credentials');
      }
    } catch (error) {
      console.log('Error: ' + error.message);
      setError('Invalid login');
    }
  };
  return (
    <div className="min-h-[55vh]">
      <div className="w-1/4 mx-auto bg-slate-300 px-12 py-7 rounded-2xl mt-12 border-violet-400 border-4 shadow-lg hover:shadow-violet-600 hover:shadow-2xl transition">
        <h1 className="text-center text-2xl font-bold text-violet-600">Login</h1>
        <form action="#" onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
              id="email"
              {...register('Email', { required: true })}
            />
            {errors.Email && <span className="text-red-400">Email is required</span>}
          </div>

          <div>
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
              id="pass"
              {...register('Password', { required: true })}
            />
            {errors.Password && <span className="text-red-400">Password is required</span>}
          </div>
          <div>
            <button type="submit" className="btn bg-violet-500 rounded-full hover:bg-violet-700 w-full max-w-xs">
              Login
            </button>
          </div>
          <div className="text-center text-red-700 font-semibold">
            <span>{error}</span>
          </div>
        </form>
      </div>
    </div>
  );
}
