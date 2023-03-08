import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NoPage } from './pages/NoPage';
import { CreateBook } from './pages/CreateBook';
import { GanrePage } from './pages/GanrePage';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./Layout"
import { AuthPage } from './pages/AuthPage';
import { All } from './pages/All';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <All />

    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path='/ganre-page/:ganre' element={<GanrePage />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path='/auth-page' element={<AuthPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter> */}
  </React.StrictMode>
);
