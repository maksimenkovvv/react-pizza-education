import React, { useEffect, useContext, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
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
  const isMounted = useRef(false);
  const { items, status } = useSelector((state) => state.pizzas);
  const getPizzas = async () => {
    dispatch(fetchPizzas({ currentPage, categoryId, sortProperty: sort.sort, orderType }));
  };

  const { categoryId, sort, orderType, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = useContext(SearchContext);

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
      getPizzas();
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
      {status === 'error' ? (
        <div>
          <h2 className="content__title">Произошла ошибка 😕</h2>
          <p>К ОГРОМНОМУ сожалению, не удалось получить пиццы :( Во всем виноват бек</p>
        </div>
      ) : (
        <>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {status === 'loading'
              ? [...new Array(9)].map((_, index) => <Skeleton key={index} />)
              : items
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
      )}
    </>
  );
}
