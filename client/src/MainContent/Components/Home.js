
import {useState} from 'react'
import axios from 'axios'
import {Routes, Route, useNavigate , useLocation} from 'react-router-dom'


const Home = () =>  {

    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState({
        user: '',
        password: ''
    })

    const [error,setError] = useState()

    const handleChange = (e) => {
        setUser({
          ...user,
          [e.target.name]: e.target.value
        })
      }

      const history = useNavigate()


      const handleSubmit = (e) => {
        e.preventDefault()
        setError()
        setLoading(true)
      axios.post(process.env.NODE_ENV ==='production'?'https://bloodbank-virat.herokuapp.com/api/user/login':'http://localhost:4000/api/user/login',user).then(res=> {
      sessionStorage.setItem('token',true)
        history('/profile')
        setLoading(false)
      }).catch(err=> {
        console.log(err)
        setError(err.response&&err.response.data)
        setLoading(false)
      })
      }


    return (
        <>

        <div class = 'w-screen h-screen bg-cover ' style = {{'backgroundImage':`url('${'https://t3.ftcdn.net/jpg/03/05/91/60/360_F_305916083_lqhFBnqqxbxhUwLHP71xa054osV1I12u.jpg'}')`}} >
             <form class="top-48 bg-white  px-8 py-20 pb-24 shadow-xl border-2 border-gray-500 w-[500px] block mx-auto space-y-6  relative" onSubmit={handleSubmit}>
                
       <h2 class="mt-0 sm:left-0 left-[2.5px]  -top-2 relative text-center md:text-4xl sm:text-3xl mb-10 text-3xl font-extrabold text-gray-900">
        Sign in to <br/>your account
      </h2>

      <input class="text-md" type="hidden" name="remember"  id = 'remember'/>
      <div class="rounded-md sm:shadow-sm relative sm:mb-0 sm:w-full max-w-[320px] sm:right-1  mx-auto -mb-4 block -space-y-px ">
      {error==='Incorrect User'?<p class="text-red-500 text-center text-md relative bottom-3 underline mt-4 pt-3 pb-2 mb-2">Login Failed: Incorrect User</p>:error==='Incorrect password'?<p class="text-red-500 underline text-center text-md relative bottom-3 mt-4 pt-3 pb-2 mb-2">Login Failed: Incorrect Password</p>:''
}
        <div>
          <label for="email-address" class="sr-only">Username</label>
          <input id="email-address" name="user" type="text" onChange = {handleChange} value = {user.user}  required class={`appearance-none rounded-none ${error==='User not found'?'bg-orange-100 text-orange-300 border-orange-300 border-2':'border-gray-300'} relative block sm:w-full sm:shadow-none shadow-sm w-[86%] sm:right-0 right-[1px] mx-auto px-2 py-1 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-lg`} placeholder="Email address"/>
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" type="password" onChange = {handleChange} value = {user.password} required class={`${error==='Incorrect password'?'bg-orange-100 text-orange-300 border-orange-300 border-2':'border-gray-300'} appearance-none rounded-none sm:shadow-none shadow-sm relative block sm:w-full w-[86%] sm:right-0 right-[1px] mx-auto px-2 mb-12 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-lg`} placeholder="Password"/>
        </div>
      </div>

      <div>
        <button type="submit" class="mt-5 block  top-3  -mb-2 group relative sm:left-0 left-[3px]  w-[250px] mx-auto sm:right-0 right-[2px] flex justify-center py-3 pb-3.5 px-6 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-blue-600 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </span>
          Sign in
        </button>

      </div>
    </form>
    </div>
        </>
    )
}

export default Home