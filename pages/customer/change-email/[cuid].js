import AccountSideBar from '@/components/acount-sidebar';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
export default function ChangeEmail({ data }) {
  const { Uuid } = data;
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
    try {
      const response = await axios.patch(`http://localhost:3333/api/customer/change-password/${Uuid}`, data);
      const isChanged = await response.data;
      if (isChanged) {
        setSuccess('Password changed successfully.');
        reset();
      } else {
        setError('Incorrect current password.');
      }
    } catch (error) {
      console.log(error.response.data.message);
      setError('Failed ' + error.response.data.message);
    }
  };
  return (
    <>
      {/* <SessionCheck /> */}
      <div className="flex mx-auto w-[85%] px-4 sm:px-6 lg:px-8">
        <AccountSideBar />
        <div className="w-full bg-gray-300 mx-6 px-6 py-4 rounded-md">
          <form action="#" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
                id="name"
                {...register('Email', { required: true })}
              />
              {errors.Email && <span className="ml-3 text-red-400">Email is required</span>}
            </div>
            <div className="flex items-center">
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                id="name"
                {...register('Password', { required: true })}
              />
              {errors.Password && <span className="ml-3 text-red-400">Password is required</span>}
            </div>
            <div>
              <button type="submit" className="btn bg-violet-500 rounded-full hover:bg-violet-700 w-full max-w-xs">
                Confirm
              </button>
            </div>
            {success && <span className="text-green-400">{success}</span>}
            {error && <span className="text-red-400">{error}</span>}
          </form>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const uid = context.params.cuid;
  const res = await axios.get('http://localhost:3333/api/customer/' + uid);
  const data = await res.data;

  return { props: { data } };
}
