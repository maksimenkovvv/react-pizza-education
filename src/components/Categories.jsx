import React from 'react';

export default function Categories({ value, onClickCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Cырные'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={category}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
