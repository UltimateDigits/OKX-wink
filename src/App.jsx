import React from 'react'
import './App.css'
import Hero from './components/Hero';
import ConfirmTransaction from './components/ConfirmTransaction';


function App() {
  

  return (
    <>
      <div className="h-screen font-custom flex justify-center items-center ">
        {/* <ConfirmTransaction/> */}
        <Hero/>
      </div>
    </>
  );
}

export default App
