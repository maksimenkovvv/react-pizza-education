import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

export default function Home() {
  const dispatchCategory = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);

  const { searchValue } = useContext(SearchContext);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderType, setOrderType] = useState('asc');

  const onClickCategory = (index) => dispatchCategory(setCategoryId(index));

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6a3295b3c6ca2aee438543bc.mockapi.io/pizzas?page=${currentPage}&limit=4&category=${categoryId}&sortBy=${sort.sort}&order=${orderType}`,
      //поиск локальный, потому что mockapi не хочет нормально работать(
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort.sort, orderType, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(index) => {
            onClickCategory(index);
          }}
        />
        <Sort
          valueOrder={orderType}
          onClickOrder={() => {
            setOrderType((prev) => (prev === 'asc' ? 'desc' : 'asc'));
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
