import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import FlightList from './components/FlightList';
import FlightTracker from './components/FlightTracker';
import ProtectedRoute from './components/ProtectedRoute';
import SignOutButton from './components/SignOutButton';

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/track' && <SignOutButton />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/flights" element={<FlightList />} />
        <Route
          path="/track"
          element={
            <ProtectedRoute>
              <FlightTracker />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;