import axios from "axios";
import { useState } from "react"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const depurl = import.meta.env.VITE_DEP_URL;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState({
    email:"",
    password:""
  });
  const notify = (mssg) => {
    toast.success(`${mssg}`, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };
  const [err, setErr] = useState("");

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const submit = async () => {
    console.log(user);

    try {
      const res = await axios.post(`${depurl}/api/users/login`, user);
      console.log(res.data);
      setUser({
        email:"",
        password:""
      });
      localStorage.setItem("userlogin", JSON.stringify(res.data));
      setTimeout(() => {
        notify(res.data.message);
      }, 1000);

      const role = res.data.role;
      if (role === 'professor') {
        window.location = role + '/profil';
      } else {
        window.location = role;
      }

    } catch (error) {
      console.log(error.response.data.message);
      toast.error(`${error.response.data.message}`, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  return (
    <div style={{ background: 'beige' }}>
   <div className={`dark:bg-slate-900 bg-blue-300 flex h-full items-center py-16 min-h-screen font-[Poppins]`}>
 <main className="w-full max-w-md mx-auto p-6">
       <div className="mt-7 bg-tooth border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7" style={{ background: '#ffffff' }}>
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Login</h1>
            
              </div>

              <div className="mt-5">
         
                <div className="grid gap-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Email address"
                      required
                      aria-describedby="email-error"
                    />
                    <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                      <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Password"
                      required
                      aria-describedby="password-error"
                    />
                    <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                      <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>

                  {err && <p className="text-sm text-red-600 mt-2">{err}</p>}

                  <div className="flex gap-4">
                    <a
                      href="/register"
                      className="flex-1 py-3 px-4 inline-flex justify-center items-center text-sm font-semibold rounded-lg border border-transparent bg-gray-300 text-black hover:bg-gray-400 hover:text-black disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-gray-600"
                    >
                     register
                    </a>
                    <button
                      onClick={submit}
                      className="flex-1 py-3 px-4 inline-flex justify-center items-center text-sm font-semibold rounded-lg border border-transparent bg-black text-white hover:bg-black hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-black"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        </main>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;