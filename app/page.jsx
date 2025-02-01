'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css'; // Общие стили для главной страницы

const HomePage = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const storedBuses = localStorage.getItem('buses');
    if (storedBuses) {
      setBuses(JSON.parse(storedBuses));
    }
  }, []);

  // Функция удаления автобуса по его id
  const handleDelete = (id) => {
    if (confirm('Вы действительно хотите удалить этот автобус?')) {
      const storedBuses = localStorage.getItem('buses');
      let updatedBuses = storedBuses ? JSON.parse(storedBuses) : [];
      updatedBuses = updatedBuses.filter((bus) => bus.id !== id);
      localStorage.setItem('buses', JSON.stringify(updatedBuses));
      setBuses(updatedBuses);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Список автобусов</h1>
      <Link href="/bus/create" className={styles.createButton}>
        Создать автобус
      </Link>
      <table className={styles.busTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Общее количество мест</th>
            <th>Занятые места</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {buses.sort((a, b) => b.id - a.id).map((bus) => (
            <tr key={bus.id}>
              <td>{bus.id}</td>
              <td>{bus.busName}</td>
              <td>{bus.totalSeats}</td>
              <td>
                {bus.selectedSeats.map((seat) => (
                  <div key={seat}>{seat}</div>
                ))}
              </td>
              <td>
                <Link href={`/bus/edit/${bus.id}`} className={styles.editButton}>
                  Редактировать
                </Link>
                <button onClick={() => handleDelete(bus.id)} className={styles.deleteButton}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;