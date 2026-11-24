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
    let result=user.filter((us)=>
            us.name.toLowerCase().includes(recherche.toLowerCase()) ||
            us.id==recherche ||
            us.address.street.toLowerCase().includes(recherche.toLowerCase()) ||
            us.address.suite.toLowerCase().includes(recherche.toLowerCase()) ||
            us.address.city.toLowerCase().includes(recherche.toLowerCase()) ||
            us.address.geo.lat==recherche ||
            us.address.geo.lng==recherche
        )
        function supprimerId(idew){
         let ra=result.filter((mp)=>(mp.id != idew))
         setUser(ra)
        }

        function modifierId(ide){
            let ret = user.find(m => m.id === ide);
            setUserSelect(ret);
            setFormHide(!formHide);
        }
        function Ajouter(e){
            e.preventDefault();
            
            let dt = new FormData(e.currentTarget);
            
            let nouvelUser = {
                name: dt.get("name"),
                address: {
                    street: dt.get("street"),
                    suite: dt.get("suite"),
                    city: dt.get("city"),
                    geo: {
                        lat: dt.get("latitude"),
                        lng: dt.get("longitude")
                    }
                }
            };
        
            if (userSelect) {
                setUser(prev =>prev.map(u =>u.id === userSelect.id    ? { ...u, ...nouvelUser }    : u));
            } else {
                setUser(prev => [...prev,{    id: Math.max(0, ...prev.map(u => u.id)) + 1,    ...nouvelUser}]);
            }
        
            setUserSelect(null);
            setFormHide(true);
            e.currentTarget.reset();

    }
  return(
    <>
      {load && <p>Chargement ... </p>}
      {error && <p>{error}</p> }
      <input type="text" name="nom" placeholder="Rechercher" value={recherche} onChange={(e)=>setRecherche(e.target.value)} />
      <button onClick={() => { setUserSelect(null); setFormHide(!formHide); }} >Ajouter</button>
      <form onSubmit={(e)=>Ajouter(e)} hidden={formHide}>
            <div>
                <label htmlFor="name">name</label>
                <input type="text" defaultValue={userSelect?.name || ""}  name="name"/>
            </div>
            <div>
                <label htmlFor="street">street</label>
                <input type="text" defaultValue={userSelect?.address.street || ""} name="street"/>
            </div>
            <div>
                <label htmlFor="suite">suite</label>
                <input type="text" defaultValue={userSelect?.address.suite || ""} name="suite"/>
            </div>
            <div>
                <label htmlFor="city">city</label>
                <input type="text" defaultValue={userSelect?.address.city || ""} name="city"/>
            </div>
            <div>
                <label htmlFor="latitude">latitude</label>
                <input type="text" defaultValue={userSelect?.address.geo.lat || ""} name="latitude"/>
            </div>
            <div>
                <label htmlFor="longitude">longitude</label>
                <input type="text" defaultValue={userSelect?.address.geo.lng || ""}  name="longitude"/>
            </div>
            <input type="submit" value={userSelect ? "Modifier" : "Ajouter"} />
      </form>
      <table>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Street</th>
                <th>Suite</th>
                <th>City</th>
                <th>Latitude</th>
                <th>Longitude</th>
            </tr>
        {result.map((ele)=>(
            <tr key={ele.id}>
                <td>{ele.id}</td>
                <td>{ele.name}</td>
                <td>{ele.address.street}</td>
                <td>{ele.address.suite}</td>
                <td>{ele.address.city}</td>
                <td>{ele.address.geo.lat}</td>
                <td>{ele.address.geo.lng}</td>
                <td><button onClick={()=>modifierId(ele.id)} >Mod</button></td>
                <td><button onClick={()=>supprimerId(ele.id)} >Supp</button></td>
            </tr>
        ))}
        </table>
    </>
  )
}