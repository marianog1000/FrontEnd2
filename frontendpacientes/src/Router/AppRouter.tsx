import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PatientGrid from '../Components/PatientGrid';
import AddHealthHistory from '../Components/AddHealthHistory';
import UpdateHealthHistory from '../Components/UpdateHealthHistoy';
import ViewHealthHistory from '../Components/ViewHealthHistory';
import ViewHistoryChange from '../Components/ViewHistoryChange';
import Register from '../Components/Register';
import Login from '../Components/Login';
import HealthHistoryChange from '../Components/HealthHistoryChange';
import '../App.css';


const AppRouter = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      const authStatus = localStorage.getItem('isAuthenticated');
      if (authStatus === 'true') {
          setIsAuthenticated(true);
      }
  }, []);

  
    return (
        <Router>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/register" element={<Register />} />
               <Route
                    path="/login"
                    element={
                        isAuthenticated ? <PatientGrid /> : <Navigate to="/" />
                    }
                />

               <Route
                    path="/healthhistorychange"
                    element={
                        isAuthenticated ? <HealthHistoryChange /> : <Navigate to="/" />
                    }
                />
              <Route
                    path="/viewHistory/:id"
                    element={
                        isAuthenticated ? <ViewHistoryChange /> : <Navigate to="/" />
                    }
              />  
              <Route
                    path="/view/:id"
                    element={
                        isAuthenticated ? <ViewHealthHistory /> : <Navigate to="/" />
                    }
              />  
              <Route path="/patients" element={<PatientGrid />} />
              <Route path="/add" element={<AddHealthHistory />} />
              <Route path="/edit/:id" element={<UpdateHealthHistory />} />
            </Routes>
          </header>
        </div>
      </Router>
    );
};

export default AppRouter;