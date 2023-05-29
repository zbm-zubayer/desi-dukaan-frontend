import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [success, setSuccess] = useState('');
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.put(`http://localhost:3333/api/customer/b065b9f3-0cf4-4e3a-867f-3b0fd7ff524f`, data);
      setSuccess('Registration successful. Please login to continue.');
      reset();
    } catch (error) {
      console.log(error.response.data.message);
      setSuccess('Registration failed. ' + error.response.data.message);
    }
  };
  return (
    <>
      <div>
        <div className="w-1/4 mx-auto bg-slate-300 px-12 py-7 rounded-2xl mt-12 border-violet-400 border-4 shadow-lg hover:shadow-violet-600 hover:shadow-2xl transition">
          <h1 className="text-center text-2xl font-bold text-violet-600">Profile Update</h1>
          <form action="#" onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full max-w-xs"
                id="name"
                {...register('C_Name', { required: true })}
              />
              {errors.C_Name && <span className="text-red-400">Name is required</span>}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
                id="email"
                {...register('C_Email', { required: true })}
              />
              {errors.C_Email && <span className="text-red-400">Email is required</span>}
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                placeholder="Phone"
                className="input input-bordered w-full max-w-xs"
                id="phone"
                {...register('C_Phone', { required: true })}
              />
              {errors.C_Phone && <span className="text-red-400">Name is required</span>}
            </div>
            <div>
              <label htmlFor="dob">Date of birth</label>
              <input
                type="date"
                className="input input-bordered w-full max-w-xs"
                id="dob"
                {...register('C_Dob', { required: true })}
              />
              {errors.C_Dob && <span className="text-red-400">Date of birth is required</span>}
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <select
                className="select select-bordered w-full max-w-xs"
                id="gender"
                {...register('C_Gender', { required: true })}
              >
                <option selected disabled>
                  Select your gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
              {errors.C_Gender && <span className="text-red-400">Gender is required</span>}
            </div>
            <div>
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                className="input input-bordered w-full max-w-xs"
                id="pass"
                {...register('C_Password', { required: true })}
              />
              {errors.C_Password && <span className="text-red-400">Password is required</span>}
            </div>
            <div>
              <button type="submit" className="btn bg-violet-500 rounded-full hover:bg-violet-700 w-full max-w-xs">
                Upate
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
