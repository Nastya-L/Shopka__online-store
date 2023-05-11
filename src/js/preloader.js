import '../styles/styles.scss';

// Обозначение загрузки
const preloader = document.querySelector('.preloader');

export const preloaderRemove = () => preloader.classList.add('none');

export const preloaderAdd = () => preloader.classList.remove('none');
