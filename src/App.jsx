
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
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
import ViewTenderDetails from './Components/Tender/ViewTenderDetails/ViewTenderDetails';
import PostTender from './Components/Tender/PostTender/PostTender';
import SingleTenderDetails from './Components/Tender/CreateTender/SingleTenderDetails';
import ActiveTender from './Components/Tender/ActiveTender/ActiveTender';
import PublishedTender from './Components/Tender/PublishedTender1/PublishedTender';
import ViewPage from './Components/Tender/PublishedTender/ViewPage';
import ContactUsDetails from './Components/Contact Us/ContactUsDetails';
import PendingTender from './Components/Tender/PendingTender/PendingTender';
import PublishTenderRequest from './Components/Tender/PublishedTender/PublishTenderRequest';
import Profile from './Components/Profile/Header';
import ForgotPassword from './Pages/ForgotPassword';
import Header from './Components/Profile/Header';
import UpdateUser from './Components/User/UpdateUser';
import ResetPassword from './Components/Profile/ResetPassword';
import AllSubscriberList from './Components/Packages/AllSubscriberList';
import SubscriberDetails from './Components/Packages/SubscriberDetails';
import Dashboard from './Dashboard/Dashboard';





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
     <>
   
       <Router>
      
      {!isLoggedIn ? (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <Routes>
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      ) : (
        <>
          <div className="fixed top-0 right-0 z-50 w-full ">
            <Header onLogout={handleLogout} />
          </div>
            <div className="flex mt-28">
            <Navbar onLogout={handleLogout} />
            {/* <div className="flex flex-grow relative"> */}
              <div className="content-container flex-grow p-4 overflow-hidden ">
                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard></Dashboard>
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
                  {/* <Route path="/contact-us" element={<AllContactUs />} /> */}
                  <Route
                    path="/contact-us/:id"
                    element={<ContactUsDetails />}
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
                        <CreateTender></CreateTender>
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
                    path="/viewtenderdetails"
                    element={
                      <ProtectedRoute>
                        <ViewTenderDetails></ViewTenderDetails>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/posttender"
                    element={
                      <ProtectedRoute>
                        <PostTender></PostTender>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    // path="/updateUser/:id"
                    path="/updateUser"
                    element={
                      <ProtectedRoute>
                        <UpdateUser></UpdateUser>
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/reset-password" element={<ResetPassword />} />
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
                    path="/pendingtender"
                    element={
                      <ProtectedRoute>
                        <PendingTender></PendingTender>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/PublishTenderRequest"
                    element={
                      <ProtectedRoute>
                        <PublishTenderRequest></PublishTenderRequest>
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
                    path="/createtenderForm"
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
                        {/* <BackupTenderDetails></BackupTenderDetails> */}
                        <SingleTenderDetails></SingleTenderDetails>
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
                  <Route
                    path="/activetender"
                    element={
                      <ProtectedRoute>
                        <ActiveTender></ActiveTender>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/publishedtender"
                    element={
                      <ProtectedRoute>
                        <PublishedTender></PublishedTender>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/allsubscriberlist"
                    element={
                      <ProtectedRoute>
                        <AllSubscriberList />
                      </ProtectedRoute>
                    }
                  />
                  
                  <Route
                    path="//SubscriberDetails/:id"
                    element={
                      <ProtectedRoute>
                      
                        <SubscriberDetails></SubscriberDetails>
                      </ProtectedRoute>
                    }
                  />
                         
                 
                 

                  <Route
                    path="/publishedtender/:id"
                    element={
                      <ProtectedRoute>
                       
                        <ViewPage></ViewPage>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                  />


                </Routes>
              </div>
            {/* </div> */}
          </div>
        </>
      )}
    </Router>
     </>
   
  );
}

export default App;

