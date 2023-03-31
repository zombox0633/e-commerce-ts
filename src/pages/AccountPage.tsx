import { useState } from "react";
import { Link as NavLink } from "react-router-dom";
import "style/App.css";

//ref https://www.spotify.com/th-th/account/overview/
//ref https://discord.com/channels/@me

//store
import useProfileStore from "store/profile/profile.store";

function AccountPage() {
  const user = useProfileStore((state) => state.user);

  //useState
  const [filePicture, setFilePicture] = useState<File | null>(null);

  const handleFilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFilePicture(event.target.files[0]);
    }
  };

  return (
    <div className='flex justify-center h-screen bg-gradient-to-b from-[#1f2a39] to-black'>
      <div className='flex justify-start w-auto lg:w-[55rem] h-full'>
        <div className='hidden sm:block w-72 bg-[#1b1b1b]'>
          <div className=' flex justify-center items-center w-full h-1/4 mt-2'>
            <label htmlFor='profilePicInput' className='cursor-pointer'>
              <div className='hoverAble  flex justify-center items-center w-40 h-40 border-4 border-black rounded-full bg-white overflow-hidden'>
                {filePicture ? (
                  <img src={URL.createObjectURL(filePicture)} className=' w-full h-full' />
                ) : (
                  <p className='text-6xl'>{user && user.username.slice(0, 2).toUpperCase()}</p>
                )}
              </div>
            </label>
            <input
              id='profilePicInput'
              type='file'
              accept='image/*'
              onChange={handleFilePicChange}
              className='hidden'
            />
          </div>
          <ul className='h-1/2 mt-4 text-white text-lg'>
            <li className='border-t-[1px] border-t-white/20 border-b-[1px] border-b-white/5'>
              <NavLink to='/account' className='flex items-center h-14 ml-4'>
                User account overview
              </NavLink>
            </li>
            <li className='border-y-[1px] border-t-white/20 border-b-[1px] border-b-white/5'>
              <NavLink to='/account' className='flex items-center h-14 ml-4'>
                Edit profile
              </NavLink>
            </li>
            <li className='border-y-[1px] border-y-white/20'>
              <NavLink to='/account' className='flex items-center h-14 ml-4'>
                Change password
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='w-auto lg:w-[37rem] p-12 bg-white'>
          <h1 className='text-4xl mb-12'>User account overview</h1>
          <div className='mb-12'>
            <h3 className='text-2xl mb-6'>Profile</h3>
            <table className='table table-auto w-full'>
              <tbody>
                <tr>
                  <td className='w-1/2 border-b border-gray-500 px-4 py-4 text-gray-500'>
                    Username
                  </td>
                  <td className='w-1/2 border-b border-gray-500 px-4 py-4'>{user?.username}</td>
                </tr>
                <tr>
                  <td className='w-1/2 border-b border-gray-500 px-4 py-4 text-gray-500'>Email</td>
                  <td className='w-1/2 border-b border-gray-500 px-4 py-4'>{user?.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button 
            className='filterCheckbox px-4 py-2 border-2 border-neutral-600 rounded-full cursor-pointer select-none hover:bg-black hover:text-white hover:shadow-lg hover:-translate-y-0.5  active:shadow-none active:translate-y-0'
          >
            Edit profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;