import React, { useState, useEffect, useContext } from 'react';

import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

export default function Home() {
  const { searchValue } = useContext(SearchContext);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderType, setOrderType] = useState('asc');
  const [sortType, setSortType] = useState({
    id: 0,
    name: 'цене',
    sort: 'price',
    order: 'asc',
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6a3295b3c6ca2aee438543bc.mockapi.io/pizzas?page=${currentPage}&limit=4&category=${categoryId}&sortBy=${sortType.sort}&order=${orderType}`,
      //поиск локальный, потому что mockapi не хочет нормально работать(
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType.sort, orderType, currentPage]);

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
          : pizzas
              .filter((pizza) => {
                if (pizza.title.toLowerCase().includes(searchValue.toLowerCase())) {
                  return true;
                }
                return false;
              })
              .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
}
