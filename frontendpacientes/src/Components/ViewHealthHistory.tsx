import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getHealthHistoryById } from '../Services/api'; 
import { Tabs, Tab } from 'react-bootstrap';
import {enfermedades_concurrentes, sensopersepcion, afectividad, sueno} from '../Constants/Config.js'

const ViewHealthHistory = () => {
    const { id } = useParams();
    const [healthHistory, setHealthHistory] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHealthHistoryById(id);
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
            <h1 className="text-2xl font-bold mb-4">Visualizar Histórico Clínica</h1>
            <Tabs defaultActiveKey="datps_personales" id="health-history-tabs" className="mb-3">
                <Tab eventKey="datps_personales" title="Datos Personales">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 p-2">
                            <div className="mb-5">                                
                                <label 
                                for="base-input" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Tipo de Consulta</label>

                                <button 
                                type="button"
                                className={`rounded-md py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 ${healthHistory.tipo_consulta  === 'Urgencia' ? 'bg-red-500 text-white' : 'bg-white-500 text-black'}`}                                
                                >Urgencia</button> 
                                <button        
                                type="button"           
                                className={`rounded-md py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 ${healthHistory.tipo_consulta  === 'Programada' ? 'bg-blue-500 text-white' : 'bg-white-500 text-black'}`}                                
                                >Programada</button> 
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap">
                        <div className="w-full p-2">
                            <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Nombre</label>
                                <input 
                                    type="text" 
                                    name="titulo" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.titulo} />                            
                            </div>
                        </div> 

                        
                        <div className="w-full md:w-1/2 p-2">
                            <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Nro. de Documento</label>
                                <input 
                                    type="text" 
                                    name="nro_documento" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.nro_documento} />                            
                            </div>
                        </div>


                        <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                            <label 
                                for="base-input" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Fecha de Ingreso</label>

                            <input 
                                type="date" 
                                name="fecha_ingreso" 
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                value={healthHistory.fecha_ingreso ? healthHistory.fecha_ingreso.split("T")[0] : ""}  
                            />
                        </div> 
                        </div>

                        <div className="w-full md:w-1/2 p-2">
                            <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Obra Social</label>
                                <input 
                                    type="text" 
                                    name="obra_social" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.obra_social} 
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 p-2">

                            <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Afiliado Nro.</label>
                                <input 
                                    type="text" 
                                    name="afiliado_nro" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.afiliado_nro}  />                            
                            </div>
                        </div>


                        <div className="w-full md:w-1/2 p-2">
                            <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Edad</label>
                                <input 
                                    type="text" 
                                    name="edad" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.edad}  />                            
                            </div>                  

                        </div>



                        <div className="w-full md:w-1/2 p-2">   
                            <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Fecha de Nacimiento</label>
                                <input 
                                    type="date" 
                                    name="fecha_de_nacimiento" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'                                        
                                    value={healthHistory.fecha_de_nacimiento ? healthHistory.fecha_de_nacimiento.split("T")[0] : ""}
                                /> 
                            </div>
                        </div>
                        

                        <div className="w-full md:w-1/2 p-2">

                            <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Estado Civil</label>
                                <input 
                                    type="text" 
                                    name="estado_civil" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.estado_civil}  
                                />  
                            </div>
                        </div>


                        <div className="w-full p-2">
                            <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Ocupación Actual</label>
                                <input 
                                    type="text" 
                                    name="ocupacion_actual" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.ocupacion_actual}  
                                />                            
                            </div>
                            <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Ocupaciones Previas</label>
                                <input 
                                    type="text" 
                                    name="ocupaciones_previas" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.ocupaciones_previas} 
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 p-2">
                            <div className="mb-5">
                            <label 
                                for="base-input" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Domicilio</label>
                            <input 
                                type="text" 
                                name="domicilio" 
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                value={healthHistory.domicilio} />                            
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 p-2">
                            <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Teléfono</label>
                                <input 
                                    type="text" 
                                    name="telefono" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.telefono} 
                                />
                            </div>
                        </div>

                        <div className="w-full p-2">
                            <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Familiar Responsable Legal</label>
                                <input 
                                    type="text" 
                                    name="familiar_responsable_legal" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.familiar_responsable_legal}  
                                />
                            </div>
                            <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Parentesco</label>
                                <input 
                                    type="text" 
                                    name="parentesco" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                value={healthHistory.parentesco}  />                            
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 p-2">
                            <div className="mb-5">
                            <label 
                                for="base-input" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Domicilio Parentesco</label>
                            <input 
                                type="text" 
                                name="domicilio_parentesco" 
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                value={healthHistory.domicilio_parentesco} />                            
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 p-2">
                            <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Teléfono Parentesco</label>
                                <input 
                                    type="text" 
                                    name="telefono_parentesco" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.telefono_parentesco}/>                            
                            </div>
                        </div>
                
                    </div>   
                       
                </Tab>
                <Tab eventKey="antecedentes_examen_fisico" title="Antecedentes y Examen Físico">

                    <div className="w-full p-2">
                        <div className="mb-5">
                            <label 
                                for="base-input" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Motivo de Consulta</label>

                            <input  
                                type="text" 
                                name="motivo_de_consulta" 
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                value={healthHistory.motivo_de_consulta}
                            />

                        </div>
                        <div className="mb-5">
                            <label 
                                for="base-input" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Enfermedad Actual</label>                           
                            <textarea 
                                name="enfermedad_actual" 
                                cols="40" 
                                rows="5" 
                                value={healthHistory.enfermedad_actual}                                 
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            >
                            </textarea>
                        </div>


                        <div className="mb-5">
                            <label 
                                for="base-input" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Enfermedades Concurrentes</label>
                            
                            <div className="flex flex-wrap">                    
                                {enfermedades_concurrentes.map((item) => {
                                    const key = Object.keys(item)[0];
                                    const label = item[key];
        
                                    return (
                                    <div key={key} className="flex items-center mr-4 mb-2">
                                    <input
                                        id={`${key}_checkbox`}
                                        type="checkbox"
                                        name={key}                              
                                        checked={healthHistory.enfermedades_concurrentes
                                        ? healthHistory.enfermedades_concurrentes.split(",").includes(key)
                                        : false
                                        }
                                        
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />                            
                                    <label
                                        htmlFor={`${key}_checkbox`}
                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        {label}
                                    </label>
                                    </div>
                                    );
                                })}
                            </div>
                        </div>

                    <div className="mb-5">
                        <label 
                        for="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Antecedentes Clínicos y Quirúrgicos</label>
                        <input 
                            type="text" 
                            name="antecedentes_clinicos_y_quirurgicos" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={healthHistory.antecedentes_clinicos_y_quirurgicos}  /> 
                    </div>

                    <div className="mb-5">
                        <label 
                        for="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Tratamiento Psicologicos y Psiquiatricos Previos</label>
                        <input 
                        type="text" 
                        name="tratamientos_psiquiatricospsicologicos_previos" 
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        value={healthHistory.tratamientos_psiquiatricospsicologicos_previos} /> 
                    </div>
                    <div className="mb-5">
                        <label 
                        for="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >¿Está tomando alguna medicación?</label>
                        <input 
                        type="text" 
                        name="esta_tomando_alguna_medicacion" 
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        value={healthHistory.esta_tomando_alguna_medicacion}  /> 
                    </div>
                    </div>

                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                            <label 
                            for="base-input" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Aspecto Psiquico</label>

                            <input 
                                type="text" 
                                name="aspecto_psiquico" 
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                value={healthHistory.aspecto_psiquico} 
                            />
                        </div>
                        </div>
                        <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Actitud Psiquica</label>

                                <input 
                                    type="text" 
                                    name="actitud_psiquica" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.actitud_psiquica} 
                                />
                        </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Actividad</label>

                                <input 
                                    type="text" 
                                    name="actividad" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.actividad} 
                                />
                        </div>
                        </div>
                        <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Orientación</label>

                                <input 
                                    type="text" 
                                    name="orientacion" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.orientacion} 
                                />
                        </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Conciencia</label>

                                <input 
                                    type="text" 
                                    name="conciencia" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.conciencia} 
                                />
                        </div>
                        </div>

                        <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Memoria</label>

                                <input 
                                    type="text" 
                                    name="memoria" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.memoria} 
                                />
                        </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Atención</label>

                                <input 
                                    type="text" 
                                    name="atencion" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.atencion} 
                                />
                        </div>
                        </div>
                        <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Ideación</label>

                                <input 
                                    type="text" 
                                    name="ideacion" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.ideacion} 
                                />
                        </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Curso del Pensamiento</label>

                                <input 
                                    type="text" 
                                    name="curso_del_pensamiento" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.curso_del_pensamiento} 
                                />
                        </div>
                        </div>
                        <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Contenido del Pensamiento</label>

                                <input 
                                    type="text" 
                                    name="contenido_del_pensamiento" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.contenido_del_pensamiento} 
                                />
                        </div>
                        </div>
                    </div>

                    
                    <div className="mb-5">
                        <label 
                        for="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Sensopersepción</label>

                        <div className="flex flex-wrap">
                            {sensopersepcion.map((item) => {
                                const key = Object.keys(item)[0];
                                const label = item[key];
    
                                return (
                                <div key={key} className="flex items-center mr-4 mb-2">
                                <input
                                    id={`${key}_checkbox`}
                                    type="checkbox"
                                    name={key}                              
                                    checked={healthHistory.sensopersepcion
                                    ? healthHistory.sensopersepcion.split(",").includes(key)
                                    : false
                                    }
                                    
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />                            
                                <label
                                    htmlFor={`${key}_checkbox`}
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {label}
                                </label>
                                </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mb-5">
                        <label 
                        for="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Afectividad</label>

                        <div className="flex flex-wrap">
                            {afectividad.map((item) => {
                                const key = Object.keys(item)[0];
                                const label = item[key];
    
                                return (
                                <div key={key} className="flex items-center mr-4 mb-2">
                                <input
                                    id={`${key}_checkbox`}
                                    type="checkbox"
                                    name={key}                              
                                    checked={healthHistory.afectividad
                                    ? healthHistory.afectividad.split(",").includes(key)
                                    : false
                                    }
                                    
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />                            
                                <label
                                    htmlFor={`${key}_checkbox`}
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {label}
                                </label>
                                </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Inteligencia</label>

                                <input 
                                    type="text" 
                                    name="inteligencia" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.inteligencia} 
                                />
                        </div>
                        </div>
                        <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Juicio</label>

                                <input 
                                    type="text" 
                                    name="juicio" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.juicio} 
                                />
                        </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Control de Esfinteres</label>

                                <input 
                                    type="text" 
                                    name="control_esfinteres" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.control_esfinteres} 
                                />
                        </div>
                        </div>
                        <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                                <label 
                                    for="base-input" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Lenguaje</label>

                                <input 
                                    type="text" 
                                    name="lenguaje" 
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={healthHistory.lenguaje} 
                                />
                        </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label 
                        for="base-input" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Sueño</label>

                        <div className="flex flex-wrap">
                            {sueno.map((item) => {
                                const key = Object.keys(item)[0];
                                const label = item[key];
    
                                return (
                                <div key={key} className="flex items-center mr-4 mb-2">
                                <input
                                    id={`${key}_checkbox`}
                                    type="checkbox"
                                    name={key}                              
                                    checked={healthHistory.sueno
                                    ? healthHistory.sueno.split(",").includes(key)
                                    : false
                                    }
                                    
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />                            
                                <label
                                    htmlFor={`${key}_checkbox`}
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {label}
                                </label>
                                </div>
                                );
                            })}
                        </div>
                    </div>   
                </Tab>
                   <Tab eventKey="diagnostico_tratamiento" title="Diagnóstico y Tratamiento">                
                
                        <div className="w-full p-2">
                        <div className="mb-5">
                            <label 
                                htmlFor="base-input" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Diagnostico CIE10 DSM IV</label>
                            <textarea 
                                name="diagnostico_cie10_dsm_iv" 
                                cols="40" 
                                rows="5" 
                                value={healthHistory.diagnostico_cie10_dsm_iv}                                 
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            >
                            </textarea>
        
                        </div>
                        </div>
        
                        <div className="w-full p-2">
                        <div className="mb-5">
                            <label 
                                htmlFor="base-input" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Antecedentes personales personalidad previa escolaridad</label>
                            <textarea 
                                name="antecedentes_personales_personalidad_previa_escolaridad" 
                                cols="40" 
                                rows="5" 
                                value={healthHistory.antecedentes_personales_personalidad_previa_escolaridad}                                 
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            >
                            </textarea>
        
                        </div>
                        </div>
        
                        <div className="w-full p-2">
                        <div className="mb-5">
                            <label 
                                htmlFor="base-input" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Grupo familiar actual antecedentes familiares vivienda</label>
                            <textarea 
                                name="grupo_familiar_actual_antecedentes_familiares_vivienda" 
                                cols="40" 
                                rows="5" 
                                value={healthHistory.grupo_familiar_actual_antecedentes_familiares_vivienda} 
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            >
                            </textarea>
        
                        </div>
                        </div>
                        <div className="w-full p-2">
                        <div className="mb-5">
                            <label 
                                htmlFor="base-input" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Evolución</label>
                            <textarea 
                                name="evolucion" 
                                cols="40" 
                                rows="5" 
                                value={healthHistory.evolucion}                                 
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            >
                            </textarea>
        
                        </div>
                        </div>        
                    </Tab>
            </Tabs>
             
            <button 
                type="button" 
                onClick={handleVolver}
                className="rounded-md bg-blue-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" 
            >Volver</button>   
        </div>  
        
        </div>

        

    );
};

export default ViewHealthHistory;