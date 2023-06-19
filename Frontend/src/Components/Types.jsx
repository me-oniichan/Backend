export default function Types({ props }) {
    return (
        <ul className="type-list">
            {props.map((type, idx) => {
                return (
                    <li key={idx} className={["type-card" + " " + type.toLowerCase()]}>
                        {type.toUpperCase()}
                    </li>
                );
            })}
        </ul>
    );
}
