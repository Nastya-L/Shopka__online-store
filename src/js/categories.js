import '../styles/styles.scss';

// Категории
const categoriesСontent = document.querySelector('.categories__content');

// Добавляем категории
export function categoriesAdd(el) {
  const categoriesItem = document.createElement('li');
  categoriesItem.classList = 'categories__item';

  const categoriesLink = document.createElement('a');
  categoriesLink.classList = 'categories__link';
  categoriesItem.appendChild(categoriesLink);

  categoriesLink.innerHTML = el;
  categoriesLink.dataset.category = el;

  return categoriesItem;
}

// Активная категория
export function setActiveMenuLink(el) {
  const curentLink = categoriesСontent.querySelector('.active');
  if (curentLink !== null) {
    curentLink.classList.remove('active');
  }
  el.classList.add('active');
}
