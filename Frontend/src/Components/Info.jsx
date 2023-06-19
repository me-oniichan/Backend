import { useContext } from "react"
import { pokeContext } from "../Context/pokeContext"

export default function Info(){
    const {pokeData: {info}, color} = useContext(pokeContext)
    return(
        <div className="info-card">
            <div className="info-card-deco">
                <div className="top-left" style={{background : `${color}`}}>
                    <span>Info</span>
                </div>
                <div className="top-bar" style={{background : `${color}`}}></div>
            </div>
            <div>
                <ul className="info-data-list">
                    <li>
                        <div className="head">Height</div>
                        <div className="value">{info.Height}</div>
                    </li>
                    <li>
                        <div className="head">Weight</div>
                        <div className="value">{info.Weight}</div>
                    </li>
                    <li>
                        <div className="head">Category</div>
                        <div className="value">{info.Category}</div>
                    </li>
                    <li>
                        <div className="head">Ability</div>
                        {
                            info.Abilities.map((ability, idx)=>(
                                <div className="value" key={idx}>{ability}</div>
                            ))
                        }
                        
                    </li>
                </ul>
            </div>
        </div>
    )
}