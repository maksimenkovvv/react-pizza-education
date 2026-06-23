import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [orderType, setOrderType] = useState('asc');
  const [sortType, setSortType] = useState({
    id: 0,
    name: 'популярности',
    sort: 'rating',
    order: 'asc',
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6a3295b3c6ca2aee438543bc.mockapi.io/pizzas?category=${categoryId}&sortBy=${sortType.sort}&order=${orderType}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType.sort, orderType]);

  console.count('Home render');

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(index) => {
            setCategoryId(index);
          }}
        />
        <Sort
          valueOrder={orderType}
          onClickOrder={() => {
            setOrderType((prev) => (prev === 'asc' ? 'desc' : 'asc'));
          }}
          value={sortType}
          onClickSort={(obj) => {
            setSortType(obj);
          }}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(9)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </>
  );
}
