'use client';
import React from 'react';
import styles from './BusSeat.module.css';

const BusSeat = ({ 
  seat, 
  isSelected, 
  isOccupied, 
  passengerName, 
  onClick, 
  onNameChange,
  isDriverSeat = false
}) => {
  const handleClick = () => {
    if (!isOccupied) {
      onClick(seat);
    }
  };

  const handleNameChange = (e) => {
    e.stopPropagation();
    onNameChange(seat, e.target.value);
  };

  return (
    <div 
      className={`${styles.seat} 
        ${isSelected ? styles.selected : ''} 
        ${isOccupied ? styles.occupied : ''}
        ${isDriverSeat ? styles.driverSeat : ''}`}
      onClick={handleClick}
      title={isDriverSeat ? 'Место водителя' : `Место ${seat}`}
    >
      <div className={styles.seatNumber}>
        {isDriverSeat ? '🚌' : seat}
      </div>
      {isSelected && (
        <input
          type="text"
          placeholder="Имя пассажира"
          value={passengerName || ''}
          onChange={handleNameChange}
          className={styles.passengerInput}
          onClick={(e) => e.stopPropagation()}
          autoFocus
        />
      )}
      {isOccupied && !isSelected && (
        <div className={styles.passengerName}>{passengerName}</div>
      )}
      {isDriverSeat && (
        <div className={styles.driverLabel}>Водитель</div>
      )}
    </div>
  );
};

export default BusSeat;