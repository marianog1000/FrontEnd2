import { SetStateAction, useEffect, useState } from 'react';
import { getHealthHistoryChanges } from '../Services/api'; 
import { useNavigate } from 'react-router-dom';
import { historyChange } from '../Types/types';


const HealthHistoryChange = () => {
    const [healthHistoryChanges, setHealthHistoryChanges] = useState<historyChange[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const recordsPerPage = 20;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHealthHistoryChanges();
                    
                setHealthHistoryChanges(data);
            } catch (error) {
                console.error('Error fetching health history changes:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const filteredRecords = healthHistoryChanges.filter((history) => {
        const searchTermLower = searchTerm.toLowerCase();

        console.log("searchTermLower" + searchTermLower);

        return (
            history.id.toString().includes(searchTermLower) ||
            history.healthHistoryId.toString().includes(searchTermLower) ||
            history.changeDate.toLowerCase().includes(searchTermLower)
        );
    });

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

    console.log('Search term:', searchTerm);
    console.log('Filtered records:', filteredRecords);

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

    const handleView = (id : number) => {
        navigate(`/viewHistory/${id}`);
    };

    const handlePatientGrid = () => {
        navigate(`/patients/`);
    };

    

    return (
<div className="container mx-auto p-4">
            
            <h1 className="text-2xl font-bold mb-4">Cambios Históricos</h1>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar por ID, HealthHistoryId o Fecha"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="flex-grow p-2 border border-gray-300 rounded mr-2"
                />
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => handlePatientGrid()}
                >
                    Volver a Historias Clinicas
                </button>
            </div>


            <div className="container">            
            <ul className="responsive-table">
                <li className="table-header">
                <div className="col col-1">ID</div>
                <div className="col col-2">HealthHistoryId</div>
                <div className="col col-3">Fecha</div>
                <div className="col col-3">Acciones</div>
                
                </li>
                {currentRecords.map((change) => (
                    <li className="table-row" key={change.id}>
                    <div className="col col-1" data-label="Id">{change.id}</div>
                    <div className="col col-2" data-label="HealthHistoryId">{change.healthHistoryId}</div>
                    <div className="col col-3" data-label="Fecha">{change.changeDate}</div>
                    <div className="col col-4" data-label="Acciones">                        
                        <button
                            type="button"
                            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                            onClick={() => handleView(change.id)}
                        >
                            Ver
                        </button>
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
    </div>










        // <div className="container mx-auto p-4">
        //     <h1 className="text-2xl font-bold mb-4">Cambios en la Historia Clínica</h1>
        //     <table className="min-w-full bg-white">
        //         <thead>
        //             <tr>
        //                 <th className="py-2 px-4 border-b">ID</th>                        
        //                 <th className="py-2 px-4 border-b">HealthHistoryId</th>
        //                 <th className="py-2 px-4 border-b">Fecha</th>
                        
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {healthHistoryChanges.map((change) => (
        //                 <tr key={change.id}>
        //                     <td className="py-2 px-4 border-b">{change.id}</td>
        //                     <td className="py-2 px-4 border-b">{change.HealthHistoryId}</td>
        //                     <td className="py-2 px-4 border-b">{change.date}</td>            
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        // </div>
    );
};

export default HealthHistoryChange;