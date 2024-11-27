import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ActiveUser from './Components/Stack-Holder/ActiveUser';
import AllUsers from './Components/Stack-Holder/AllUsers';
import Category from './Components/Tender/TenderConfigure/Category';
import CreateUsers from './Components/User/CreateUser';
import UserList from './Components/User/UserList';
import Navbar from './Dashboard/Navbar';
import LoginPage from './Pages/LoginPage';
import Sector from './Components/Tender/TenderConfigure/Sector';
import SubSector from './Components/Tender/TenderConfigure/SubSector';
import Department from './Components/Tender/TenderConfigure/Department';
import SubDepartment from './Components/Tender/TenderConfigure/SubDepartment';
import Division from './Components/Tender/TenderConfigure/Division';
import Upazila from './Components/Tender/TenderConfigure/Upazila';
import District from './Components/Tender/TenderConfigure/District';
import Source from './Components/Tender/TenderConfigure/Source';
import CreateTender from './Components/Tender/CreateTender/CreateTender';
import CreatePackage from './Components/Subscription/CreatePackage';
import ActivePackage from './Components/Subscription/ActivePackage';
import AllPackageList from './Components/Subscription/AllPackageList';
import InActiveUser from './Components/Stack-Holder/InActiveUser';
import AllContactUs from './Components/Contact Us/AllContactUs';
import AllPublishTender from './Components/Tender/PublishedTender/AllPublishTender';
import PendingPublishTender from './Components/Tender/PublishedTender/PendingPublishTender';
import TenderDetails from './Components/Tender/CreateTender/TenderDetails';
import CreateTenderForm from './Components/Tender/CreateTender/CreateTenderForm';
import BackupTenderDetails from './Components/Tender/CreateTender/BackupTenderDetails';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" replace />;
  };

  return (
    <Router>
      {!isLoggedIn ? (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <Routes>
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      ) : (
        <div className="app-container flex min-h-screen">
          <Navbar onLogout={handleLogout} />
          <div className="content-container flex-grow p-4 overflow-hidden">
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <div className="flex justify-center items-center h-full">
                      <h1 className="text-4xl font-bold text-center text-gray-800">
                        Welcome to the Dashboard
                      </h1>
                    </div>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/pendingpublishtender"
                element={
                  <ProtectedRoute>
                    <PendingPublishTender></PendingPublishTender>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/allpublishedtender"
                element={
                  <ProtectedRoute>
                    <AllPublishTender></AllPublishTender>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/allcontactlist"
                element={
                  <ProtectedRoute>
                    <AllContactUs></AllContactUs>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/inactive-user"
                element={
                  <ProtectedRoute>
                    <InActiveUser></InActiveUser>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/allpackagelist"
                element={
                  <ProtectedRoute>
                    <AllPackageList></AllPackageList>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/activepackage"
                element={
                  <ProtectedRoute>
                    <ActivePackage></ActivePackage>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/createpackage"
                element={
                  <ProtectedRoute>
                    <CreatePackage></CreatePackage>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/createtender"
                element={
                  <ProtectedRoute>
                    <CreateTenderForm></CreateTenderForm>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tenderList"
                element={
                  <ProtectedRoute>
                    <CreateTender></CreateTender>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tenderDetails/:id"
                element={
                  <ProtectedRoute>
                    {/* <TenderDetails></TenderDetails> */}
                    <BackupTenderDetails></BackupTenderDetails>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/source"
                element={
                  <ProtectedRoute>
                    <Source></Source>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/district"
                element={
                  <ProtectedRoute>
                    <District></District>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upazila"
                element={
                  <ProtectedRoute>
                    <Upazila></Upazila>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/division"
                element={
                  <ProtectedRoute>
                    <Division></Division>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subdepartment"
                element={
                  <ProtectedRoute>
                    <SubDepartment></SubDepartment>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/department"
                element={
                  <ProtectedRoute>
                    <Department></Department>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/category"
                element={
                  <ProtectedRoute>
                    <Category />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sector"
                element={
                  <ProtectedRoute>
                    <Sector />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subSector"
                element={
                  <ProtectedRoute>
                    <SubSector />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-user"
                element={
                  <ProtectedRoute>
                    <CreateUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-list"
                element={
                  <ProtectedRoute>
                    <UserList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/all-users"
                element={
                  <ProtectedRoute>
                    <AllUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/active-user"
                element={
                  <ProtectedRoute>
                    <ActiveUser />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;



