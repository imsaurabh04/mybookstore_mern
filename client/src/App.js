import React from 'react'
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import { BrowserRouter } from "react-router-dom";
import { DataProvider } from './GlobalState';

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="max-w-[1280px] min-h-screen mx-auto">
          <Header/>
          <Main />
          <Footer />
        </div>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App