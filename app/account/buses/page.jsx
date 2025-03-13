'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const HomePage = () => {
  const [buses, setBuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const storedBuses = localStorage.getItem('buses');
    if (storedBuses) {
      setBuses(JSON.parse(storedBuses));
    }
  }, []);

  const handleDelete = (id) => {
    if (confirm('Вы действительно хотите удалить этот автобус?')) {
      const storedBuses = localStorage.getItem('buses');
      let updatedBuses = storedBuses ? JSON.parse(storedBuses) : [];
      updatedBuses = updatedBuses.filter((bus) => bus.id !== id);
      localStorage.setItem('buses', JSON.stringify(updatedBuses));
      setBuses(updatedBuses);
    }
  };

  const filteredBuses = buses
    .filter(bus => 
      bus.busName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.busDate.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.busDate) - new Date(a.busDate);
      }
      if (sortBy === 'seats') {
        return b.totalSeats - a.totalSeats;
      }
      return 0;
    });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Управление автобусами</h1>
        <Link href="/bus/create" className={styles.createButton}>
          <span className={styles.createButtonIcon}>+</span>
          Создать автобус
        </Link>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Поиск по названию или дате..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.sortBox}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="date">По дате</option>
            <option value="seats">По количеству мест</option>
          </select>
        </div>
      </div>

      <div className={styles.busGrid}>
        {filteredBuses.map((bus) => (
          <div key={bus.id} className={styles.busCard}>
            <div className={styles.busHeader}>
              <h2 className={styles.busName}>{bus.busName}</h2>
              <span className={styles.busDate}>{bus.busDate}</span>
            </div>
            
            <div className={styles.busInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Всего мест:</span>
                <span className={styles.infoValue}>{bus.totalSeats}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Занято мест:</span>
                <span className={styles.infoValue}>{bus.selectedSeats.length}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Свободно мест:</span>
                <span className={styles.infoValue}>{bus.totalSeats - bus.selectedSeats.length}</span>
              </div>
            </div>

            <div className={styles.busActions}>
              <Link href={`/bus/edit/${bus.id}`} className={styles.editButton}>
                Редактировать
              </Link>
              <button onClick={() => handleDelete(bus.id)} className={styles.deleteButton}>
                Удалить
              </button>
            </div>

            {bus.selectedSeats.length > 0 && (
              <div className={styles.passengersList}>
                <h3 className={styles.passengersTitle}>Пассажиры:</h3>
                <div className={styles.passengersGrid}>
                  {bus.selectedSeats.map((seat) => (
                    <div key={seat.seat} className={styles.passengerItem}>
                      <span className={styles.seatNumber}>Место {seat.seat}</span>
                      <span className={styles.passengerName}>{seat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredBuses.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>🚌</div>
          <h2>Нет доступных автобусов</h2>
          <p>Создайте свой первый автобус, нажав на кнопку "Создать автобус"</p>
          <Link href="/bus/create" className={styles.createButton}>
            Создать автобус
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage; 