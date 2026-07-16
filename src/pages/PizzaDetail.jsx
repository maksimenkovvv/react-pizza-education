import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function PizzaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState(null);
  console.log(navigate);

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6a3295b3c6ca2aee438543bc.mockapi.io/pizzas/${id}`,
        );
        setPizza(data);
      } catch (error) {
        alert('Ошибка :(\nВы будете перенаправлены на главную страницу');
        console.log(error);
        navigate('/');
      }
    }
    fetchPizza();
  }, []);
  return (
    <>
      {!pizza ? (
        <p>Загрузка...</p>
      ) : (
        <>
          <img src={pizza.imageUrl} alt={pizza.title} />
          <h2>{pizza.title}</h2>
          <p>{pizza.price}</p>
        </>
      )}
    </>
  );
}
