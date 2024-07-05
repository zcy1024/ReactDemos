import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import router from './router/index.tsx'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
