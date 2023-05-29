import AccountSideBar from '@/components/acount-sidebar';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
export default function EditProfile({ data }) {
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
      const response = await axios.put(`http://localhost:3333/api/customer/update${data.Uuid}`, data);
      setSuccess('Registration successful. Please login to continue.');
      reset();
    } catch (error) {
      console.log(error.response.data.message);
      setSuccess('Registration failed. ' + error.response.data.message);
    }
  };
  return (
    <>
      {/* <SessionCheck /> */}
      <div className="flex mx-auto w-[85%] px-4 sm:px-6 lg:px-8">
        <AccountSideBar />
        <div className="w-full grid grid-cols-2 bg-gray-300 mx-6 px-6 py-4 rounded-md">
          <form action="#" onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="m-4 grid grid-cols-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full max-w-xs"
                id="name"
                value={data.Name}
                {...register('Name', { required: true })}
              />
              {errors.Name && <span className="text-red-400">Name is required</span>}
            </div>
            <div className="m-4 grid grid-cols-2">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                placeholder="Phone"
                className="input input-bordered w-full max-w-xs"
                id="phone"
                {...register('Phone', { required: true })}
              />
              {errors.Phone && <span className="text-red-400">Name is required</span>}
            </div>
            <div className="m-4 grid grid-cols-2">
              <label htmlFor="dob">Date of birth</label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                id="dob"
                {...register('Dob', { required: true })}
              />
              {errors.Dob && <span className="text-red-400">Date of birth is required</span>}
            </div>
            <div className="m-4 grid grid-cols-2">
              <label htmlFor="gender">Gender</label>
              <select
                className="select select-bordered w-full max-w-xs"
                id="gender"
                {...register('Gender', { required: true })}
              >
                <option selected disabled>
                  Select your gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
              {errors.Gender && <span className="text-red-400">Gender is required</span>}
            </div>
            <div className="m-4 grid grid-cols-2">
              <label htmlFor="address">Address</label>
              <input type="text" className="input input-bordered w-[400px]" id="address" {...register('Address')} />
            </div>
            <div>
              <button type="submit" className="btn bg-violet-500 rounded-full hover:bg-violet-700 w-full max-w-xs">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const uid = context.params.cuuid;
  const res = await axios.get('http://localhost:3333/api/customer/' + uid);
  const data = await res.data;

  return { props: { data } };
}
