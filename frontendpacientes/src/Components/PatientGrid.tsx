import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { getHealthHistories, deleteHealthHistory } from '../Services/api';
import '../Styles/PatientGrid.css';
//import jsPDF from 'jspdf';
//import 'jspdf-autotable';

Modal.setAppElement('#root');

const PatientGrid = () => {
    const [healthHistories, setHealthHistories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const recordsPerPage = 20;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHealthHistories();                
                setHealthHistories(data);
            } catch (error) {
                console.error('Error fetching health histories:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const filteredRecords = healthHistories.filter((history) =>
        history.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        history.nro_documento.toString().includes(searchTerm)
    );
    
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleAdd = () => {     
        navigate('/add');
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleView = (id) => {
        navigate(`/view/${id}`);
    };

    const handleHistory = () => {
        navigate(`/healthhistorychange/`);
    };

    const openModal = (id) => {  
        if (!modalIsOpen) {
            setSelectedId(id);
            setModalIsOpen(true);
        }
    };

     const closeModal = () => {        
        setSelectedId(null);
        setModalIsOpen(false);
    };

    const handleDelete = async () => {
        try {
            console.log('HandleDelete ');

            await deleteHealthHistory(selectedId);
            setHealthHistories(healthHistories.filter(history => history.id !== selectedId));
            console.log(`Registro con ID: ${selectedId} eliminado`);
            setConfirmationMessage(`Registro con ID: ${selectedId} eliminado correctamente.`);
            setTimeout(() => {
                setConfirmationMessage('');
            }, 5000); 
            closeModal();
        } catch (error) {
            console.error('Error deleting health history:', error);
        }
    };

    // const handleExportPDF = (id) => {
    //     const history = healthHistories.find(history => history.id === id);
    //     if (!history) return;

    //     const doc = new jsPDF();
    //     doc.text('Historia Clínica', 20, 10);
    //     doc.autoTable({
    //         head: [['Campo', 'Valor']],
    //         body: [
    //             ['ID', history.id],
    //             ['Título', history.titulo],
    //             ['Nro. de Documento', history.nro_documento],
    //             ['Descripción', history.descripcion],
    //             // Agrega otros campos necesarios aquí
    //         ],
    //     });
    //     doc.save(`historia_clinica_${id}.pdf`);
    // };
    
    return (
        <div className="container mx-auto p-4">
            
            <h1 className="text-2xl font-bold mb-4">Pacientes</h1>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar por DNI o Título"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="flex-grow p-2 border border-gray-300 rounded mr-2"
                />
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={handleAdd}
                >
                    Agregar
                </button>
                <button
                    type="button"
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                    onClick={handleHistory}
                >
                    Histórico
                </button>
            </div>

            
            {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}            

            <div className="container mx-auto p-4">            
            <ul className="responsive-table">
                <li className="table-header">
                <div className="col col-1">Legajo</div>
                <div className="col col-2">Nombre</div>
                <div className="col col-3">DNI</div>
                <div className="col col-4 col-wide">Acciones</div>
                </li>
                {currentRecords.map((history) => (
                    <li className="table-row" key={history.id}>
                    <div className="col col-1" data-label="Legajo">{history.id}</div>
                    <div className="col col-2" data-label="Titulo">{history.titulo}</div>
                    <div className="col col-3" data-label="Nro. de Documento">{history.nro_documento}</div>
                    <div className="col col-4 col-wide" data-label="Acciones">                    
                        <button 
                            className="rounded-md bg-blue-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            onClick={() => handleView(history.id)}
                        >Ver</button> 
                        <button 
                            className="rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" 
                            onClick={() => handleEdit(history.id)}
                        >Modificar</button>
                        <button 
                            className="rounded-md bg-green-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" 
                            onClick={() => openModal(history.id)}
                        >Eliminar</button>
                        {/* <button className="text-purple-500 hover:text-purple-700 ml-2" onClick={() => handleExportPDF(history.id)}>Exportar PDF</button> */}
                    </div> 
                    </li>
            ))}
            </ul>
            </div>

            <div className="pagination">
            
                <button 
                    onClick={handlePreviousPage} disabled={currentPage === 1}
                    className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    Previous
                </button>
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    <span>Page {currentPage} of {totalPages}</span>
                </p>
                <button 
                    onClick={handleNextPage} disabled={currentPage === totalPages}
                    className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    Next
                </button>
            
            </div>

            {modalIsOpen && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Confirm Delete"
                    className="modal1"
                    overlayClassName="overlay1"
                >
                    <h2>Confirmar Eliminación</h2>
                    <p>¿Estás seguro de que deseas eliminar esta historia clínica?</p>
                    <button 
                        className="rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" 
                        onClick={handleDelete}>Sí, eliminar</button>
                    <button 
                        className="rounded-md bg-green-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" 
                        onClick={closeModal}>Cancelar</button>
                </Modal>
            )}
        </div>
    );
};

export default PatientGrid;