'use client';
import React from 'react';
import styles from '../bus/create/page.module.css';

const BusSeat = ({ seat, isSelected, onClick }) => {
  return (
    <div
      className={`${styles.seat} ${isSelected ? styles.selectedSeat : ''}`}
      onClick={onClick}
    >
      {seat}
    </div>
  );
};

export default BusSeat;