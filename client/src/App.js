import {useState, useEffect} from 'react'
import axios from 'axios'
import MainContent from './MainContent/MainContent';
import {useLocation} from 'react-router-dom'
import HashLoader from "react-spinners/HashLoader"

function App() {
  useEffect(()=> {
    setLoading(true)
    setTimeout(()=> {
      setLoading(false)
    },4000)
  },[])
  const [loading, setLoading] = useState(false)

  return (
    <div className="App">
        

          {!loading?<>
          <div class = 'relative block overflow-hidden -mb-[18px]'>
          <MainContent/>
          </div>
          </>:

          <div class = 'bg-gradient-to-br sm:pl-1 pl-2.5 sm:pt-0 pt-3 from-red-100 to-orange-100 h-screen w-screen'>
                    
                      <div 
      class = ' w-[127px]   m-0 relative mx-auto top-[48%]  sm:left-[1.5px]  translate-y-[-50%]  pl-4'>
                      

                      <HashLoader
                      size = {90}
                      loading= {true}
                      color= {'#ff0000'}/>
             
                  </div>
                  </div>
               } 


    </div>
  );
}

export default App;
