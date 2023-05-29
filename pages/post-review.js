import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function PostReview() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const submit = async (data) => {
    console.log(data);
    const fdata = new FormData();
    fdata.append('CategoryName', data.name);
    // fdata.append('C_Email', data.email);
    // fdata.append('C_Phone', data.phone);
    // fdata.append('C_Dob', data.dob);
    // fdata.append('C_Gender', data.gender);
    // fdata.append('C_Password', data.password);
    console.log(fdata);
    try {
      const response = await axios.post(
        'http://localhost:3333/customer/category/create',
        fdata
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <input type="text" {...register('name')} className="bg-gray-200" />
        <input type="text" {...register('email')} className="bg-gray-200" />
        <input type="text" {...register('phone')} className="bg-gray-200" />
        <input type="text" {...register('gender')} className="bg-gray-200" />
        <input type="date" {...register('dob')} className="bg-gray-200" />
        <input type="text" {...register('password')} className="bg-gray-200" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
