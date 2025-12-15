

import "./FoodList.css";

export default function FoodList({ alimentos, onSelect }) {
  if (!alimentos || alimentos.length === 0) {
    return <p>No hay alimentos disponibles.</p>;
  }

  return (
    <ul className="food-list">
      {alimentos.map((item) => (
        <li
          key={item.id}
          className="food-item"
          onClick={() => onSelect(item)}
        >
          <strong>{item.nombre}</strong>
          <span>{item.calorias} kcal</span>
        </li>
      ))}
    </ul>
  );
}
