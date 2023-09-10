import './index.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import App from './App';
import ReactDOM from 'react-dom/client';
import React from 'react';
import AuthContextProvider from "./context/Auth";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <App/>
        </AuthContextProvider>
    </React.StrictMode>
);
