import AccountSideBar from '@/components/acount-sidebar';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import logo from '../../public/next.svg';

export default function Profile({ data }) {
  const { Uuid } = data;
  const router = useRouter();
  const handleClick = async () => {
    const res = await axios.delete('http://localhost:3333/api/customer/delete/' + Uuid);
    router.push('/');
  };
  // Signout
  const [email, setEmail] = useState(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // checks if the code is running on the client-side and not on the server-side.
      const session = sessionStorage.getItem('email');
      if (session) {
        setEmail(sessionStorage.getItem('email'));
      }
    }
  }, []);

  const handleSignOut = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:3333/api/auth/logout');
      console.log(response.data);
      sessionStorage.removeItem('email');
      setEmail(null);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {/* <SessionCheck /> */}
      <div className="flex mx-auto w-[85%] px-4 sm:px-6 lg:px-8">
        <AccountSideBar Id={Uuid} />
        <div className="w-full grid grid-cols-2 bg-gray-300 mx-6 px-6 py-4 rounded-md">
          <div className="">
            <div className="text-4xl font-bold mb-4">Profile</div>
            <Image
              className="border-2 border-gray-700 rounded-lg h-[150px] w-[150px]"
              src={data.Photo ? 'http://localhost:3333/api/customer/photo/' + data.Photo : logo}
              alt="profile photo"
              width={150}
              height={150}
            ></Image>
            <div className="my-2 w-[300px] rounded-md space-x-3">
              <span className="font-bold">Name</span>
              <span>{data.Name}</span>
            </div>
            <div className="my-2 w-[300px] rounded-md space-x-3">
              <span className="font-bold">Email</span>
              <span>{data.Email}</span>
            </div>
            <div className="my-2 w-[300px] rounded-md space-x-3">
              <span className="font-bold">Phone</span>
              <span>{data.Phone}</span>
            </div>
            <div className="my-2 w-[300px] rounded-md space-x-3">
              <span className="font-bold">Date Of Birth</span>
              <span>{data.Dob}</span>
            </div>
            <div className="my-2 w-[300px] rounded-md space-x-3">
              <span className="font-bold">Gender</span>
              <span>{data.Gender}</span>
            </div>
            <div className="my-2 w-[300px] rounded-md space-x-3">
              <span className="font-bold">Address</span>
              <span>{data.Address}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <Link className="text-blue-500 font-bold rounded-md" href={'./edit-profile/' + data.Uuid}>
                Edit Profile
              </Link>
            </div>
            <div>
              <Link className="text-blue-500 font-bold rounded-md" href={'./change-email/' + data.Uuid}>
                Change Email
              </Link>
            </div>
            <div>
              <Link className="text-blue-500 font-bold rounded-md" href={'./change-password/' + data.Uuid}>
                Change Password
              </Link>
            </div>
            <button onClick={handleClick} className="text-red-500 rounded-md font-bold">
              Delete Account
            </button>
            <button onClick={handleSignOut} className="text-orange-500 rounded-md font-bold">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const id = context.params.cuuid;
  const res = await axios.get('http://localhost:3333/api/customer/' + id);
  const data = await res.data;

  return { props: { data } };
}
