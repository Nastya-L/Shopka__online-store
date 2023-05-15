import '../styles/styles.scss';

import createRatingImg from './rating';
import * as endpoint from './api_endpoints';
import createFault from './fault';

// Модальное окно, информация о товаре
const modal = document.querySelector('.modal');
let modalTitle;
let modalPrice;
let modalDescr;
let modalRating;
let modalRatingImg;
let modalRatingNumb;
let modalBtn;
let imgModal;
let modalImg;

function createModal() {
  const modalContainer = document.createElement('div');
  modalContainer.classList = 'modal__container';

  const btnClose = document.createElement('button');
  btnClose.classList = 'btn-close';
  modalContainer.appendChild(btnClose);

  modalImg = document.createElement('div');
  modalImg.classList = 'modal__img loading';
  modalContainer.appendChild(modalImg);

  imgModal = document.createElement('img');
  modalImg.appendChild(imgModal);

  const modalProduct = document.createElement('div');
  modalProduct.classList = 'modal__product';
  modalContainer.appendChild(modalProduct);

  modalTitle = document.createElement('h3');
  modalTitle.classList = 'modal__title product__title loading';
  modalProduct.appendChild(modalTitle);

  modalPrice = document.createElement('p');
  modalPrice.classList = 'modal__price product__price loading';
  modalProduct.appendChild(modalPrice);

  modalDescr = document.createElement('p');
  modalDescr.classList = 'modal__descr product__descr loading';
  modalProduct.appendChild(modalDescr);

  modalRating = document.createElement('div');
  modalRating.classList = 'modal__rating product__rating loading';
  modalProduct.appendChild(modalRating);

  modalRatingImg = document.createElement('div');
  modalRatingImg.classList = 'modal__rating__img product__rating__img loading';
  modalRating.appendChild(modalRatingImg);

  modalRatingNumb = document.createElement('p');
  modalRatingNumb.classList = 'modal__rating__numb product__rating__numb loading';
  modalRatingImg.appendChild(modalRatingNumb);

  modalBtn = document.createElement('button');
  modalBtn.classList = 'modal__btn button loading';
  modalProduct.appendChild(modalBtn);

  // Заполнение контентом
  btnClose.innerHTML = 'X';

  btnClose.addEventListener('click', () => {
    modal.classList.add('none');
    while (modal.hasChildNodes()) {
      modal.removeChild(modal.firstChild);
    }
  });

  return modalContainer;
}

function removeLoading() {
  modalTitle.classList.remove('loading');
  modalPrice.classList.remove('loading');
  modalDescr.classList.remove('loading');
  modalRating.classList.remove('loading');
  modalRatingImg.classList.remove('loading');
  modalRatingNumb.classList.remove('loading');
  modalBtn.classList.remove('loading');
  modalImg.classList.remove('loading');
}

function fillModal(product) {
  createRatingImg(product.rating.rate, modalRatingImg);
  imgModal.src = product.image;
  modalTitle.innerHTML = product.title;
  modalPrice.innerHTML = `$${product.price}`;
  modalDescr.innerHTML = product.description;
  modalRatingNumb.innerHTML = product.rating.rate;
  modalBtn.innerHTML = 'Add to cart';
  removeLoading();
}

export default function requestProduct(index) {
  modal.classList.remove('none');
  const modalWindow = createModal();
  modal.appendChild(modalWindow);

  const url = `${endpoint.routeProducts}${index}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => setTimeout(fillModal, 1000, data)) // Чтобы показать Прелоадер
    .catch(() => {
      createFault(modal, 'Server not responding');
      removeLoading();
    });
}
