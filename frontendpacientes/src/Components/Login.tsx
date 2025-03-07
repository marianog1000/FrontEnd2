import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUserCredential } from '../Services/api';

interface LoginProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
                
            try {
                const newUser = {username, password};
                const addedUser = await validateUserCredential(newUser);
                console.log('Usuario Validado correctamente.', addedUser);

                setIsAuthenticated(true);
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/patients'); 
            } catch (error) {
                 alert('Credenciales incorrectas');
            }
    }; 

    const handleRegister = () => {
      navigate('/register');
    };

    return (
        <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
            <p className="text-gray-600 mb-6 text-sm">Welcome! So good to have you back!</p>
            <form autoComplete="off" onSubmit={handleLogin} >
                <p className="text-red-500"></p>
                <div className="space-y-2">
                    <div>
                        <label 
                            htmlFor="email" 
                            className="text-gray-600 mb-2 block"
                        ></label>Usuario
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400" 
                            placeholder="youremail.@domain.com"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <div>
                        <label 
                            htmlFor="password" 
                            className="text-gray-600 mb-2 block"
                        ></label>Password<div className="relative">
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400" 
                            placeholder="***********"
                        />
                        <div
                        className="cursor-pointer absolute inset-y-0 right-0 flex items-center px-8 text-gray-600 border-l border-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" 
                            className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z">
                            </path>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="mt-4">
                    <button type="submit" className="block w-full py-2 text-center text-white bg-teal-500 border border-teal-500 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium">Login</button>
                    <div className="flex gap-2 pt-5">
                        <p className="text-gray-600 text-sm">Don't have an account?</p>
                    </div>
                    <button
                        type="button"
                        className="block w-full py-2 text-center text-white bg-indigo-500 border border-indigo-500 rounded hover:bg-transparent hover:text-indigo-500 transition uppercase font-roboto font-medium"
                        onClick={handleRegister}
                    >
                        Registrar Usuario
                    </button>

                </div>
            </form>
        </div>
        </div>
        
    );
};

export default Login;