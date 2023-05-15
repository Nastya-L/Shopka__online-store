import '../styles/styles.scss';

import requestProduct from './product_view';
import createProduct from './product';
import * as categories from './categories';
import * as endpoint from './api_endpoints';
import * as route from './route';
import { preloaderRemove, preloaderAdd } from './preloader';
import createFault from './fault';

const content = document.querySelector('#products');

// Нажимаем на кнопку Watch
content.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-index') === false) {
    return;
  }
  requestProduct(e.target.dataset.index);
});

// Запрос на сервер по выбранной категории
function requestProducts(url) {
  preloaderAdd();
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.length !== 0) {
        while (content.hasChildNodes()) {
          content.removeChild(content.firstChild);
        }
        for (let i = 0; i < data.length; i += 1) {
          const productDiv = createProduct(data[i]);
          content.appendChild(productDiv);
        }
        preloaderRemove();
      } else {
        createFault(content, 'Products not found');
      }
    })
    .catch(() => {
      createFault(content, 'Server not responding');
      preloaderRemove();
    });
}

// Категории
const categoriesСontent = document.querySelector('.categories__content');

// Путь на выбраную категорию
function selectCategories(categ) {
  let url = endpoint.certainCategory + categ;
  if (categ === 'all' || categ === '') {
    url = endpoint.routeProducts;
  }
  requestProducts(url);
}

const urlProducts = route.getRoute();
selectCategories(urlProducts);

// Запрос на сервер (категории)
fetch(endpoint.routeCatigories)
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i += 1) {
      const categoriesLi = categories.categoriesAdd(data[i]);
      categoriesСontent.appendChild(categoriesLi);
    }
    preloaderRemove();
    const link = categoriesСontent.querySelector(`[data-category="${urlProducts}"]`);
    if (link !== null) {
      categories.setActiveMenuLink(link);
    }
  })
  .catch(() => {
    createFault(content, 'Server not responding');
    preloaderRemove();
  });

// Нажимаем на категорию
categoriesСontent.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-category') === false) {
    return;
  }
  categories.setActiveMenuLink(e.target);
  selectCategories(e.target.dataset.category);
  route.goRoute(e.target.dataset.category);
  e.preventDefault();
});
