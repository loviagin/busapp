'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BusSeat from '../../components/BusSeat';
import styles from './page.module.css';

const BusCreation = () => {
  const router = useRouter();
  const [busName, setBusName] = useState("Автобус №");
  const [busDate, setBusDate] = useState(Date.now());

  const [totalSeats, setTotalSeats] = useState(40);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [manualSeat, setManualSeat] = useState('');
  const [manualName, setManualName] = useState('');

  // В каждом ряду 4 места (2 слева и 2 справа, между ними проход)
  const seatsPerRow = 4;
  const numberOfRows = Math.ceil(totalSeats / seatsPerRow);

  // Обработка клика по месту (переключение состояния "выбрано")
  const handleSeatClick = (seatId) => {
    const bookedSeat = {
      seat: seatId,
      name: '',
    };
  
    setSelectedSeats((prev) =>
      prev.some((s) => s.seat === bookedSeat.seat)
        ? prev.filter((s) => s.seat !== seatId)
        : [...prev, bookedSeat]
    );
  };

  // Рендеринг ряда:
  // Слева выводится номер ряда, далее две группы сидений с проходом между ними.
  // Глобальный номер места вычисляется как: (rowIndex * seatsPerRow + seatPos + 1)
  const renderRow = (rowIndex) => (
    <div key={rowIndex} className={styles.row}>
      <div className={styles.rowNumber}>{rowIndex + 1}</div>
      <div className={styles.seatRowContainer}>
        <div className={styles.seatGroup}>
          {[0, 1].map((seatPos) => {
            const globalSeatNumber = rowIndex * seatsPerRow + seatPos + 1;
            if (globalSeatNumber <= totalSeats) {
              return (
                <BusSeat
                  key={globalSeatNumber}
                  seat={globalSeatNumber}
                  isSelected={selectedSeats.some((s) => s.seat === String(globalSeatNumber))}
                  onClick={() => handleSeatClick(String(globalSeatNumber))}
                />
              );
            } else {
              return (
                <div
                  key={`empty-${rowIndex}-${seatPos}`}
                  className={styles.emptySeat}
                ></div>
              );
            }
          })}
        </div>
        <div className={styles.aisle}></div>
        <div className={styles.seatGroup}>
          {[2, 3].map((seatPos) => {
            const globalSeatNumber = rowIndex * seatsPerRow + seatPos + 1;
            if (globalSeatNumber <= totalSeats) {
              return (
                <BusSeat
                  key={globalSeatNumber}
                  seat={globalSeatNumber}
                  isSelected={selectedSeats.some((s) => s.seat === String(globalSeatNumber))}
                  onClick={() => handleSeatClick(String(globalSeatNumber))}
                />
              );
            } else {
              return (
                <div
                  key={`empty-${rowIndex}-${seatPos}`}
                  className={styles.emptySeat}
                ></div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );

  // Ручное добавление места – ввод номера ряда и кресла, затем вычисление глобального номера
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

    const bookedSeat = {
      seat: String(seat),
      name: manualName,
    };

    if (bookedSeat.seat > totalSeats) {
      alert('Такого места нет в автобусе.');
      return;
    }

    if (!selectedSeats.some((s) => s.seat === bookedSeat.seat)) {
      setSelectedSeats([...selectedSeats, bookedSeat]);
    }

    setManualSeat('');
    setManualName('');
  };

  // Сохранение автобуса (локальное сохранение в localStorage) и переход на главную страницу
  const handleSave = () => {
    const busData = {
      id: Date.now(),
      busName,
      busDate,
      totalSeats,
      selectedSeats,
    };

    const storedBuses = localStorage.getItem('buses');
    const buses = storedBuses ? JSON.parse(storedBuses) : [];
    buses.push(busData);
    localStorage.setItem('buses', JSON.stringify(buses));

    router.push('/');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Создание автобуса</h1>
      <div className={styles.creationContent}>
        {/* Карточка с планом автобуса */}
        <div className={styles.busLayout}>
          <h2 className={styles.sectionTitle}>План автобуса</h2>
          {Array.from({ length: numberOfRows }).map((_, rowIndex) =>
            renderRow(rowIndex)
          )}
        </div>
        {/* Карточка с данными автобуса */}
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
            <label>Дата отправления:</label>
            <input
              type="date"
              value={busDate}
              onChange={(e) =>
                setBusDate(e.target.value)
              }
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
          {/* Форма ручного ввода */}
          <div className={styles.manualInput}>
            <label>Кресло:</label>
            <input
              type="number"
              value={manualSeat}
              onChange={(e) => setManualSeat(e.target.value)}
              placeholder="Например, 3"
            />
            <label>ФИО клиента:</label>
            <input
              type="text"
              value={manualName}
              onChange={(e) => setManualName(e.target.value)}
              placeholder="Например, Иван"
            />
            <button onClick={handleManualAdd}>Забронировать место</button>
          </div>
          {/* Таблица выбранных (занятых) мест – теперь два столбца: Ряд и Кресло */}
          <div className={styles.selectedSeatsTable}>
            <h3>Занятые места</h3>
            <table>
              <thead>
                <tr>
                  <th>Ряд</th>
                  <th>Кресло</th>
                  <th>Клиент</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {selectedSeats.map((s) => {
                  const seatNum = parseInt(s.seat, 10);
                  const row = Math.floor((seatNum - 1) / seatsPerRow) + 1;
                  return (
                    <tr key={s.seat}>
                      <td>{row}</td>
                      <td>{seatNum}</td>
                      <td>{s.name}</td>
                      <td>
                        <button onClick={() => handleSeatClick(s.seat)}>
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
            Создать автобус
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusCreation;