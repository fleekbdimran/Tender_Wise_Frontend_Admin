
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import ActiveUser from './Components/Stack-Holder/ActiveUser';
// import AllUsers from './Components/Stack-Holder/AllUsers';
// import Category from './Components/Tender/TenderConfigure/Category';
// import CreateUsers from './Components/User/CreateUser';
// import UserList from './Components/User/UserList';
// import Navbar from './Dashboard/Navbar';
// import LoginPage from './Pages/LoginPage';

// function App() {
//   return (
//     <Router>
        
//       <div className="app-container flex">
      
      
//         {/* Navbar is displayed consistently across all routes */}
//         <Navbar />

//         {/* Main content area to display routed components */}
//         <div className="content-container flex justify-center items-center mx-auto">
//           <Routes>
//             {/* Define routes for each component */}
//             <Route path="/" element={<LoginPage />} />
//             <Route path="/category" element={<Category />} />
//             <Route path="/create-user" element={<CreateUsers />} />
//             <Route path="/user-list" element={<UserList />} />
//             <Route path="/all-users" element={<AllUsers />} />
//             <Route path="/active-user" element={<ActiveUser />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;





import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ActiveUser from './Components/Stack-Holder/ActiveUser';
import AllUsers from './Components/Stack-Holder/AllUsers';
import Category from './Components/Tender/TenderConfigure/Category';
import CreateUsers from './Components/User/CreateUser';
import UserList from './Components/User/UserList';
import Navbar from './Dashboard/Navbar';
import LoginPage from './Pages/LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {/* Check login status to conditionally render login or main dashboard content */}
      {!isLoggedIn ? (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <Routes>
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      ) : (
        <div className="app-container flex">
          {/* Navbar and main routes after successful login */}
          <Navbar />
          <div className="content-container flex justify-center items-center mx-auto">
            <Routes>
              <Route path="/dashboard" element={<h1>Welcome to the Dashboard</h1>} />
              <Route path="/category" element={<Category />} />
              <Route path="/create-user" element={<CreateUsers />} />
              <Route path="/user-list" element={<UserList />} />
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="/active-user" element={<ActiveUser />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;



