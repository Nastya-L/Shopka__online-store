import '../styles/styles.scss';

import requestProduct from "./product_view.js"
import createProduct from "./product.js"
import * as categories from "./categories.js"
import * as endpoint from "./api_endpoints.js"
import * as route from "./route.js"
import {preloaderRemove, preloaderAdd} from "./preloader.js"

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
      while (content.hasChildNodes()) {
        content.removeChild(content.firstChild);
      }
      for (let i = 0; i < data.length; i += 1) {
        const productDiv = createProduct(data[i]);
        content.appendChild(productDiv);
      }
      preloaderRemove();
    })
    .catch((error) => console.log('Что-то пошло не так', error));
}

// Категории
const categoriesСontent = document.querySelector('.categories__content');

const urlProducts = route.getRoute(window.location.hash);
selectCategories(urlProducts);

// Активная категория
function setActiveMenuLink(el) {
  const curentLink = categoriesСontent.querySelector('.active');
  if (curentLink !== null) {
    curentLink.classList.remove('active');
  }
  el.classList.add('active');
}

// Запрос на сервер (категории)
fetch(endpoint.routeCatigories)
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i += 1) {
      const categoriesLi = categoriesAdd(data[i]);
      categoriesСontent.appendChild(categoriesLi);
    }
    preloaderRemove();
    const link = categoriesСontent.querySelector(`[data-category="${urlProducts}"]`);
    if (link !== null) {
      categories.setActiveMenuLink(link);
    }
  })
  .catch((error) => console.log('Что-то пошло не так', error));

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

// Путь на выбраную категорию
function selectCategories(categ) {
  let url = endpoint.certainCategory + categ; 
  if (categ == "all" || categ == "") {
    url = endpoint.routeProducts; 
  }
  requestProducts(url);
}