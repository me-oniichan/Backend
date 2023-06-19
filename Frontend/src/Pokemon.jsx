import Info from "./Components/Info";
import Stats from "./Components/Stats";
import Types from "./Components/Types";
import "./styles/type.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {pokeContext} from "./Context/pokeContext";
import Loading from "./Components/Loading";

export default function Pokemon() {
    const [pokeData, setPokeData] = useState({})
    const [loading, setLoading] = useState(true)
    const {id} = useParams();
    const navigate = useNavigate()

    let {color} = pokeData
    if(color) color = `rgb(${color[2]},${color[1]},${color[0]}`

    useEffect(()=>{
        if(!(/^\d+$/.test(id))){
            navigate("/")
            return;
        }
        fetch("/get/"+id).then(res=>{
            res.json().then(data=>{
                if(data.status === 200){
                    setPokeData(data)
                    setLoading(false)
                }else{
                    navigate("/")
                }
            })
        }).catch(err=>{
            navigate("/")
        })
    }, [id, navigate])
    if(loading) return <Loading/>
    return (
        <pokeContext.Provider value={{pokeData, color}}>
            <div className="pokemon">
                <div className="profile">
                    <div className="imgwrap" style={{boxShadow: `0 0 15px 5px ${color}`}}>
                        <img className="pokeimg" src={require("./Thumbnails/"+pokeData.id+".png")} alt="" width={400} height={400} />
                    </div>
                    <div className="types">
                        <div className="type-head">TYPES</div>
                        <Types props={pokeData.types}/>
                    </div>
                    <div className="types">
                    <div className="type-head">WEAKNESS</div>
                        <Types props={pokeData.weakness}/>
                    </div>
                </div>

                <div className="info">
                    <div className="poke-name">
                        {pokeData.name}
                    </div>
                    <Info />
                    <Stats/>
                </div>
            </div>
        </pokeContext.Provider>
    );
}
