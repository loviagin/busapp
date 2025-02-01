'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import BusSeat from '../../../components/BusSeat';
import styles from '../../create/page.module.css';

const BusEdit = () => {
  const router = useRouter();
  const { id } = useParams();
  const [busName, setBusName] = useState("");
  const [totalSeats, setTotalSeats] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [manualSeat, setManualSeat] = useState('');
  const seatsPerRow = 4;
  const numberOfRows = Math.ceil(totalSeats / seatsPerRow);

  useEffect(() => {
    const storedBuses = localStorage.getItem('buses');
    if (storedBuses) {
      const buses = JSON.parse(storedBuses);
      const bus = buses.find((b) => b.id.toString() === id);
      if (bus) {
        setBusName(bus.busName);
        setTotalSeats(bus.totalSeats);
        setSelectedSeats(bus.selectedSeats);
      }
    }
  }, [id]);

  const handleSeatClick = (seatId) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const renderRow = (rowIndex) => (
    <div key={rowIndex} className={styles.row}>
      <div className={styles.rowNumber}>{rowIndex + 1}</div>
      <div className={styles.seatRowContainer}>
        <div className={styles.seatGroup}>
          {[0, 1].map(seatPos => {
            const globalSeatNumber = rowIndex * seatsPerRow + seatPos + 1;
            if (globalSeatNumber <= totalSeats) {
              return (
                <BusSeat
                  key={globalSeatNumber}
                  seat={globalSeatNumber}
                  isSelected={selectedSeats.includes(String(globalSeatNumber))}
                  onClick={() => handleSeatClick(String(globalSeatNumber))}
                />
              );
            } else {
              return <div key={`empty-${rowIndex}-${seatPos}`} className={styles.emptySeat}></div>;
            }
          })}
        </div>
        <div className={styles.aisle}></div>
        <div className={styles.seatGroup}>
          {[2, 3].map(seatPos => {
            const globalSeatNumber = rowIndex * seatsPerRow + seatPos + 1;
            if (globalSeatNumber <= totalSeats) {
              return (
                <BusSeat
                  key={globalSeatNumber}
                  seat={globalSeatNumber}
                  isSelected={selectedSeats.includes(String(globalSeatNumber))}
                  onClick={() => handleSeatClick(String(globalSeatNumber))}
                />
              );
            } else {
              return <div key={`empty-${rowIndex}-${seatPos}`} className={styles.emptySeat}></div>;
            }
          })}
        </div>
      </div>
    </div>
  );

  const handleManualAdd = () => {
    const seat = parseInt(manualSeat, 10);
    if (
      isNaN(seat) ||
      seat < 1 ||
      seat > totalSeats
    ) {
      alert(
        `Укажите корректный номер ряда (1-${numberOfRows}) и номер кресла (1-${totalSeats}).`
      );
      return;
    }
    const globalSeatNumber = seat;
    if (globalSeatNumber > totalSeats) {
      alert('Такого места нет в автобусе.');
      return;
    }
    if (!selectedSeats.includes(String(globalSeatNumber))) {
      setSelectedSeats([...selectedSeats, String(globalSeatNumber)]);
    }
    setManualSeat('');
  };

  const handleSave = () => {
    const busData = {
      id: parseInt(id, 10),
      busName,
      totalSeats,
      selectedSeats,
    };

    const storedBuses = localStorage.getItem('buses');
    let buses = storedBuses ? JSON.parse(storedBuses) : [];
    buses = buses.map(b => (b.id.toString() === id ? busData : b));
    localStorage.setItem('buses', JSON.stringify(buses));
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Редактирование автобуса</h1>
      <div className={styles.creationContent}>
        <div className={styles.busLayout}>
          <h2 className={styles.sectionTitle}>План автобуса</h2>
          {Array.from({ length: numberOfRows }).map((_, rowIndex) =>
            renderRow(rowIndex)
          )}
        </div>
        <div className={styles.busDataForm}>
          <h2 className={styles.sectionTitle}>Данные автобуса</h2>
          <div className={styles.formGroup}>
            <label>Название автобуса:</label>
            <input
              type="text"
              value={busName}
              onChange={(e) => setBusName(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Общее количество мест:</label>
            <input
              type="number"
              value={totalSeats}
              onChange={(e) =>
                setTotalSeats(parseInt(e.target.value) || 0)
              }
            />
          </div>
          <div className={styles.manualInput}>
            <label>Кресло:</label>
            <input
              type="number"
              value={manualSeat}
              onChange={(e) => setManualSeat(e.target.value)}
              placeholder="Например, 3"
            />
            <button onClick={handleManualAdd}>Добавить место</button>
          </div>
          <div className={styles.selectedSeatsTable}>
            <h3>Занятые места</h3>
            <table>
              <thead>
                <tr>
                  <th>Ряд</th>
                  <th>Кресло</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {selectedSeats.map((seatId) => {
                  const seatNum = parseInt(seatId, 10);
                  const row = Math.floor((seatNum - 1) / seatsPerRow) + 1;
                  return (
                    <tr key={seatId}>
                      <td>{row}</td>
                      <td>{seatNum}</td>
                      <td>
                        <button onClick={() => handleSeatClick(seatId)}>
                          Удалить
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button className={styles.saveButton} onClick={handleSave}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusEdit;