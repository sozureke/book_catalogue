import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './assets/styles/style.scss'
import Layout from './components/layout/Layout'
// import Test from './components/screens/test/Test'
// import Authorization from './components/screens/authorization/Authorization'
import Home from './components/screens/home/Home'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Layout>
        {/* <Test /> */}
        <Home />
        {/* <Authorization /> */}
      </Layout>
    </Router>
  </React.StrictMode>
)
