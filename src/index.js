import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

document.addEventListener("keydown", (e) => {
    if(window.getSelection().toString().length > 1) return e.preventDefault();
})