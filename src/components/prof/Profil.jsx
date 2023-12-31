import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DotLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Prof from '../../assets/b.png';

const Profil = () => {

 
  const depurl = import.meta.env.VITE_DEP_URL;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [edit, setEdit] = useState(false);
  const url = `${depurl}/api/users`;
  const userlogin = JSON.parse(localStorage.getItem('userlogin'));

  const getProfessor = async () => {
    const res = await axios.get(`${url}/${userlogin.id}`);
    setUser(res.data);
    setSelectedImage(res.data.photo);
  };

  useEffect(() => {
    setLoading(true);
    getProfessor();
    setLoading(false);
  }, []);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateUser = async () => {
    try {
      const rep = await axios.put(`${url}/update/professor/${user.id}`, user);
      setLoading(true);
      setEdit(false);
      getProfessor();
      setTimeout(() => {
        setLoading(false);
        window.location = '/professor/profil';
      }, 800);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex w-full justify-center items-center mt-32'>
      {loading ? (
        <DotLoader color='#36D7B7' loading={loading} size={150} />
      ) : (
        <div className='flex flex-col w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 justify-center items-center rounded-xl p-5 bg-gray-200'>
          <div className='flex justify-center items-center'>
            <input
              type='file'
              accept='image/*'
              onChange={(e) => {
                const selectedFile = e.target.files[0];

                if (selectedFile) {
                  const reader = new FileReader();

                  reader.onload = (event) => {
                    const base64String = event.target.result;

                    const base64WithoutPrefix = base64String.split(',')[1];
                    setSelectedImage(base64String);
                    setUser({ ...user, photo: base64WithoutPrefix });
                    setEdit(true);
                  };

                  reader.readAsDataURL(selectedFile);
                }
              }}
              style={{ display: 'none' }}
              id='fileInput'
            />
            <img
              key={Date.now()}
              src={user.photo === null ? Prof : `data:image/png;base64, ${user.photo}`}
              className='w-40 h-40 rounded-full'
            />
            <label htmlFor='fileInput' className='mt-36 text-gray-500 hover:text-sky-600 hover:cursor-pointer'>
              <FontAwesomeIcon icon={faPen} />
            </label>
            <span className='ml-10 '>
              <p className='text-2xl text-gray-700 font-bold'>{user.email}</p>
            </span>
          </div>
          <div className='flex flex-col w-full pt-4 bg-gray-200 items-center justify-center'>
            <div className='w-4/5 my-2'>
              <label htmlFor='nom' className='block text-gray-700 text-sm mb-2'>
                First Name{' '}
              </label>
              <input
                type='text'
                id='nom'
                name='firstName'
                value={user.firstName}
                onChange={handleInput}
                className='bg-gray-100 py-3 font-semibold px-4 block text-gray-500 w-full border-gray-200 rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500'
              />
            </div>
            <div className='w-4/5 my-2'>
              <label htmlFor='nom' className='block text-gray-700 text-sm mb-2'>
                Last Name{' '}
              </label>
              <input
                type='text'
                id='nom'
                name='lastName'
                value={user.lastName}
                onChange={handleInput}
                className='bg-gray-100 py-3 font-semibold px-4 block text-gray-500 w-full border-gray-200 rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500'
              />
            </div>
            <div className='w-4/5 my-2'>
              <label htmlFor='nom' className='block text-gray-700 text-sm mb-2'>
                Grade{' '}
              </label>
              <input
                type='text'
                id='nom'
                name='grade'
                value={user.grade}
                onChange={handleInput}
                className='bg-gray-100 py-3 font-semibold px-4 block text-gray-500 w-full border-gray-200 rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500'
              />
            </div>
            <button
              className='rounded-lg px-4 py-2 my-2 bg-gray-500 hover:bg-gray-700 text-white font-semibold'
              onClick={updateUser}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
