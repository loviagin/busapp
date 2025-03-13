'use client';
import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const HomePage = () => {
  return (
    <div className={styles.mainContainer}>
      {/* Hero section с анимированным фоном */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            BusApp
            <span className={styles.heroHighlight}>Управление автобусными перевозками</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Удобная система управления бронированиями для транспортных компаний, агентств и водителей
          </p>
          <div className={styles.heroButtons}>
            <Link href="/account/buses" className={styles.primaryButton}>
              Открыть панель управления
            </Link>
            <Link href="#about" className={styles.secondaryButton}>
              Узнать больше
            </Link>
          </div>
        </div>
        <div className={styles.heroGraphic}>
          <div className={styles.circle1}></div>
          <div className={styles.circle2}></div>
          <div className={styles.circle3}></div>
        </div>
      </header>

      {/* Секция с преимуществами */}
      <section className={styles.features} id='about'>
        <h2 className={styles.sectionTitle}>Возможности системы</h2>
        <div className={styles.featureGrid}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🚌</div>
            <h3>Управление автобусами</h3>
            <p>Добавляйте и настраивайте схемы автобусов с любым количеством мест</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>👥</div>
            <h3>Управление бронированиями</h3>
            <p>Отмечайте занятые места и храните информацию о пассажирах</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🔓</div>
            <h3>Работа без авторизации</h3>
            <p>Начните использовать систему прямо сейчас, без регистрации и ожидания</p>
          </div>
        </div>
      </section>

      {/* Секция с процессом работы */}
      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>Как это работает</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Создайте автобус</h3>
            <p>Укажите название и настройте схему расположения мест</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>Управляйте местами</h3>
            <p>Отмечайте занятые места и добавляйте информацию о пассажирах</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>Следите за данными</h3>
            <p>Вся информация сохраняется автоматически и доступна в любой момент</p>
          </div>
        </div>
      </section>

      {/* Секция с демонстрацией интерфейса */}
      <section className={styles.interfaceDemo}>
        <h2 className={styles.sectionTitle}>Удобный интерфейс управления</h2>
        <div className={styles.demoGrid}>
          <div className={styles.demoCard}>
            <div className={styles.demoHeader}>
              <span className={styles.demoIcon}>📊</span>
              <h3>Панель управления</h3>
            </div>
            <div className={styles.demoContent}>
              <ul className={styles.demoList}>
                <li>Список всех автобусов</li>
                <li>Статус бронирования</li>
                <li>Быстрый доступ к редактированию</li>
              </ul>
            </div>
          </div>
          <div className={styles.demoCard}>
            <div className={styles.demoHeader}>
              <span className={styles.demoIcon}>🎯</span>
              <h3>Управление местами</h3>
            </div>
            <div className={styles.demoContent}>
              <ul className={styles.demoList}>
                <li>Интерактивная схема мест</li>
                <li>Добавление пассажиров</li>
                <li>Мгновенное обновление статуса</li>
              </ul>
            </div>
          </div>
          <div className={styles.demoCard}>
            <div className={styles.demoHeader}>
              <span className={styles.demoIcon}>📱</span>
              <h3>Мобильная версия</h3>
            </div>
            <div className={styles.demoContent}>
              <ul className={styles.demoList}>
                <li>Адаптивный дизайн</li>
                <li>Удобное управление с телефона</li>
                <li>Быстрый доступ к функциям</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Секция с примерами использования */}
      <section className={styles.useCases}>
        <h2 className={styles.sectionTitle}>Для кого подходит система</h2>
        <div className={styles.useCasesGrid}>
          <div className={styles.useCase}>
            <div className={styles.useCaseIcon}>🏢</div>
            <h3>Транспортные компании</h3>
            <p>Управляйте всем автопарком из единого интерфейса</p>
          </div>
          <div className={styles.useCase}>
            <div className={styles.useCaseIcon}>🚐</div>
            <h3>Частные перевозчики</h3>
            <p>Идеально для владельцев одного или нескольких автобусов</p>
          </div>
          <div className={styles.useCase}>
            <div className={styles.useCaseIcon}>👨‍✈️</div>
            <h3>Водители</h3>
            <p>Удобное управление бронированиями прямо из автобуса</p>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Начните использовать прямо сейчас</h2>
          <p>Никакой регистрации - просто откройте панель управления и начните работу</p>
          <div className={styles.ctaButtons}>
            <Link href="/account/buses" className={styles.primaryButton}>
              Открыть панель управления
            </Link>
            <Link href="/bus/create" className={styles.secondaryButton}>
              Создать новый автобус
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;