import '../styles/styles.scss';

import createRatingImg from './rating';

export default function createProduct(product) {
  // Создаем ДОМ елементы
  const div = document.createElement('div');
  div.classList = 'product';

  const productImage = document.createElement('div');
  productImage.classList = 'product__img';
  div.appendChild(productImage);

  const img = document.createElement('img');
  img.src = product.image;
  productImage.appendChild(img);

  const productTitle = document.createElement('h3');
  productTitle.classList = 'product__title';
  div.appendChild(productTitle);

  const productPrice = document.createElement('p');
  productPrice.classList = 'product__price';
  div.appendChild(productPrice);

  const productDescr = document.createElement('p');
  productDescr.classList = 'product__descr';
  div.appendChild(productDescr);

  const productRating = document.createElement('div');
  productRating.classList = 'product__rating';
  div.appendChild(productRating);

  const ratingImg = document.createElement('div');
  ratingImg.classList = 'product__rating__img';
  createRatingImg(product.rating.rate, ratingImg);
  productRating.appendChild(ratingImg);

  const ratingNumb = document.createElement('p');
  ratingNumb.classList = 'product__rating__numb';
  ratingImg.appendChild(ratingNumb);

  const productBtn = document.createElement('a');
  productBtn.classList = 'product__btn button';
  productRating.appendChild(productBtn);

  // Заполнение контентом
  productTitle.innerHTML = `${product.title.slice(0, 20)}...`;
  productPrice.innerHTML = `$${product.price}`;
  productDescr.innerHTML = `${product.description.slice(0, 20)}...`;
  ratingNumb.innerHTML = product.rating.rate;
  productBtn.innerHTML = 'Watch';
  productBtn.dataset.index = product.id;
  div.dataset.category = product.category;

  return div;
}
