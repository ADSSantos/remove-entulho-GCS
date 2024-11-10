import React from "react";
import { Provider } from "react-redux";
import Principal from './component/Principal/Principal';
import store from "./store";
import './App.css';


function App() {
  if (!store) {
    console.error('Store não foi inicializada corretamente');
    return null;
  }

  return (
    <Provider store={store}>
      
        <Principal />
       
      
    </Provider>
    
    
  );
  
}

export default App;