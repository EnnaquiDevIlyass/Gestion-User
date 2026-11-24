import {useEffect, useState} from "react"
export default function App(){
    let [user , setUser] = useState([])
    let [recherche , setRecherche] = useState("")
    let [load , setLoad] = useState(true)
    let [error , setError] = useState(null)
    let [formHide , setFormHide] = useState(true)
    let [userSelect, setUserSelect] = useState(null)

    useEffect(()=>{
        async function getUsers(){
            try{
                let apiT= await fetch("https://jsonplaceholder.typicode.com/users")
                if(!apiT.ok){
                    setError("Erreur de recuperation")
                }
                let response = await apiT.json()
                setUser(response)
            }
            catch(err){
                setError(err.message)
            }
            finally{
                setLoad(false)
            }
        }
        getUsers()
    },[])
    
  return(
    <>

    </>
  )
}