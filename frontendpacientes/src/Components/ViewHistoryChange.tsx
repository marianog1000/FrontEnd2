import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getHealthHistoryChangeById } from '../Services/api.js'; 


const ViewHistoryChange = () => {
    const { id } = useParams();
    const [healthHistory, setHealthHistory] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHealthHistoryChangeById(id);
                setHealthHistory(data);
            } catch (error) {
                console.error('Error fetching health history:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleVolver = () => {
        navigate(-1); 
    };

    if (!healthHistory) {
        return <div>Cargando...</div>;
    }
    
    return (


        <div>

         <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Visualizar Cambio Histórico</h1>

              

                    <div className="flex flex-wrap">
                        <div className="w-full p-2">
                            <div className="mb-5">
                                <label 
                                    for="id" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >ID</label>
                                <input 
                                    type="text" 
                                    name="id" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.id} 
                                    readOnly/>
                            </div>
                        </div> 

                        
                        <div className="w-full md:w-1/2 p-2">
                            <div className="mb-5">
                                <label 
                                    for="healthHistoryId" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Id de Historia Clinica</label>
                                <input 
                                    type="text" 
                                    name="healthHistoryId" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.HealthHistoryId}
                                    readOnly />                            
                            </div>
                        </div>


                        <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                            <label 
                                for="changeDate" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Fecha de Cambio</label>

                            <input 
                                type="date" 
                                name="changeDate" 
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                value={healthHistory.changeDate ? healthHistory.changeDate.split("T")[0] : ""}  
                            />
                        </div> 
                        </div>

                        <div className="w-full md:w-1/2 p-2">
                            <div className="mb-5">
                                <label 
                                    for="fieldName" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Campo Modificado</label>
                                <input 
                                    type="text" 
                                    name="fieldName" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.fieldName} 
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="w-full p-2">
                            <div className="mb-5">
                                <label 
                                    for="oldValue" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Valor Anterior</label>
                                
                                <textarea 
                                    name="oldValue" 
                                    cols="40" 
                                    rows="5" 
                                    value={healthHistory.oldValue}                                     
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    readOnly
                                >
                                </textarea>                      
                            </div>                  

                        </div>


                        <div className="w-full p-2">

                            <div className="mb-5">
                                <label 
                                    for="newValue" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Valor Nuevo</label>                               

                                <textarea 
                                    name="newValue" 
                                    cols="40" 
                                    rows="5" 
                                    value={healthHistory.newValue}                                     
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                >
                                </textarea>                             
                            </div>
                        </div>               
                    </div>                       

             
            <button 
                type="button" 
                onClick={handleVolver}
                className="rounded-md bg-blue-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" 
            >Volver</button>   
        </div>  
        
        </div>

        

    );
};

export default ViewHistoryChange;