import { useContext } from "react"
import "../styles/stat.css"
import { pokeContext } from "../Context/pokeContext"
export default function Stats(){
    const {pokeData : {stats}, color} = useContext(pokeContext)
    return (
        <div className="stat-card">
            <div className="stat-head">Stats</div>
            <ul className="stat-list">
                <li className="stat-item">
                    <span className="stat-name">HP</span>
                    <span className="stat-value">{stats.hp}</span>
                    <div className="stat-chart">
                        <div className="chart-value" style={{width : `${stats.hp/180 * 100}%`}}></div>
                    </div>
                </li>
                <li className="stat-item">
                    <span className="stat-name">Attack</span>
                    <span className="stat-value">{stats.attack}</span>
                    <div className="stat-chart">
                        <div className="chart-value" style={{width : `${stats.attack/180 * 100}%`}}></div>
                    </div>
                </li>
                <li className="stat-item">
                    <span className="stat-name">Defense</span>
                    <span className="stat-value">{stats.defense}</span>
                    <div className="stat-chart">
                        <div className="chart-value" style={{width : `${stats.defense/180 * 100}%`}}></div>
                    </div>
                </li>
                <li className="stat-item">
                    <span className="stat-name">Sp. Atk</span>
                    <span className="stat-value">{stats["special-attack"]}</span>
                    <div className="stat-chart">
                        <div className="chart-value" style={{width : `${stats["special-attack"]/180 * 100}%`}} ></div>
                    </div>
                </li>
                <li className="stat-item">
                    <span className="stat-name">Sp. Def</span>
                    <span className="stat-value">{stats["special-defense"]}</span>
                    <div className="stat-chart">
                        <div className="chart-value" style={{width : `${stats["special-defense"]/180 * 100}%`}}></div>
                    </div>
                </li>
                <li className="stat-item">
                    <span className="stat-name">Speed</span>
                    <span className="stat-value">{stats.speed}</span>
                    <div className="stat-chart">
                        <div className="chart-value" style={{width : `${stats.speed/180 * 100}%`}}></div>
                    </div>
                </li>
            </ul>
            <div className="end-rod" style={{background : `${color}`}}></div>
        </div>
    )
}