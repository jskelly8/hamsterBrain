// React Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Page imports
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Community from './pages/Community.jsx';
import Error from './pages/Error.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import Login from './pages/Login.jsx';
import Planner from './pages/Planner.jsx';
import Profile from './pages/Profile.jsx';
import SignUp from './pages/SignUp.jsx';
import Tasks from './pages/Tasks.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: 'community', element: <Community /> },
      { path: 'how-it-works', element: <HowItWorks /> },
      { path: 'login', element: <Login /> },
      { path: 'planner', element: <Planner /> },
      { path: 'profile', element: <Profile /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'tasks', element: <Tasks /> },
      { path: '*', element: <Error /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
