import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'

import Profile from './Components/profile'
import Home from './Components/Home'

const MainContent = () => {

    const location = useLocation()
    const [prevLoc, setPrevLoc] = useState()


    return (
        <>
            <Routes>


            <Route path="/:url*(/+)" element = {<Navigate to = {location.pathname.slice(0, -1)} replace={true}/>} />


<Route  path = '/profile' element={sessionStorage.getItem('token')!==null?<Profile/>:<Navigate to = '/home'/>}>
</Route>


<Route  path = '/home' element={sessionStorage.getItem('token')!==null?<Navigate to = '/profile'/>:<Home/>}>
</Route>


<Route path = '/' element = {sessionStorage.getItem('token')!==null?<Navigate to = '/profile'/>:<Navigate to = '/home'/>}>
</Route>

        </Routes>
        </>
    )

}

export default MainContent