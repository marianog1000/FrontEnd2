import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHealthHistoryById, updateHealthHistory } from '../Services/api';
import { Tabs, Tab } from 'react-bootstrap';
import {enfermedades_concurrentes, sensopersepcion, afectividad, sueno} from '../Constants/Config.js'

const UpdateHealthHistory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [history, setHistory] = useState({
      titulo: '',
      nro_documento: '',
      actitud_psiquica: '',
      actividad: '',
      afectividad: '',
      afiliado_nro: '',
      antecedentes_clinicos_y_quirurgicos: '',
      antecedentes_personales_personalidad_previa_escolaridad: '',
      aspecto_psiquico: '',
      atencion: '',
      conciencia: '',
      contenido_del_pensamiento: '',
      control_esfinteres: '',
      curso_del_pensamiento: '',
      diagnostico_cie10_dsm_iv: '',
      domicilio: '',
      domicilio_parentesco: '',
      edad: '',
      enfermedad_actual: '',
      enfermedades_concurrentes: '',
      esta_tomando_alguna_medicacion: '',
      estado_civil: '',
      evolucion: '',
      familiar_responsable_legal: '',
      fecha_ingreso: '1900-01-01',
      grupo_familiar_actual_antecedentes_familiares_vivienda: '',
      fecha_de_nacimiento: '1900-01-01',
      ideacion: '',
      inteligencia: '',
      juicio: '',
      lenguaje: '',
      memoria: '',
      motivo_de_consulta: '',
      nombre: '',
      obra_social: '',
      ocupacion_actual: '',
      ocupaciones_previas: '',
      orientacion: '',
      parentesco: '',
      sensopersepcion: '',
      sueno: '',
      telefono: '',
      telefono_parentesco: '',
      tipo_consulta: '',
      tratamientos_psiquiatricospsicologicos_previos: ''      
    });
    const [selectedButton, setSelectedButton] = useState('');
    const [errorMessage, setErrorMessage] = useState(""); 

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getHealthHistoryById(id);
                
                console.log("Full API Response:", data); // 🔍 Debugging Step

                if (!data || typeof data !== "object") {
                    console.error("Invalid response format:", data);
                    return;
                }
    
                console.log("contenido_del_pensamiento:", data.contenido_del_pensamiento); // 🔍 Check if it exists
    


                setHistory(data);
            } catch (error) {
                console.error('Error fetching health history:', error);
            }
        };

        fetchHistory();
    }, [id]);

    const handleTabValidationAndSubmit =(e) => {
      const form = e.target.closest("form");        
      
      form.querySelectorAll(".invalid-field").forEach((el) => {
        el.classList.remove("invalid-field");
      });
      
      if (!form.reportValidity()) {
        const invalidFields = form.querySelectorAll(":invalid");
        if (invalidFields.length > 0) {
          const firstInvalid = invalidFields[0];  
          
          invalidFields.forEach((field) => {
            field.classList.add("invalid-field");
          });
          
          const tabPane = firstInvalid.closest(".tab-pane");
          if (tabPane) {
            const tabId = tabPane.id;            
            let tabButton = document.querySelector(`[aria-controls="${tabId}"]`);

            if (tabButton) {
              tabButton.click();
            }
          }            
          firstInvalid.focus();
        }            
        return; 
      }
    }

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      if (type === "checkbox") {

        setHistory((prev) => {

          let propertyToUpdate = null;

          if (enfermedades_concurrentes.some((item) => Object.keys(item)[0] === name)) {
            propertyToUpdate = "enfermedades_concurrentes";
          } else if (sensopersepcion.some((item) => Object.keys(item)[0] === name)) {
            propertyToUpdate = "sensopersepcion";
          } else if (afectividad.some((item) => Object.keys(item)[0] === name)) {
            propertyToUpdate = "afectividad";
          } else if (sueno.some((item) => Object.keys(item)[0] === name)) {
            propertyToUpdate = "sueno";
          }

          if (!propertyToUpdate) return prev;

            let currentValue = prev[propertyToUpdate] || ""; 
            let updatedArray = currentValue ? currentValue.split(",") : [];

            console.log(`Before Update: ${propertyToUpdate} ->`, updatedArray);

            if (checked) {
              if (!updatedArray.some((item) => item === name)) {
                updatedArray.push(name);
              }
            } else {
              updatedArray = updatedArray.filter((item) => item.trim() !== name.trim());
            }
            console.log(`After Update: ${propertyToUpdate} ->`, updatedArray);          
          
          return {
            ...prev,
            [propertyToUpdate]: updatedArray.length > 0 ? updatedArray.join(",") : "",
          };
          
        });
      } else {        
        setHistory((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateHealthHistory(id, history);
            console.log('Registro actualizado:', history);
            navigate('/patients');
        } catch (error) {
            console.error('Error updating record:', error);
        }
    };

    const handleButtonClick = (tipo) => {
      setHistory({ ...history, tipo_consulta: tipo });
      setSelectedButton(tipo);
    };

    const handleCancel = () => {
         navigate(-1);
   };

    return (
      <div>
         <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Nueva Historia Clínica</h1>

            {errorMessage && (
              <div className="bg-red-100 text-red-700 p-2 rounded-md mb-4">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>

            <Tabs defaultActiveKey="datos_personales" id="health-history-tabs" className="mb-3">
              <Tab eventKey="datos_personales" title="Datos Personales">

                  <div className="flex flex-wrap">
                    
                    <div className="w-full md:w-1/2 p-2">
                      <div className="mb-5">
                          <label 
                            htmlFor="base-input" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Tipo de Consulta</label>

                          <button 
                            type="button"
                            className={`rounded-md py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 ${history.tipo_consulta  === 'Urgencia' ? 'bg-red-500 text-white' : 'bg-white-500 text-black'}`}                                
                            onClick={() => handleButtonClick('Urgencia')}
                          >Urgencia</button> 
                          <button        
                            type="button"           
                            className={`rounded-md py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 ${history.tipo_consulta === 'Programada' ? 'bg-blue-500 text-white' : 'bg-white-500 text-black'}`}
                            onClick={() => handleButtonClick('Programada')}
                          >Programada</button> 
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full p-2">
                        <div className="mb-5">
                            <label 
                              htmlFor="titulo" 
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Nombre</label>
                            <input 
                              type="text" 
                              name="titulo" 
                              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              value={history.titulo} onChange={handleChange} required />                            
                        </div>
                    </div> 

                    <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                            <label 
                              htmlFor="base-input" 
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Nro. de Documento</label>
                            <input 
                              type="text" 
                              name="nro_documento" 
                              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              value={history.nro_documento} onChange={handleChange} />                            
                        </div>
                    </div>


                    <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                            <label 
                              htmlFor="fecha_ingreso" 
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Fecha de Ingreso</label>


                            <input 
                              type="date" 
                              name="fecha_ingreso" 
                              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              value={history.fecha_ingreso} onChange={handleChange} 
                            />
                        </div> 
                    </div>

                    <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                            <label 
                              htmlFor="obra_social" 
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Obra Social</label>
                            <input 
                              type="text" 
                              name="obra_social" 
                              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              value={history.obra_social} onChange={handleChange} />                            
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-2">

                        <div className="mb-5">
                            <label 
                              htmlFor="afiliado_nro" 
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Afiliado Nro.</label>
                            <input 
                              type="text" 
                              name="afiliado_nro" 
                              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              value={history.afiliado_nro} onChange={handleChange} />                            
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-2">
                        <div className="mb-5">
                            <label 
                              htmlFor="edad" 
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Edad</label>
                            <input 
                              type="text" 
                              name="edad" 
                              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              value={history.edad} onChange={handleChange} />                            
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-2">   
                        <div className="mb-5">
                            <label 
                              htmlFor="fecha_de_nacimiento" 
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Fecha de Nacimiento</label>
                            <input 
                              type="date" 
                              name="fecha_de_nacimiento" 
                              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              value={history.fecha_de_nacimiento} onChange={handleChange} />                            
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-2">

                        <div className="mb-5">
                            <label 
                              htmlFor="estado_civil" 
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Estado Civil</label>
                            <select 
                              id="estado_civil" 
                              name="estado_civil"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={history.estado_civil || ""}
                              onChange={handleChange}
                            >
                              <option value="">Seleccione</option>
                              <option value="SOLTERO">Soltero</option>
                              <option value="CASADO">Casado</option>
                              <option value="DIVORCIADO">Divorciado</option>
                              <option value="CONCUBINO">Concubino</option>
                              <option value="VIUDO">Viudo</option>
                            </select>
                        </div>
                    </div>

                    <div className="w-full p-2">
                      <div className="mb-5">
                          <label 
                            htmlFor="ocupacion_actual" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Ocupación Actual</label>
                          <input 
                            type="text" 
                            name="ocupacion_actual" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={history.ocupacion_actual} onChange={handleChange} />                            
                      </div>
                      <div className="mb-5">
                          <label 
                            htmlFor="ocupaciones_previas" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Ocupaciones Previas</label>
                          <input 
                            type="text" 
                            name="ocupaciones_previas" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={history.ocupaciones_previas} onChange={handleChange} />                            
                      </div>
                    </div>

                    <div className="w-full md:w-1/2 p-2">
                      <div className="mb-5">
                        <label 
                          htmlFor="domicilio" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Domicilio</label>
                        <input 
                          type="text" 
                          name="domicilio" 
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          value={history.domicilio} onChange={handleChange} />                            
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 p-2">
                      <div className="mb-5">
                          <label 
                            htmlFor="telefono" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Teléfono</label>
                          <input 
                            type="text" 
                            name="telefono" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={history.telefono} onChange={handleChange} />                            
                      </div>
                    </div>
                  
                    <div className="w-full p-2">
                      <div className="mb-5">
                          <label 
                            htmlFor="familiar_responsable_legal" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Familiar Responsable Legal</label>
                          <input 
                            type="text" 
                            name="familiar_responsable_legal" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={history.familiar_responsable_legal} onChange={handleChange} />                            
                      </div>
                      <div className="mb-5">
                          <label 
                            htmlFor="parentesco" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Parentesco</label>
                          <input 
                            type="text" 
                            name="parentesco" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={history.parentesco} onChange={handleChange} />                            
                      </div>
                    </div>

                    <div className="w-full md:w-1/2 p-2">
                      <div className="mb-5">
                        <label 
                          htmlFor="domicilio_parentesco" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Domicilio Parentesco</label>
                        <input 
                          type="text" 
                          name="domicilio_parentesco" 
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          value={history.domicilio_parentesco} onChange={handleChange} />                            
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 p-2">
                      <div className="mb-5">
                          <label 
                            htmlFor="telefono_parentesco" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >Teléfono Parentesco</label>
                          <input 
                            type="text" 
                            name="telefono_parentesco" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={history.telefono_parentesco} onChange={handleChange} />                            
                      </div>
                    </div>
                  </div>


              </Tab>
              <Tab eventKey="antecedentes_examen_fisico" title="Antecedentes y Examen Físico">


                <div className="w-full p-2">
                  <div className="mb-5">
                      <label 
                        htmlFor="motivo_de_consulta" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Motivo de Consulta</label>
                      <textarea 
                        name="motivo_de_consulta" 
                        cols="40" 
                        rows="5" 
                        value={history.motivo_de_consulta} 
                        onChange={handleChange}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      >
                      </textarea>

                  </div>
                  <div className="mb-5">
                      <label 
                        htmlFor="enfermedad_actual" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Enfermedad Actual</label>
                      <textarea 
                        name="enfermedad_actual" 
                        cols="40" 
                        rows="5" 
                        value={history.enfermedad_actual} 
                        onChange={handleChange}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      ></textarea>
                  </div>


                  <div className="mb-5">
                      <label 
                        htmlFor="base-input" 
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
                                checked={history.enfermedades_concurrentes
                                  ? history.enfermedades_concurrentes.split(",").includes(key)
                                  : false
                                }
                                onChange={handleChange}
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
                        htmlFor="antecedentes_clinicos_y_quirurgicos" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Antecedentes Clínicos y Quirúrgicos</label>
                      <input 
                            type="text" 
                            name="antecedentes_clinicos_y_quirurgicos" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={history.antecedentes_clinicos_y_quirurgicos} onChange={handleChange} /> 
                  </div>

                  <div className="mb-5">
                      <label 
                        htmlFor="tratamientos_psiquiatricospsicologicos_previos" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Tratamiento Psicologicos y Psiquiatricos Previos</label>
                      <input 
                        type="text" 
                        name="tratamientos_psiquiatricospsicologicos_previos" 
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        value={history.tratamientos_psiquiatricospsicologicos_previos} onChange={handleChange} /> 
                  </div>
                  <div className="mb-5">
                      <label 
                        htmlFor="esta_tomando_alguna_medicacion" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >¿Está tomando alguna medicación?</label>
                      <input 
                        type="text" 
                        name="esta_tomando_alguna_medicacion" 
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        value={history.esta_tomando_alguna_medicacion} onChange={handleChange} /> 
                  </div>
                </div>

                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                      <label 
                        htmlFor="aspecto_psiquico" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Aspecto Psiquico</label>

                      <select 
                        id="aspecto_psiquico" 
                        name="aspecto_psiquico" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={history.aspecto_psiquico} 
                        onChange={handleChange}
                      >
                        <option value="">Seleccione</option>
                        <option value="NORMAL">Normal</option>
                        <option value="EXCITADO">Excitado</option>
                        <option value="DEPRIMIDO">Deprimido</option>
                        <option value="INDIFERENTE">Indiferente</option>
                        <option value="OBNUBILADO">Obnubilado</option>
                        <option value="FUERA_DE_CONTEXTO">Fuera de Contexto</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                        <label 
                          htmlFor="actitud_psiquica" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Actitud Psiquica</label>

                        <select 
                          id="actitud_psiquica" 
                          name="actitud_psiquica" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={history.actitud_psiquica} 
                          onChange={handleChange}
                        >
                          <option value="">Seleccione</option>
                          <option value="POSITIVA">Positiva</option>
                          <option value="NEGATIVA">Negativa</option>
                          <option value="NO_PARTICIPA">No Participa</option>
                          <option value="RECELOSA">Recelosa</option>
                          <option value="PENOSA">Penosa</option>
                          <option value="INQUIETUD">Inquietud</option>
                          <option value="DESORDENADA">Desordenada</option>
                          <option value="AGRESIVA">Agresiva</option>
                        </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                        <label 
                          htmlFor="actividad" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Actividad</label>

                        <select 
                          id="actividad" 
                          name="actividad" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={history.actividad} 
                          onChange={handleChange}
                        >
                          <option value="">Seleccione</option>
                          <option value="NORMAL">Normal</option>
                          <option value="HIPERBULIA_PRODUCTIVA">Hiperbulia Productiva</option>
                          <option value="HIPERBULIA_IMPRODUCTIVA">Hiperbulia Improductiva</option>
                          <option value="HIPOBULIA">Hipobulia</option>
                          <option value="ABULIA">Abulia</option>
                          <option value="FUGAS">Fugas</option>
                          <option value="POSTRACION">Postración</option>                        
                        </select>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                        <label 
                          htmlFor="orientacion" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Orientación</label>

                        <select 
                          id="orientacion" 
                          name="orientacion" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={history.orientacion} 
                          onChange={handleChange}
                        >
                          <option value="">Seleccione</option>
                          <option value="NORMAL">Normal</option>
                          <option value="DESORIENTACION_AUTOPSIQUICA">Desorientación Autopsíquica</option>
                          <option value="DESORIENTACION_ALOPSIQUICA">Desorientación Alopsíquica</option>
                          <option value="DESORIENTACION_GLOBAL">Desorientación Global</option>
                          <option value="CONTINUA">Continua</option>
                          <option value="EPISODICA">Episódica</option>
                          
                        </select>                      
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                        <label 
                          htmlFor="conciencia" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Conciencia</label>

                        <select 
                          id="conciencia" 
                          name="conciencia" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={history.conciencia} 
                          onChange={handleChange}
                        >
                          <option value="">Seleccione</option>
                          <option value="CONOCE_ENFERMEDAD_Y_SITUACION">Conoce Enfermedad y Situación</option>
                          <option value="NO_CONOCE_ENFERMEDAD">No Conoce Enfermedad</option>
                          <option value="NO_CONOCE_SITUACION">No Conoce Situación</option>
                          <option value="SIN_CONCIENCIA_REALIDAD">Sin conciencia de la Realidad Circundante</option>
                          <option value="OBNUBILADO">Obnubilado</option>
                          <option value="PRECOMA">Precoma</option>
                          <option value="COMA">Coma</option>
                          
                        </select>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                        <label 
                          htmlFor="memoria" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Memoria</label>

                        <select 
                          id="memoria" 
                          name="memoria" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={history.memoria} 
                          onChange={handleChange}
                        >
                          <option value="">Seleccione</option>
                          <option value="NORMAL">Normal</option>
                          <option value="HIPOMNESIA_ANTEROGRADA">Hipomnesia Anterógrada</option>
                          <option value="HIPOMNESIA_RETROGRADA">Hipomnesia Retrógrada</option>
                          <option value="AMNESIA_LACUNARIA">Amnesia Lacunaria</option>
                          <option value="AMNESIA_GLOBAL">Amnesia Global</option>
                          <option value="ILUSIONES_Y_ALUCINACIONES">Ilusiones y Alucinaciones de la Memoria</option>
                          <option value="FALSOS_RECONOCIMIENTOS">Falsos Reconocimientos</option>
                          <option value="MITOMANIA_Y_FABULACION">Mitomanía y Fabulación</option>
                          <option value="PARMNESIAS">Paramnesias</option>
                          <option value="REGRESIONES">Regresiones</option>
                          
                        </select>              
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                        <label 
                          htmlFor="atencion" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Atención</label>

                        <select 
                          id="atencion" 
                          name="atencion" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={history.atencion} 
                          onChange={handleChange}
                        >
                          <option value="">Seleccione</option>
                          <option value="NORMAL">Normal</option>
                          <option value="HIPOPROSEXIA_VOUNTARIA">Hipoprosexia voluntaria</option>
                          <option value="PARAPROXESIA">Paraproxesia</option>
                          <option value="HIPERPROXESIA">Hiperproxesia</option>
                          <option value="DISPERSION_ATENCION">Dispersión de la atención</option>
                          <option value="APROPEXIA">Apropexia</option>
                        </select>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                        <label 
                          htmlFor="ideacion" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Ideación</label>

                        <select 
                          id="ideacion" 
                          name="ideacion" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={history.ideacion} 
                          onChange={handleChange}
                        >
                          <option value="">Seleccione</option>
                          <option value="NORMAL">Normal</option>
                          <option value="ESCEPTICA">Escéptica</option>
                          <option value="PESIMISTA">Pesimista</option>
                          <option value="DECEPCIONADA">Decepcionada</option>
                          <option value="ABANDONO">Abandono_ruina_recriminacion</option>
                          <option value="GRANDEZA">Grandeza(posibles)</option>
                          <option value="MEGALOMANIA">Megalomanía(imposibles)</option>
                          <option value="PERSECUTORIAS">Persecutorias</option>
                          <option value="REFERENCIA">Referencia</option>
                          <option value="OBSESIVAS">Obsesivas-fijas</option>
                          <option value="DELIRANTES">Delirantes</option>
                          
                        </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                        <label 
                          htmlFor="curso_del_pensamiento" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Curso del Pensamiento</label>

                        <select 
                          id="curso_del_pensamiento" 
                          name="curso_del_pensamiento" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={history.curso_del_pensamiento} 
                          onChange={handleChange}
                        >
                          <option value="">Seleccione</option>
                          <option value="NORMAL">Normal</option>
                          <option value="ACELERADO">Acelerado</option>
                          <option value="RETARDADO">Retardado</option>
                          <option value="INTERCEPTADO">Interceptado</option>
                          <option value="DISGREGADO">Disgregado</option>
                        </select>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                        <label 
                          htmlFor="contenido_del_pensamiento" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Contenido del Pensamiento</label>
{console.log("history.contenido_del_pensamiento " + history.contenido_del_pensamiento)}
                        <select 
                          id="contenido_del_pensamiento" 
                          name="contenido_del_pensamiento" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={history.contenido_del_pensamiento} 
                          onChange={handleChange}
                        >
                          <option value="">Seleccione</option>
                          <option value="COHERENTE">Coherente</option>
                          <option value="INCOHERENTE">Incoherente</option>
                          <option value="EXPANSIVO">Expansivo</option>
                          <option value="DEPRESIVO">Depresivo</option>
                          <option value="AUTOELIMINACION">Contenidos de Autoeliminación</option>
                          <option value="DELIRANTE">Delirante</option>
                        </select>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                    <label 
                      htmlFor="base-input" 
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
                              checked={history.sensopersepcion
                                ? history.sensopersepcion.split(",").includes(key)
                                : false
                              }
                              onChange={handleChange}
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
                      htmlFor="base-input" 
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
                                checked={history.afectividad
                                  ? history.afectividad.split(",").includes(key)
                                  : false
                                }
                                onChange={handleChange}
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
                          htmlFor="inteligencia" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Inteligencia</label>

                        <select 
                          id="inteligencia" 
                          name="inteligencia" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={history.inteligencia} 
                          onChange={handleChange}
                        >
                          <option value="">Seleccione</option>
                          <option value="NORMAL">Normal</option>
                          <option value="INFERIOR">Inferior</option>
                          <option value="MARCADO_DEFICIT">Marcado Deficit</option>
                          
                        </select>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                        <label 
                          htmlFor="juicio" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Juicio</label>

                        <select 
                          id="juicio" 
                          name="juicio" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={history.juicio} 
                          onChange={handleChange}
                        >
                          <option value="">Seleccione</option>
                          <option value="NORMAL">Normal</option>
                          <option value="INSUFICIENTE">Insuficiente</option>
                          <option value="DEBILITADO">Debilitado</option>
                          <option value="SUSPENDIDO">Suspendido</option>
                          <option value="CATATIMICO">Catatímico</option>
                          <option value="DESVIACIONES">Desviaciones</option>
                          <option value="PERVERSIONES">Perversiones</option>                        
                        </select>
                    </div>
                  </div>
                </div>


                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                        <label 
                          htmlFor="control_esfinteres" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Control de Esfinteres</label>

                        <select 
                          id="control_esfinteres" 
                          name="control_esfinteres" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={history.control_esfinteres} 
                          onChange={handleChange}
                        >
                          <option value="">Seleccione</option>
                          <option value="NORMAL">Normal</option>
                          <option value="VESICAL">Incontinencia Vesical</option>
                          <option value="RECTAL">Incontinencia Rectal</option>
                          <option value="VESICO_RECTAL">Incontinencia Vésico-Rectal</option>
                          
                        </select>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-2">
                    <div className="mb-5">
                        <label 
                          htmlFor="lenguaje" 
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Lenguaje</label>

                        <select 
                          id="lenguaje" 
                          name="lenguaje" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={history.lenguaje} 
                          onChange={handleChange}
                        >
                          <option value="">Seleccione</option>
                          <option value="NORMAL">Normal</option>
                          <option value="MUTISMO">Mutismo</option>
                          <option value="MUSITACION">Musitación</option>
                          <option value="DISARTRIA">Disartria</option>
                          <option value="TAQUILALIA">Taquilalia</option>
                          <option value="BRADILALIA">Bradilalia</option>
                          <option value="VERBIGERACION">Verbigeración</option>
                          <option value="DISFEMIA">Disfemia</option>
                          <option value="ALTERACIONES_SEMANTICAS">Alteraciones Semánticas</option>
                          <option value="NEOLOGISMOS">Neologismos</option>
                          <option value="JERGONAFASIA">Jergonafasia</option>
                        </select>
                    </div>
                  </div>
                </div>


                <div className="mb-5">
                  <label 
                    htmlFor="base-input" 
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
                                checked={history.sueno
                                  ? history.sueno.split(",").includes(key)
                                  : false
                                }
                                onChange={handleChange}
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
                        htmlFor="diagnostico_cie10_dsm_iv" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Diagnostico CIE10 DSM IV</label>
                      <textarea 
                        name="diagnostico_cie10_dsm_iv" 
                        cols="40" 
                        rows="5" 
                        value={history.diagnostico_cie10_dsm_iv} 
                        onChange={handleChange}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      >
                      </textarea>

                  </div>
                </div>

                <div className="w-full p-2">
                  <div className="mb-5">
                      <label 
                        htmlFor="antecedentes_personales_personalidad_previa_escolaridad" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Antecedentes personales personalidad previa escolaridad</label>
                      <textarea 
                        name="antecedentes_personales_personalidad_previa_escolaridad" 
                        cols="40" 
                        rows="5" 
                        value={history.antecedentes_personales_personalidad_previa_escolaridad} 
                        onChange={handleChange}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      >
                      </textarea>

                  </div>
                </div>

                <div className="w-full p-2">
                  <div className="mb-5">
                      <label 
                        htmlFor="grupo_familiar_actual_antecedentes_familiares_vivienda" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Grupo familiar actual antecedentes familiares vivienda</label>
                      <textarea 
                        name="grupo_familiar_actual_antecedentes_familiares_vivienda" 
                        cols="40" 
                        rows="5" 
                        value={history.grupo_familiar_actual_antecedentes_familiares_vivienda} 
                        onChange={handleChange}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      >
                      </textarea>

                  </div>
                </div>
                <div className="w-full p-2">
                  <div className="mb-5">
                      <label 
                        htmlFor="evolucion" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Evolución</label>
                      <textarea 
                        name="evolucion" 
                        cols="40" 
                        rows="5" 
                        value={history.evolucion} 
                        onChange={handleChange}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      >
                      </textarea>

                  </div>
                </div>

              </Tab>
            </Tabs>

            <button 
              type="submit"                      
              className="rounded-md bg-blue-500 py-2 px-4 border border-transparent text-center text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              onClick={handleTabValidationAndSubmit}

            >Guardar</button>
            <button 
              type="button" 
              className="rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              onClick={handleCancel}
            >Cancelar</button>

            </form>
        </div>
      </div>
    );
};

export default UpdateHealthHistory;