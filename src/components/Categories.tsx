import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: any;
};

export default function Categories({ value, onClickCategory }: CategoriesProps) {
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
