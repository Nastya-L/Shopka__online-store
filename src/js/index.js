import "../styles/styles.scss"

import starHalf from "../public/images/star-half.png"
import star from "../public/images/star.png"

const content = document.querySelector("#products");

function createProduct(product) {
  // Создаем ДОМ елементы
  const div = document.createElement("div");
  div.classList = "product";

  const productImage = document.createElement("div");
  productImage.classList = "product__img";
  div.appendChild(productImage)

  const img = document.createElement("img");
  img.src = product.image;
  productImage.appendChild(img);

  const productTitle = document.createElement("h3");
  productTitle.classList = "product__title";
  div.appendChild(productTitle);

  const productPrice = document.createElement("p");
  productPrice.classList = "product__price";
  div.appendChild(productPrice);

  const productDescr = document.createElement("p");
  productDescr.classList = "product__descr";
  div.appendChild(productDescr);

  const productRating = document.createElement("div");
  productRating.classList = "product__rating";
  div.appendChild(productRating);

  const ratingImg = document.createElement("div");
  ratingImg.classList = "product__rating__img";
  productRating.appendChild(ratingImg);

  for (let i = 0; i < product.rating.rate; i++) {
    const image = document.createElement("img");
    if ((product.rating.rate - i) < 1) {
      image.src = starHalf;
    } else {
      image.src = star;
      }
    ratingImg.appendChild(image);
  }

  const ratingNumb = document.createElement("p");
  ratingNumb.classList = "product__rating__numb";
  ratingImg.appendChild(ratingNumb);

  const productBtn = document.createElement("a");
  productBtn.classList = "product__btn button";
  productRating.appendChild(productBtn);

// Заполнение контантом 
  productTitle.innerHTML = product.title.slice(0,20) + '...';
  productPrice.innerHTML = '$' + product.price;
  productDescr.innerHTML = product.description.slice(0,20) + '...';
  ratingNumb.innerHTML = product.rating.rate;
  productBtn.innerHTML = 'Watch';
  productBtn.dataset.index = product.id;
  div.dataset.category = product.category;

  return div;
}
// Обозначение загрузки
const preloader = document.querySelector(".preloader");

const urlProducts = decodeURIComponent(window.location.hash.substring(1));
selectCategories(urlProducts);

// Категории
const categoriesСontent = document.querySelector(".categories__content");

// Добавляем категории
function categoriesAdd(el) {
  const categoriesItem = document.createElement("li");
  categoriesItem.classList = "categories__item";
  
  const categoriesLink = document.createElement("a");
  categoriesLink.classList = "categories__link";
  categoriesItem.appendChild(categoriesLink);

  categoriesLink.innerHTML = el;
  categoriesLink.dataset.category = el;

  return categoriesItem;
}

// Запрос на сервер (категории)
fetch('https://fakestoreapi.com/products/categories')
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    const urlProducts = decodeURIComponent(window.location.hash.substring(1));
    for (let i = 0; i < data.length; i++) {
      const categoriesLi = categoriesAdd(data[i]);
      categoriesСontent.appendChild(categoriesLi);
    }
    preloader.classList.add('none');
    const link = categoriesСontent.querySelector(`[data-category="${urlProducts}"]`);
    if (link !== null) {
      setActiveMenuLink(link);
    }
  })
  .catch(function (error) {
    console.log('Что-то пошло не так', error);
  })

  // Нажимаем на категорию
categoriesСontent.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-category') == false) {
    return;
  }
  setActiveMenuLink(e.target);
  selectCategories(e.target.dataset.category);
  window.location.hash = e.target.dataset.category;
  e.preventDefault();
});

// Активная категория
function setActiveMenuLink(el) {
  const curentLink = categoriesСontent.querySelector(".active");
  if (curentLink !== null) {
    curentLink.classList.remove("active");
  }
  el.classList.add("active");
}

// Путь на выбраную категорию
function selectCategories(categ) {
  let url = "https://fakestoreapi.com/products/"; 
  if (categ == "electronics") {
    url = 'https://fakestoreapi.com/products/category/electronics';
  }
  if (categ == "jewelery") {
    url = 'https://fakestoreapi.com/products/category/jewelery';
 }
  if (categ == "men's clothing") {
    url = "https://fakestoreapi.com/products/category/men's clothing";
  }
  if (categ == "women's clothing") {
    url = "https://fakestoreapi.com/products/category/women's clothing";
  }
  requestProducts(url);
}

// Запрос на сервер по выбранной категории
function requestProducts(url) {
  preloader.classList.remove('none');
  fetch(url)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    while (content.hasChildNodes()) {  
      content.removeChild(content.firstChild);
    }
    for (let i = 0; i < data.length; i++) {
      const productDiv = createProduct(data[i]);
      content.appendChild(productDiv);
    }
    preloader.classList.add('none');
  })
  .catch(function (error) {
    console.log('Что-то пошло не так22', error);
  })
}