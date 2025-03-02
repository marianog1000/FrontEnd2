import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUserCredential } from '../Services/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
             
         try {
            const newUser = {username, password};
            const addedUser = await addUserCredential(newUser);
            console.log('Nuevo registro agregado:', addedUser);
            navigate('/'); 
         } catch (error) {
               console.error('Error adding new user:', error);
         }
    };

    const handleBackToLogin = () => {
        navigate('/');
    };


    return (

    <div class="contain py-16">
      <div class="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 class="text-2xl uppercase font-medium mb-1">Registrar Usuario </h2>    
        <form autocomplete="off">
          <p class="text-red-500"></p>
          <div class="space-y-2">
            <div>
                <label 
                    for="email" 
                    class="text-gray-600 mb-2 block"
                ></label>Usuario
                <input 
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400" 
                    placeholder="youremail.@domain.com"
                  />
              </div>
            </div>
            <div class="space-y-2">
              <div>
                  <label 
                      for="password" 
                      class="text-gray-600 mb-2 block"
                  ></label>Password
                  <div 
                      class="relative"
                  >
                  <input 
                      type="password" 
                      name="password" 
                      id="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400" 
                      placeholder="***********"
                  />
                  
                </div>
              </div>
            </div>
            <div class="mt-4">
              <button 
                  type="submit" 
                  onClick={handleRegister}
                  class="block w-full py-2 text-center text-white bg-teal-500 border border-teal-500 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium"
              >Registrar</button>
            </div>
            <div class="mt-4">
              <button
                      type="button"
                      onClick={handleBackToLogin}
                      className="block w-full py-2 text-center text-white bg-amber-500 border border-amber-500 rounded hover:bg-transparent hover:text-amber-500 transition uppercase font-roboto font-medium"
                  >
                      Volver a Login
                  </button>
              </div>
          </form>
        </div>
      </div>


    );
};

export default Register;