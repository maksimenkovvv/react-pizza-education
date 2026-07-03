import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';
import { list } from '../components/Sort';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const fetchPizzas = () => {
    setIsLoading(true);
    axios
      .get(
        `https://6a3295b3c6ca2aee438543bc.mockapi.io/pizzas?page=${currentPage}&limit=4&category=${categoryId}&sortBy=${sort.sort}&order=${orderType}`,
        //поиск локальный, потому что mockapi не хочет нормально работать(
      )
      .then((arr) => {
        setPizzas(arr.data);
        setIsLoading(false);
      });
  };
  const isMounted = useRef(false);

  const { categoryId, sort, orderType, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onClickCategory = (index) => dispatch(setCategoryId(index));

  // ⬇️ Вшивание параметров в URL при условии, что это НЕ ПЕРВЫЙ рендер
  useEffect(() => {
    if (isMounted.current) {
      const querySrtring = qs.stringify({
        sortProperty: sort.sort,
        categoryId,
        currentPage,
      });
      navigate(`?${querySrtring}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sort, currentPage]);

  // ⬇️ Если был первый рендер - проверяем URL-параметры и сохраняем их в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortList = list.find((obj) => obj.sort === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sortList,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // ⬇️ Если сейчас первый рендер - запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
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
        <Sort />
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
      <Pagination />
    </>
  );
}
