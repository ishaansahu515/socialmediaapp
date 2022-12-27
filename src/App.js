import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import LeftBar from './components/leftbar/LeftBar';
import RightBar from './components/rightbar/RightBar';
import Profile from './pages/profile/Profile'
import "./style.scss";
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


function App() {

const {currentUser} = useContext(AuthContext);
 
const { darkMode } = useContext(DarkModeContext);
 
const queryClient = new QueryClient();

  const Layout = () => {

    return (
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
      </QueryClientProvider>
    )
  };

  const ProtectedUser = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <ProtectedUser>
          <Layout />
        </ProtectedUser>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
