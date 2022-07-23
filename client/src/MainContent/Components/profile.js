import {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Profile = () => {

    const [optionSelected, setOptionSelected] = useState('location')
    const [searchType, setSearchType] = useState()
    const [allDonors, setAllDonors] = useState()
    const [shownDonors, setShownDonors] = useState()

    const history = useNavigate()

    const [donor, setDonor] = useState({
        name: '',
        location: '',
        age: null,
        bloodtype: 'A+'
    })

    const [submitted, setSubmitted] = useState(false)
    const deleteDonor = (name)=> {
        setAllDonors(allDonors.filter(don=>don.name!==name))
        subSearchHandlerFin()
        axios.post(process.env.NODE_ENV ==='production'?'https://bloodbank-virat.herokuapp.com/api/user/deleteDonor':'http://localhost:4000/api/user/deleteDonor',{name}).then(res=> {
            axios.post(process.env.NODE_ENV ==='production'?'https://bloodbank-virat.herokuapp.com/api/user/getDonors':'http://localhost:4000/api/user/getDonors', {}).then(res=> {
        let currentDonors = []
        
        for(let i = 0; i< allDonors.filter(don=>don.name!==name).length; i++){
         
            if(searchType==='name'){
                if(allDonors.filter(don=>don.name!==name)[i].name.toLowerCase().includes(searchTerm.toLowerCase())){
                    currentDonors.push(allDonors.filter(don=>don.name!==name)[i])
                }
            }else if(searchType==='location'){
                if(allDonors.filter(don=>don.name!==name)[i].location.toLowerCase().includes(searchTerm.toLowerCase())){
                    currentDonors.push(allDonors.filter(don=>don.name!==name)[i])
                }
            }else if(searchType==='bloodtype'){
                if(allDonors.filter(don=>don.name!==name)[i].bloodtype.toLowerCase()===(searchTerm.toLowerCase())){
                    currentDonors.push(allDonors.filter(don=>don.name!==name)[i])
                }
            }
        }
        setAllDonors(res.data.filter(don=>don.name!==name))
        setShownDonors(currentDonors)
            }).catch(err=> {
                console.log(err)
              })
    }).catch(err=> {
        console.log(err)
      })
    }


    const [searchTerm, setSearchTerm] = useState('')

    const changeAddHandler = (e)=> {
        setDonor({
            ...donor, 
            [e.target.name]:e.target.value
        })
        console.log(donor)
    }

    const subSearchHandle = (e) => {
        setSearchTerm(e.target.value.trim())
    }
    const [selectedStockType, setSelectedStockType] = useState('A+')
    const changeStockHandlerType = (e) => {
        setSelectedStockType(e.target.value)
    }
    const [selectedStockNum, setSelectedStockNum] = useState()
    const changeStockHandlerNum = (e) => {
        setSelectedStockNum(e.target.value)
    }

    const subSearchHandlerFin = () => {
        let currentDonors = []
        console.log(searchType)
        console.log(searchTerm)
        for(let i = 0; i< allDonors.length; i++){
         
            if(searchType==='name'){
                if(allDonors[i].name.toLowerCase().includes(searchTerm.toLowerCase())){
                    currentDonors.push(allDonors[i])
                }
            }else if(searchType==='location'){
                if(allDonors[i].location.toLowerCase().includes(searchTerm.toLowerCase())){
                    currentDonors.push(allDonors[i])
                }
            }else if(searchType==='bloodtype'){
                if(allDonors[i].bloodtype.toLowerCase()===(searchTerm.toLowerCase())){
                    currentDonors.push(allDonors[i])
                }
            }
        }
        setShownDonors(currentDonors)
    }
    const [currentStock, setCurrentStock] = useState()

    useEffect(()=> {
        axios.post(process.env.NODE_ENV ==='production'?'https://bloodbank-virat.herokuapp.com/api/user/getDonors':'http://localhost:4000/api/user/getDonors', {}).then(res=> {
            setAllDonors(res.data)
            setCurrentStock(res.data[0].stock)
            console.log(res.data[0].stock)
                }).catch(err=> {
                    console.log(err)
                  })
                  setShownDonors([])
                  setSubmitted(false)
                  setSearchType('location')
    },[optionSelected])

    const subHandle = () => {
        axios.post(process.env.NODE_ENV ==='production'?'https://bloodbank-virat.herokuapp.com/api/user/addDonor':'http://localhost:4000/api/user/addDonor',donor).then(res=> {
            axios.post(process.env.NODE_ENV ==='production'?'https://bloodbank-virat.herokuapp.com/api/user/getDonors':'http://localhost:4000/api/user/getDonors', {}).then(res=> {
        setAllDonors(res.data)
            }).catch(err=> {
                console.log(err)
              })
    }).catch(err=> {
        console.log(err)
      })
    }

    return (
        <>
            <div class=" relative mb-10 pb-8 pt-8 bg-gradient-to-br from-red-700 to-red-900 block mx-auto text-center shadow-lg ">
   <a onClick={()=> {
    setOptionSelected('add')
   }} class={`
      py-[10px]
      sm:py-3
      px-[12px]
      sm:px-6
      inline-flex cursor-pointer
      items-center
      justify-center
      font-semibold
      border 
      text-center  text-base
      
      transition-all

      hover:bg-orange-700  hover:border-orange-700
      ${optionSelected === 'add'?'bg-orange-500 text-white hover:text-white':'hover:text-white bg-white text-black'}

      rounded-l-lg
      `}>
      <span class="pr-2">
         <svg width="15" height="15" viewBox="0 0 15 15" class="fill-current">
            <path d="M7.5 8.53125C9.42187 8.53125 10.9922 6.96094 10.9922 5.03906C10.9922 3.11719 9.42187 1.52344 7.5 1.52344C5.57812 1.52344 4.00781 3.09375 4.00781 5.01562C4.00781 6.9375 5.57812 8.53125 7.5 8.53125ZM7.5 2.34375C8.97656 2.34375 10.1719 3.53906 10.1719 5.01562C10.1719 6.49219 8.97656 7.6875 7.5 7.6875C6.02344 7.6875 4.82812 6.49219 4.82812 5.01562C4.82812 3.5625 6.02344 2.34375 7.5 2.34375Z"></path>
            <path d="M14.555 12.75C12.6097 11.0859 10.1019 10.1719 7.50034 10.1719C4.89878 10.1719 2.39096 11.0859 0.445651 12.75C0.258151 12.8906 0.234714 13.1484 0.398776 13.3359C0.539401 13.5 0.797214 13.5234 0.984714 13.3828C2.7894 11.8594 5.10971 11.0156 7.52378 11.0156C9.93784 11.0156 12.2582 11.8594 14.0628 13.3828C14.1332 13.4531 14.2269 13.4766 14.3207 13.4766C14.4378 13.4766 14.555 13.4297 14.6253 13.3359C14.766 13.1484 14.7425 12.8906 14.555 12.75Z"></path>
         </svg>
      </span>
      Add Donor
   </a>
   <a onClick={()=> {
    setOptionSelected('search')
   }}  class={`
      py-[10px]
      sm:py-3
      px-[12px]
      sm:px-6
      inline-flex
      items-center
      justify-center
      font-semibold
      border-y border-light
      text-center  text-sm
      sm:text-base
      transition-all cursor-pointer
      hover:bg-orange-700  hover:border-orange-700
      ${optionSelected === 'search'?'bg-orange-500 text-white hover:text-white':'hover:text-white bg-white text-black' }

      `}>
      <span class="pr-2">
         <svg width="15" height="15" viewBox="0 0 15 15" class="fill-current">
            <path d="M7.17188 4.40625H3.23438C3 4.40625 2.8125 4.59375 2.8125 4.82813C2.8125 5.0625 3 5.25 3.23438 5.25H7.17188C7.40625 5.25 7.59375 5.0625 7.59375 4.82813C7.59375 4.59375 7.38281 4.40625 7.17188 4.40625Z"></path>
            <path d="M3.23438 7.07813H5.03906C5.27344 7.07813 5.46094 6.89063 5.46094 6.65625C5.46094 6.42187 5.27344 6.23438 5.03906 6.23438H3.23438C3 6.23438 2.8125 6.42187 2.8125 6.65625C2.8125 6.89063 3 7.07813 3.23438 7.07813Z"></path>
            <path d="M6.25781 8.10938H3.21094C2.97656 8.10938 2.78906 8.29688 2.78906 8.53125C2.78906 8.76563 2.97656 8.95313 3.21094 8.95313H6.25781C6.49219 8.95313 6.67969 8.76563 6.67969 8.53125C6.67969 8.29688 6.49219 8.10938 6.25781 8.10938Z"></path>
            <path d="M11.3447 4.05468C10.8056 3.98437 10.3134 4.24218 10.0556 4.71093C9.9384 4.92187 10.0322 5.15625 10.2197 5.27343C10.4306 5.39062 10.665 5.29687 10.7822 5.10937C10.8759 4.94531 11.0634 4.85156 11.2509 4.875C11.4618 4.89843 11.6259 5.0625 11.6493 5.25C11.6728 5.4375 11.579 5.60156 11.415 5.67187C11.0634 5.83593 10.8056 6.25781 10.8056 6.65625V6.96093C10.8056 7.19531 10.9931 7.38281 11.2275 7.38281C11.4618 7.38281 11.6493 7.19531 11.6493 6.96093V6.65625C11.6493 6.58593 11.7431 6.44531 11.8134 6.42187C12.2822 6.1875 12.5634 5.69531 12.4931 5.15625C12.3993 4.57031 11.9306 4.125 11.3447 4.05468Z"></path>
            <path d="M11.2031 8.17969C10.8516 8.17969 10.5938 8.46094 10.5938 8.78906C10.5938 9.14062 10.875 9.39844 11.2031 9.39844C11.5547 9.39844 11.8125 9.11719 11.8125 8.78906C11.8359 8.46094 11.5547 8.17969 11.2031 8.17969Z"></path>
            <path d="M12.9609 2.20312H2.03906C1.07813 2.20312 0.304688 2.97656 0.304688 3.9375V11.7422C0.304688 12.1172 0.492188 12.4453 0.820313 12.6328C0.984375 12.7266 1.14844 12.7734 1.33594 12.7734C1.52344 12.7734 1.6875 12.7266 1.85156 12.6328L4.57031 11.0625C4.59375 11.0391 4.64063 11.0391 4.66406 11.0391H12.9844C13.9453 11.0391 14.7188 10.2656 14.7188 9.30469V3.96094C14.7188 3 13.9219 2.20312 12.9609 2.20312ZM13.8984 9.32812C13.8984 9.84375 13.4766 10.2422 12.9844 10.2422H4.64063C4.45313 10.2422 4.28906 10.2891 4.125 10.3828L1.42969 11.9531C1.33594 12 1.24219 11.9766 1.21875 11.9531C1.19531 11.9297 1.125 11.8828 1.125 11.7656V3.96094C1.125 3.44531 1.54688 3.04688 2.03906 3.04688H12.9609C13.4766 3.04688 13.875 3.46875 13.875 3.96094V9.32812H13.8984Z"></path>
         </svg>
      </span>
      Search Donor
   </a>
   <a onClick={()=> {
    setOptionSelected('delete')
   }}  class={`
      py-[10px]
      sm:py-3
      px-[12px]
      sm:px-6
      inline-flex
      items-center
      justify-center
      font-semibold
      border-l cursor-pointer
      border-y border-light
      text-center  text-sm
      sm:text-base
      transition-all
      hover:bg-orange-700  hover:border-orange-700
      ${optionSelected === 'delete'?'bg-orange-500 text-white hover:text-white':' text-black bg-white hover:text-white'}
      `}>
      <span class="pr-2">
         <svg width="15" height="15" viewBox="0 0 15 15" class="fill-current">
            <path d="M7.17188 4.40625H3.23438C3 4.40625 2.8125 4.59375 2.8125 4.82813C2.8125 5.0625 3 5.25 3.23438 5.25H7.17188C7.40625 5.25 7.59375 5.0625 7.59375 4.82813C7.59375 4.59375 7.38281 4.40625 7.17188 4.40625Z"></path>
            <path d="M3.23438 7.07813H5.03906C5.27344 7.07813 5.46094 6.89063 5.46094 6.65625C5.46094 6.42187 5.27344 6.23438 5.03906 6.23438H3.23438C3 6.23438 2.8125 6.42187 2.8125 6.65625C2.8125 6.89063 3 7.07813 3.23438 7.07813Z"></path>
            <path d="M6.25781 8.10938H3.21094C2.97656 8.10938 2.78906 8.29688 2.78906 8.53125C2.78906 8.76563 2.97656 8.95313 3.21094 8.95313H6.25781C6.49219 8.95313 6.67969 8.76563 6.67969 8.53125C6.67969 8.29688 6.49219 8.10938 6.25781 8.10938Z"></path>
            <path d="M11.3447 4.05468C10.8056 3.98437 10.3134 4.24218 10.0556 4.71093C9.9384 4.92187 10.0322 5.15625 10.2197 5.27343C10.4306 5.39062 10.665 5.29687 10.7822 5.10937C10.8759 4.94531 11.0634 4.85156 11.2509 4.875C11.4618 4.89843 11.6259 5.0625 11.6493 5.25C11.6728 5.4375 11.579 5.60156 11.415 5.67187C11.0634 5.83593 10.8056 6.25781 10.8056 6.65625V6.96093C10.8056 7.19531 10.9931 7.38281 11.2275 7.38281C11.4618 7.38281 11.6493 7.19531 11.6493 6.96093V6.65625C11.6493 6.58593 11.7431 6.44531 11.8134 6.42187C12.2822 6.1875 12.5634 5.69531 12.4931 5.15625C12.3993 4.57031 11.9306 4.125 11.3447 4.05468Z"></path>
            <path d="M11.2031 8.17969C10.8516 8.17969 10.5938 8.46094 10.5938 8.78906C10.5938 9.14062 10.875 9.39844 11.2031 9.39844C11.5547 9.39844 11.8125 9.11719 11.8125 8.78906C11.8359 8.46094 11.5547 8.17969 11.2031 8.17969Z"></path>
            <path d="M12.9609 2.20312H2.03906C1.07813 2.20312 0.304688 2.97656 0.304688 3.9375V11.7422C0.304688 12.1172 0.492188 12.4453 0.820313 12.6328C0.984375 12.7266 1.14844 12.7734 1.33594 12.7734C1.52344 12.7734 1.6875 12.7266 1.85156 12.6328L4.57031 11.0625C4.59375 11.0391 4.64063 11.0391 4.66406 11.0391H12.9844C13.9453 11.0391 14.7188 10.2656 14.7188 9.30469V3.96094C14.7188 3 13.9219 2.20312 12.9609 2.20312ZM13.8984 9.32812C13.8984 9.84375 13.4766 10.2422 12.9844 10.2422H4.64063C4.45313 10.2422 4.28906 10.2891 4.125 10.3828L1.42969 11.9531C1.33594 12 1.24219 11.9766 1.21875 11.9531C1.19531 11.9297 1.125 11.8828 1.125 11.7656V3.96094C1.125 3.44531 1.54688 3.04688 2.03906 3.04688H12.9609C13.4766 3.04688 13.875 3.46875 13.875 3.96094V9.32812H13.8984Z"></path>
         </svg>
      </span>
      Delete Donor
   </a>

   <a onClick={()=> {
    setOptionSelected('stock')
   }}  class={`
      py-[10px]
      sm:py-3
      px-[12px]
      sm:px-6
      inline-flex
      items-center
      justify-center cursor-pointer
      font-semibold
      border-l
      border-y border-light
      text-center  text-sm
      sm:text-base
      transition-all
      hover:bg-orange-700  hover:border-orange-700
      ${optionSelected === 'stock'?'bg-orange-500 text-white hover:text-white':'text-black bg-white hover:text-white'}

      `}>
      <span class="pr-2">
         <svg width="15" height="15" viewBox="0 0 15 15" class="fill-current">
            <path d="M7.17188 4.40625H3.23438C3 4.40625 2.8125 4.59375 2.8125 4.82813C2.8125 5.0625 3 5.25 3.23438 5.25H7.17188C7.40625 5.25 7.59375 5.0625 7.59375 4.82813C7.59375 4.59375 7.38281 4.40625 7.17188 4.40625Z"></path>
            <path d="M3.23438 7.07813H5.03906C5.27344 7.07813 5.46094 6.89063 5.46094 6.65625C5.46094 6.42187 5.27344 6.23438 5.03906 6.23438H3.23438C3 6.23438 2.8125 6.42187 2.8125 6.65625C2.8125 6.89063 3 7.07813 3.23438 7.07813Z"></path>
            <path d="M6.25781 8.10938H3.21094C2.97656 8.10938 2.78906 8.29688 2.78906 8.53125C2.78906 8.76563 2.97656 8.95313 3.21094 8.95313H6.25781C6.49219 8.95313 6.67969 8.76563 6.67969 8.53125C6.67969 8.29688 6.49219 8.10938 6.25781 8.10938Z"></path>
            <path d="M11.3447 4.05468C10.8056 3.98437 10.3134 4.24218 10.0556 4.71093C9.9384 4.92187 10.0322 5.15625 10.2197 5.27343C10.4306 5.39062 10.665 5.29687 10.7822 5.10937C10.8759 4.94531 11.0634 4.85156 11.2509 4.875C11.4618 4.89843 11.6259 5.0625 11.6493 5.25C11.6728 5.4375 11.579 5.60156 11.415 5.67187C11.0634 5.83593 10.8056 6.25781 10.8056 6.65625V6.96093C10.8056 7.19531 10.9931 7.38281 11.2275 7.38281C11.4618 7.38281 11.6493 7.19531 11.6493 6.96093V6.65625C11.6493 6.58593 11.7431 6.44531 11.8134 6.42187C12.2822 6.1875 12.5634 5.69531 12.4931 5.15625C12.3993 4.57031 11.9306 4.125 11.3447 4.05468Z"></path>
            <path d="M11.2031 8.17969C10.8516 8.17969 10.5938 8.46094 10.5938 8.78906C10.5938 9.14062 10.875 9.39844 11.2031 9.39844C11.5547 9.39844 11.8125 9.11719 11.8125 8.78906C11.8359 8.46094 11.5547 8.17969 11.2031 8.17969Z"></path>
            <path d="M12.9609 2.20312H2.03906C1.07813 2.20312 0.304688 2.97656 0.304688 3.9375V11.7422C0.304688 12.1172 0.492188 12.4453 0.820313 12.6328C0.984375 12.7266 1.14844 12.7734 1.33594 12.7734C1.52344 12.7734 1.6875 12.7266 1.85156 12.6328L4.57031 11.0625C4.59375 11.0391 4.64063 11.0391 4.66406 11.0391H12.9844C13.9453 11.0391 14.7188 10.2656 14.7188 9.30469V3.96094C14.7188 3 13.9219 2.20312 12.9609 2.20312ZM13.8984 9.32812C13.8984 9.84375 13.4766 10.2422 12.9844 10.2422H4.64063C4.45313 10.2422 4.28906 10.2891 4.125 10.3828L1.42969 11.9531C1.33594 12 1.24219 11.9766 1.21875 11.9531C1.19531 11.9297 1.125 11.8828 1.125 11.7656V3.96094C1.125 3.44531 1.54688 3.04688 2.03906 3.04688H12.9609C13.4766 3.04688 13.875 3.46875 13.875 3.96094V9.32812H13.8984Z"></path>
         </svg>
      </span>
      Stock
   </a>
   <a onClick={()=> {
    setOptionSelected('exit')
    history('/home')
    sessionStorage.removeItem('token')
   }} class={`
      py-[10px]
      sm:py-3
      px-[12px]
      sm:px-6
      cursor-pointer
      inline-flex
      items-center
      justify-center
      font-semibold
      border border-light
      text-center  text-sm
      sm:text-base
      transition-all
      hover:bg-orange-700  hover:border-orange-700
      ${optionSelected === 'exit'?'bg-orange-500 text-white hover:text-white':'text-black bg-white hover:text-white'}

      rounded-r-lg
      `}>
      <span class="pr-2">
         <svg width="15" height="15" viewBox="0 0 15 15" class="fill-current">
            <path d="M12.5391 0.28125H11.3438C10.4063 0.28125 9.63281 1.05469 9.63281 1.99219V11.3906C9.63281 11.4609 9.65625 11.5313 9.70313 11.6016L11.4141 14.4141C11.5313 14.6016 11.7422 14.7188 11.9766 14.7188C12.2109 14.7188 12.4219 14.6016 12.5391 14.4141L14.25 11.6016C14.2969 11.5313 14.3203 11.4609 14.3203 11.3906V1.99219C14.25 1.05469 13.4766 0.28125 12.5391 0.28125ZM11.3438 1.10156H12.5391C13.0312 1.10156 13.4297 1.5 13.4297 1.99219V2.78906H10.4531V1.99219C10.4531 1.5 10.8516 1.10156 11.3438 1.10156ZM11.9297 13.7344L10.4297 11.2734V3.60938H13.4062V11.2734L11.9297 13.7344Z"></path>
            <path d="M5.27344 0.304688H2.10938C1.35938 0.304688 0.75 0.914063 0.75 1.66406V13.3594C0.75 14.1094 1.35938 14.7188 2.10938 14.7188H5.27344C6.02344 14.7188 6.63281 14.1094 6.63281 13.3594V1.66406C6.60938 0.914063 6 0.304688 5.27344 0.304688ZM5.78906 13.3359C5.78906 13.6172 5.55469 13.875 5.25 13.875H2.10938C1.82813 13.875 1.57031 13.6406 1.57031 13.3359V12.3047C1.59375 12.3047 1.64062 12.3281 1.6875 12.3281H3.42188C3.65625 12.3281 3.84375 12.1406 3.84375 11.9063C3.84375 11.6719 3.65625 11.4844 3.42188 11.4844H1.6875C1.64062 11.4844 1.61719 11.4844 1.57031 11.5078V10.0078C1.59375 10.0078 1.64062 10.0313 1.6875 10.0313H2.20312C2.4375 10.0313 2.625 9.84375 2.625 9.60938C2.625 9.375 2.4375 9.1875 2.20312 9.1875H1.6875C1.64062 9.1875 1.61719 9.1875 1.57031 9.21094V7.73438C1.59375 7.73438 1.64062 7.75781 1.6875 7.75781H3.42188C3.65625 7.75781 3.84375 7.57031 3.84375 7.33594C3.84375 7.10156 3.65625 6.91406 3.42188 6.91406H1.6875C1.64062 6.91406 1.61719 6.91406 1.57031 6.9375V5.4375C1.59375 5.4375 1.64062 5.46094 1.6875 5.46094H2.20312C2.4375 5.46094 2.625 5.27344 2.625 5.03906C2.625 4.80469 2.4375 4.61719 2.20312 4.61719H1.6875C1.64062 4.61719 1.61719 4.61719 1.57031 4.64063V3.14063C1.59375 3.14063 1.64062 3.16406 1.6875 3.16406H3.42188C3.65625 3.16406 3.84375 2.97656 3.84375 2.74219C3.84375 2.50781 3.65625 2.34375 3.42188 2.34375H1.6875C1.64062 2.34375 1.61719 2.34375 1.57031 2.36719V1.66406C1.57031 1.38281 1.80469 1.125 2.10938 1.125H5.27344C5.55469 1.125 5.8125 1.35938 5.8125 1.66406V13.3359H5.78906Z"></path>
         </svg>
      </span>
      Exit
   </a>
</div>



{
    optionSelected === 'add'?

    <>
<div class ='h-screen w-screen bg-cover -mt-10 pt-12' style = {{'backgroundImage':"url('https://post.healthline.com/wp-content/uploads/2020/09/Blood_Donation-732X549-thumbnail.jpg')"}}>
    
    <div class = 'h-fit w-fit p-8 bg-white shadow-md pb-16 bg-opacity-90 -mb-64 block mx-auto'>
    <h1 class = 'relative  mb-12 text-center text-4xl'>Add Donor</h1>
    <div class="flex flex-wrap -mx-4 px-20">
   <div class="w-full md:w-1/2 lg:w-1/3 px-4">
      <div class="mb-12">
         <label for="" class="font-medium text-base text-black block mb-3">
        Name
         </label>
         <input type="text" required onChange = {changeAddHandler} placeholder="Full Name" name = 'name' class="
            w-full
            border-[1.5px] border-form-stroke
            rounded-lg
            py-3
            px-5
            font-medium
            text-body-color
            placeholder-body-color
            outline-none
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default
            "/>
      </div>
   </div>
   <div class="w-full md:w-1/2 lg:w-1/3 px-4">
      <div class="mb-12">
         <label for="" class="font-medium text-base text-black block mb-3">
         Location
         </label>
         <input type="text" required name='location' onChange = {changeAddHandler} placeholder="Location Details" class="
            w-full
            border-[1.5px] border-primary
            rounded-lg
            py-3
            px-5
            font-medium
            text-body-color
            placeholder-body-color
            outline-none
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default
            "/>
      </div>
   </div>
   <div class="w-full md:w-1/2 lg:w-1/3 px-4">
      <div class="mb-12">
         <label for="" class="font-medium text-base text-black block mb-3">
         Age
         </label>
         <input type="number" required name = 'age' onChange = {changeAddHandler} min = {18} placeholder="Age"  class="
            w-full
            border-[1.5px] border-form-stroke
            rounded-lg
            py-3
            px-5
            font-medium
            text-body-color
            placeholder-body-color
            outline-none
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default
            "/>
      </div>
   </div>



   <div class="flex flex-wrap mx-auto ">
   <div class="w-[400px] ">
      <div class="mb-12">
         <label for="" class="font-medium text-base text-black block mb-3">
         Blood Type
         </label>
         <div class="relative">
            <select name = 'bloodtype' required onChange = {changeAddHandler} required class="
               w-full
               border-[1.5px] border-form-stroke
               rounded-lg
               py-3
               px-5
               font-medium
               text-body-color
               outline-none
               focus:border-primary
               active:border-primary
               transition
               disabled:bg-[#F5F7FD] disabled:cursor-default
               appearance-none
               ">
                               <option value={null} disabled defaultChecked>Select Blood Type</option>
               <option value="A+">A+</option>
               <option value="A-">A-</option>
               <option value="B+">B+</option>
               <option value="B-">B-</option>
               <option value="AB+">AB+</option>
               <option value="AB-">AB-</option>
               <option value="O+">O+</option>
               <option value="O-">O-</option>            </select>
            <span class="
               absolute
               right-4
               top-1/2
               -translate-y-1/2
               mt-[-2px]
               w-[10px]
               h-[10px]
               border-r-2 border-b-2 border-body-color
               rotate-45
               ">
            </span>
         </div>
      </div>
   </div>
</div>



</div>

<a onClick = {()=> {
    subHandle()
    setSubmitted(true)
}
} class="
   py-4
   px-3
   mt-7
   relative top-3
   mx-auto block
   items-center
   justify-center
   text-center text-white text-base
   bg-blue-700 w-[400px] rounded-lg shadow-md
   hover:bg-opacity-90
   cursor-pointer


   font-normal
   ">
Submit Details
</a>


{
    submitted?
    <h1 class = 'uppercase text-center text-3xl text-green-700 relative mt-16'>Submitted</h1>
    :''
}
</div>
</div>
    </> :
    
    optionSelected === 'search'?

    <>

<div class ={`${shownDonors.length>0?`h-[${shownDonors.length*70 + 690}px]`:'h-screen'} w-screen bg-cover -mt-10 pt-12`} style = {{'backgroundImage':"url('https://post.healthline.com/wp-content/uploads/2020/09/Blood_Donation-732X549-thumbnail.jpg')"}}>
    
    <div class = {` ${shownDonors.length>0?`h-fit`:'h-fit'} w-[90%] p-8 px-14 bg-white shadow-md pb-16 bg-opacity-90 -mb-72 block mx-auto`}>

<h1 class = ' mb-16 text-center text-4xl'>Search Donor</h1>
<h2 class = ' mb-6 text-center text-2xl'>Select Search Type:</h2>

<div class="block mx-auto text-center mb-7 rounded-lg">
   <a onClick = {()=> {
    setSearchType('location')
   }} class={`
      py-[10px]
      sm:py-3
      px-[12px]
      sm:px-6
      inline-flex
      items-center
      justify-center
      font-semibold
      border border-primary
      text-center  text-base
      transition-all
      hover:bg-blue-500 hover:text-white hover:border-primary
      rounded-l-lg
      cursor-pointer
      ${searchType === 'location'?'bg-blue-500 text-white':'text-black'}

      `}>
   Location
   </a>
   <a  onClick = {()=> {
    setSearchType('name')
   }} class={`
      py-[10px]
      sm:py-3
      px-[12px]
      sm:px-6
      inline-flex
      items-center
      justify-center       cursor-pointer

      font-semibold
      border-y border-light
      text-center  text-sm
      sm:text-base
      transition-all
      hover:bg-blue-500 hover:text-white hover:border-primary
      ${searchType === 'name'?'bg-blue-500 text-white':'text-black'}

      `}>
   Name
   </a>
   <a  onClick = {()=> {
    setSearchType('bloodtype')
   }} class={`
      py-[10px]       cursor-pointer

      sm:py-3
      px-[12px]
      sm:px-6
      inline-flex
      items-center
      justify-center
      font-semibold
      border border-light
      text-center  text-sm
      sm:text-base
      transition-all
      hover:bg-blue-500 hover:text-white hover:border-primary
      rounded-r-lg
      ${searchType === 'bloodtype'?'bg-blue-500 text-white':'text-black'}
      `}>
   Blood Type
   </a>
</div>


{
    searchType === 'name'?
    <>
      <div class="w-full md:w-1/2 mx-auto block mt-4 mb-2 lg:w-1/3 px-4">
      <div class="mb-12">
         <label for="" class="font-medium text-base text-black block mb-3">
         Name
         </label>
         <input type="text" required onChange={subSearchHandle} placeholder="Enter Name"  class="
            w-full
            border-[1.5px] border-form-stroke
            rounded-lg
            py-3
            px-5
            font-medium
            text-body-color
            placeholder-body-color
            outline-none
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default
            "/>
      </div>
   </div>
    
    <a onClick = {()=> {
    subSearchHandlerFin()
}
} class="
   py-4
   px-3
   mt-12
   mx-auto block relative
   items-center
   justify-center
   text-center text-white text-lg
   bg-blue-700 w-[400px] rounded-lg shadow-md
   hover:bg-opacity-90
   cursor-pointer
   font-normal uppercase
   
   ">
Search Donor
</a>
    </>:
    searchType === 'location'?
    <>
    <div class="w-full md:w-1/2 mx-auto block mt-4 mb-2 lg:w-1/3 px-4">
      <div class="mb-12">
         <label for="" class="font-medium text-base text-black block mb-3">
         Location
         </label>
         <input type="text" required onChange={subSearchHandle} placeholder="Enter Location"  class="
            w-full
            border-[1.5px] border-form-stroke
            rounded-lg
            py-3
            px-5
            font-medium
            text-body-color
            placeholder-body-color
            outline-none
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default
            "/>
      </div>
   </div>
    
    <a onClick = {()=> {
    subSearchHandlerFin()
}
} class="
   py-4
   px-3
   mt-12
   mx-auto block relative
   items-center
   justify-center
   text-center text-white text-lg
   bg-blue-700 w-[400px] rounded-lg shadow-md
   hover:bg-opacity-90
   cursor-pointer
   font-normal uppercase
   
   ">
Search Donor
</a>
    </>:
    searchType === 'bloodtype'?
    <>
    
    <div class="w-full md:w-1/2 mx-auto block mt-4 mb-2 lg:w-1/3 px-4">
      <div class="mb-12">
         <label for=""   class="font-medium text-base text-black block mb-3">
         Blood Type
         </label>
         <select required onChange={subSearchHandle} class="
               w-full
               border-[1.5px] border-form-stroke
               rounded-lg
               py-3
               px-5
               font-medium
               text-body-color
               outline-none
               focus:border-primary
               active:border-primary
               transition
               disabled:bg-[#F5F7FD] disabled:cursor-default
               appearance-none
               ">
                               <option value="" disabled defaultChecked>Select Blood Type</option>
               <option value="A+">A+</option>
               <option value="A-">A-</option>
               <option value="B+">B+</option>
               <option value="B-">B-</option>
               <option value="AB+">AB+</option>
               <option value="AB-">AB-</option>
               <option value="O+">O+</option>
               <option value="O-">O-</option>            </select>
      </div>
   </div>

   
    <a onClick = {()=> {
    subSearchHandlerFin()
}
} class="
   py-4
   px-3
   mt-12
   mx-auto block relative
   items-center
   justify-center
   text-center text-white text-lg
   bg-blue-700 w-[400px] rounded-lg shadow-md
   hover:bg-opacity-90
   cursor-pointer
   font-normal uppercase
   
   ">
Search Donor
</a>
    
    </>


    :''
}

{
    shownDonors.length!==0?


<section class="mx-auto -mt-14 -mb-8 block text-center py-20 right-1 lg:py-[120px]">
   <div class="container  mx-auto block text-center">
      <div class="flex flex-wrap  mx-auto block text-center ">
         <div class="w-full px-4  mx-auto block text-center">
            <div class="max-w-full overflow-x-auto">
               <table class="table-auto w-full">
                  <thead>
                     <tr class="bg-blue-700 text-center">
                        <th
                           class="
                           w-2/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-l border-transparent
                           "
                           >
                           Name
                        </th>
                        <th
                           class="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                           >
                           Age
                        </th>
                        <th
                           class="
                           w-2/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                           >
                           Location
                        </th>
                        <th
                           class="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                           >
                          Blood Type
                        </th>
                        
                     </tr>
                  </thead>
                  <tbody>
                     
                    {
                       shownDonors.map(donor=> {

                            return (

                                <tr>
                        <td
                           class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-l border-[#E8E8E8]
                           "
                           >
                           {donor.name}
                        </td>
                      
                        <td
                           class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           "
                           >
                           {donor.age}
                        </td>
                        <td
                           class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-[#E8E8E8]
                           "
                           >
                           {donor.location}
                        </td>
                        <td
                           class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           "
                           >
                           {donor.bloodtype}
                        </td>
                       
                        
                     </tr>


                            )
                        })
                    }
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   </div>
</section>



    :

    <h1 class = 'relative mt-24 uppercase text-xl mx-auto block text-center'>No Results Shown</h1>
}
</div> </div>

    
    </> : 
 optionSelected === 'delete'?

 <>

<div class ={`${shownDonors.length>0?`h-[${shownDonors.length*80 + 715}px]`:'h-screen'} w-screen bg-cover -mt-10 pt-12`} style = {{'backgroundImage':"url('https://post.healthline.com/wp-content/uploads/2020/09/Blood_Donation-732X549-thumbnail.jpg')"}}>
    
    <div class = {` ${shownDonors.length>0?`h-fit`:'h-fit'} w-[90%] p-8 px-14 bg-white shadow-md pb-16 bg-opacity-90 -mb-72 block mx-auto`}>

 <h1 class = ' mb-16 text-center text-4xl'>Delete Donor</h1>
 <h2 class = ' mb-6 text-center text-2xl'>Select Search Type:</h2>
 
 <div class="block mx-auto text-center mb-7 rounded-lg">
    <a onClick = {()=> {
     setSearchType('location')
    }} class={`
       py-[10px]
       sm:py-3
       px-[12px]
       sm:px-6
       inline-flex
       items-center
       justify-center
       font-semibold
       border border-primary
       text-center  text-base
       transition-all
       hover:bg-blue-500 hover:text-white hover:border-primary
       rounded-l-lg
       cursor-pointer
       ${searchType === 'location'?'bg-blue-500 text-white':'text-black'}
 
       `}>
    Location
    </a>
    <a  onClick = {()=> {
     setSearchType('name')
    }} class={`
       py-[10px]
       sm:py-3
       px-[12px]
       sm:px-6
       inline-flex
       items-center
       justify-center       cursor-pointer
 
       font-semibold
       border-y border-light
       text-center  text-sm
       sm:text-base
       transition-all
       hover:bg-blue-500 hover:text-white hover:border-primary
       ${searchType === 'name'?'bg-blue-500 text-white':'text-black'}
 
       `}>
    Name
    </a>
    <a  onClick = {()=> {
     setSearchType('bloodtype')
    }} class={`
       py-[10px]       cursor-pointer
 
       sm:py-3
       px-[12px]
       sm:px-6
       inline-flex
       items-center
       justify-center
       font-semibold
       border border-light
       text-center  text-sm
       sm:text-base
       transition-all
       hover:bg-blue-500 hover:text-white hover:border-primary
       rounded-r-lg
       ${searchType === 'bloodtype'?'bg-blue-500 text-white':'text-black'}
       `}>
    Blood Type
    </a>
 </div>
 
 
 {
     searchType === 'name'?
     <>
       <div class="w-full md:w-1/2 mx-auto block mt-4 mb-2 lg:w-1/3 px-4">
       <div class="mb-12">
          <label for="" class="font-medium text-base text-black block mb-3">
          Name
          </label>
          <input type="text" onChange={subSearchHandle} placeholder="Enter Name"  class="
             w-full
             border-[1.5px] border-form-stroke
             rounded-lg
             py-3
             px-5
             font-medium
             text-body-color
             placeholder-body-color
             outline-none
             focus:border-primary
             active:border-primary
             transition
             disabled:bg-[#F5F7FD] disabled:cursor-default
             "/>
       </div>
    </div>
     
     <a onClick = {()=> {
     subSearchHandlerFin()
 }
 } class="
    py-4
    px-3
    mt-12
    mx-auto block relative
    items-center
    justify-center
    text-center text-white text-lg
    bg-blue-700 w-[400px] rounded-lg shadow-md
    hover:bg-opacity-90
    cursor-pointer
    font-normal uppercase
    
    ">
 Submit
 </a>
     </>:
     searchType === 'location'?
     <>
     <div class="w-full md:w-1/2 mx-auto block mt-4 mb-2 lg:w-1/3 px-4">
       <div class="mb-12">
          <label for="" class="font-medium text-base text-black block mb-3">
          Location
          </label>
          <input type="text" onChange={subSearchHandle} placeholder="Enter Location"  class="
             w-full
             border-[1.5px] border-form-stroke
             rounded-lg
             py-3
             px-5
             font-medium
             text-body-color
             placeholder-body-color
             outline-none
             focus:border-primary
             active:border-primary
             transition
             disabled:bg-[#F5F7FD] disabled:cursor-default
             "/>
       </div>
    </div>
     
     <a onClick = {()=> {
     subSearchHandlerFin()
 }
 } class="
    py-4
    px-3
    mt-12
    mx-auto block relative
    items-center
    justify-center
    text-center text-white text-lg
    bg-blue-700 w-[400px] rounded-lg shadow-md
    hover:bg-opacity-90
    cursor-pointer
    font-normal uppercase
    
    ">
 Submit
 </a>
     </>:
     searchType === 'bloodtype'?
     <>
     
     <div class="w-full md:w-1/2 mx-auto block mt-4 mb-2 lg:w-1/3 px-4">
       <div class="mb-12">
          <label for="" class="font-medium text-base text-black block mb-3">
          Blood Type
          </label>
          <select onChange={subSearchHandle} class="
                w-full
                border-[1.5px] border-form-stroke
                rounded-lg
                py-3
                px-5
                font-medium
                text-body-color
                outline-none
                focus:border-primary
                active:border-primary
                transition
                disabled:bg-[#F5F7FD] disabled:cursor-default
                appearance-none
                ">
                                <option value="" disabled defaultChecked>Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>            </select>
       </div>
    </div>
 
    
     <a onClick = {()=> {
          subSearchHandlerFin()

 }
 } class="
    py-4
    px-3
    mt-12
    mx-auto block relative
    items-center
    justify-center
    text-center text-white text-lg
    bg-blue-700 w-[400px] rounded-lg shadow-md
    hover:bg-opacity-90
    cursor-pointer
    font-normal uppercase
    
    ">
 Submit
 </a>
     
     </>
 
 
     :''
 }


{
    shownDonors.length!==0?


<section class="mx-auto -mt-14 -mb-3 block text-center py-20 right-1 lg:py-[120px]">
   <div class="container  mx-auto block text-center">
      <div class="flex flex-wrap  mx-auto block text-center ">
         <div class="w-full px-4  mx-auto block text-center">
            <div class="max-w-full overflow-x-auto">
               <table class="table-auto w-full">
                  <thead>
                     <tr class="bg-blue-700 text-center">
                        <th
                           class="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-l border-transparent
                           "
                           >
                           Name
                        </th>
                        <th
                           class="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                           >
                           Age
                        </th>
                        <th
                           class="
                           w-2/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                           >
                           Location
                        </th>
                        <th
                           class="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                           >
                          Blood Type
                        </th>

                        <th
                           class="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                           >
                          Delete
                        </th>
                        
                     </tr>
                  </thead>
                  <tbody>
                     
                    {
                        shownDonors.map(donor=> {

                            return (

                                <tr>
                        <td
                           class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-l border-[#E8E8E8]
                           "
                           >
                           {donor.name}
                        </td>
                      
                        <td
                           class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           "
                           >
                           {donor.age}
                        </td>
                        <td
                           class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-[#E8E8E8]
                           "
                           >
                           {donor.location}
                        </td>
                        <td
                           class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           "
                           >
                           {donor.bloodtype}
                        </td>

                        <td
                           class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-[#E8E8E8]
                           "
                           >
                            <a
                            onClick={()=> {
                                deleteDonor(donor.name)
                            }}
                              href="javascript:void(0)"
                              class="
                              border border-primary
                              py-2
                              px-6
                              text-primary
                              inline-block
                              rounded
                              hover:bg-blue-700 hover:text-white
                              "
                              >
                           Delete
                           </a>
                        </td>
                       
                        
                     </tr>


                            )
                        })
                    }
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   </div>
</section>


    :

    <h1 class = 'relative mt-24 uppercase text-xl mx-auto block text-center'>No Results Shown</h1>
}
 
 
 
</div>
</div>

 
     </>
 
 
 : 

optionSelected === 'stock'?

<>

<div class ='h-full pb-40 w-screen bg-cover -mt-10 pt-12' style = {{'backgroundImage':"url('https://post.healthline.com/wp-content/uploads/2020/09/Blood_Donation-732X549-thumbnail.jpg')"}}>
    
    <div class = 'h-fit w-[90%] p-8 pt-0 px-14 bg-white shadow-md pb-16 bg-opacity-90 -mb-64 block mx-auto'>


<div class="w-full md:w-1/2 relative top-8 mx-auto block mt-4 mb-2 lg:w-1/3 px-4">
    <h1 class = 'text-3xl mt-3 mb-7 font-semibold'>Change Stock</h1>
       <div class="mb-12">
          <label for="" class="font-medium text-base text-black block mb-3">
          Number
          </label>
          <input type="number" onChange={changeStockHandlerNum} placeholder="Enter Number to be Added or Removed"  class="
             w-full
             border-[1.5px] border-form-stroke
             rounded-lg
             py-3
             px-5
             font-medium
             text-body-color
             placeholder-body-color
             outline-none
             focus:border-primary
             active:border-primary
             transition
             "/>
       </div>
    </div>

    <div class=" block mt-4 relative top-3 mx-auto ">
   <div class="w-[420px] block mx-auto ">
      <div class="mb-12">
         <label for="" class="font-medium text-base text-black block mb-3">
         Blood Type
         </label>
         <div class="relative">
            <select name = 'bloodtype' onChange = {changeStockHandlerType} required class="
               w-full
               border-[1.5px] border-form-stroke
               rounded-lg
               py-3
               px-5
               font-medium
               text-body-color
               outline-none
               focus:border-primary
               active:border-primary
               transition
               disabled:bg-[#F5F7FD] disabled:cursor-default
               appearance-none
               ">
                               <option value={null} disabled defaultChecked>Select Blood Type</option>
               <option value="A+">A+</option>
               <option value="A-">A-</option>
               <option value="B+">B+</option>
               <option value="B-">B-</option>
               <option value="AB+">AB+</option>
               <option value="AB-">AB-</option>
               <option value="O+">O+</option>
               <option value="O-">O-</option>            </select>
            <span class="
               absolute
               right-4
               top-1/2
               -translate-y-1/2
               mt-[-2px]
               w-[10px]
               h-[10px]
               border-r-2 border-b-2 border-body-color
               rotate-45
               ">
            </span>
         </div>
      </div>
   </div>
</div>


<div class = 'flex text-center  pt-7 justify-center -mt-10 mb-6 relative top-8 gap-5 space-x-7 mx-auto'>
    <button onClick={()=> {
        let dummyStock = currentStock;
        dummyStock[selectedStockType] += parseInt(selectedStockNum)
        setCurrentStock(dummyStock)
        axios.post(process.env.NODE_ENV ==='production'?'https://bloodbank-virat.herokuapp.com/api/user/changeStock':'http://localhost:4000/api/user/changeStock',{stock:dummyStock}).then(res=> {
        setAllDonors(res.data)
            }).catch(err=> {
                console.log(err)
              })
    }} class = 'bg-blue-700 hover:bg-blue-800 uppercase px-10 py-3 rounded-md font-semibold text-white'> ADD</button>
    <button onClick={()=> {
        let dummyStock = currentStock;
        dummyStock[selectedStockType] -= parseInt(selectedStockNum)
        setCurrentStock(dummyStock)
        axios.post(process.env.NODE_ENV ==='production'?'https://bloodbank-virat.herokuapp.com/api/user/changeStock':'http://localhost:4000/api/user/changeStock',{stock:dummyStock}).then(res=> {
        setAllDonors(res.data)
            }).catch(err=> {
                console.log(err)
              })
    }} class = 'bg-blue-700 hover:bg-blue-800 rounded-md px-10 py-3 font-semibold text-white'> SUBTRACT</button>


</div>


<section class=" mx-auto -mt-14 -mb-8 block text-center py-20 right-1 lg:py-[120px]">
   <div class="container  mx-auto block text-center">
      <div class="flex flex-wrap  mx-auto block text-center ">
         <div class="w-full px-4  mx-auto block text-center">
            <div class="max-w-full overflow-x-auto">
               <table class="table-auto w-full">
                  <thead>
                     <tr class="bg-blue-700 text-center">
                        
                        <th
                           class="
                           w-3/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                           >
                          Blood Type
                        </th>

                        <th
                           class="
                           w-3/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                           >
                          Stock
                        </th>
                        
                     </tr>
                  </thead>
                  <tbody>
                     
                    {
                        Object.keys(currentStock).map(type=> {

                            return (

                                <tr>
                       
                        <td
                           class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-[#E8E8E8]
                           "
                           >
                           {type}
                        </td>
                        <td
                           class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           "
                           >
                           {currentStock[type]}
                        </td>

                        
                       
                        
                     </tr>


                            )
                        })
                    }
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   </div>
</section>
</div> </div>
</> :  ''

}
        </>
    )
}

export default Profile