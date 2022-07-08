import React from 'react'
import ReactDOM  from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { StateProvider } from './Context/StateProvider'
import { reducer } from './Context/reducer'
import { initialState } from './Context/initialState'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
    <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState} >
        <Router>
            <App />
        </Router>
    </StateProvider>
    </React.StrictMode>
)

