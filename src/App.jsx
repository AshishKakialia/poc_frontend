import React from 'react'
import Main from './components/Main';
import History from './components/History';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import Layout from './Layout';
const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Main/>} />
          <Route path='/history' element={<History />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App;