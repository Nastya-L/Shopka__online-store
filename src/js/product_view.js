import "../styles/styles.scss"

import starHalf from "../public/images/star-half.png"
import star from "../public/images/star.png"

// Модальное окно, информация о товаре
const modal = document.querySelector(".modal");
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
  const modalContainer = document.createElement("div");
  modalContainer.classList = "modal__container";

  const btnClose = document.createElement("button");
  btnClose.classList = "btn-close";
  modalContainer.appendChild(btnClose);

  modalImg = document.createElement("div");
  modalImg.classList = "modal__img loading";
  modalContainer.appendChild(modalImg);

  imgModal = document.createElement("img");
  modalImg.appendChild(imgModal);

  const modalProduct = document.createElement("div");
  modalProduct.classList = "modal__product";
  modalContainer.appendChild(modalProduct);

  modalTitle = document.createElement("h3");
  modalTitle.classList = "modal__title product__title loading";
  modalProduct.appendChild(modalTitle);

  modalPrice = document.createElement("p");
  modalPrice.classList = "modal__price product__price loading";
  modalProduct.appendChild(modalPrice);

  modalDescr = document.createElement("p");
  modalDescr.classList = "modal__descr product__descr loading";
  modalProduct.appendChild(modalDescr);

  modalRating = document.createElement("div");
  modalRating.classList = "modal__rating product__rating loading";
  modalProduct.appendChild(modalRating);

  modalRatingImg = document.createElement("div");
  modalRatingImg.classList = "modal__rating__img product__rating__img loading";
  modalRating.appendChild(modalRatingImg);

  modalRatingNumb = document.createElement("p");
  modalRatingNumb.classList = "modal__rating__numb product__rating__numb loading";
  modalRatingImg.appendChild(modalRatingNumb);

  modalBtn = document.createElement("button");
  modalBtn.classList = "modal__btn button loading";
  modalProduct.appendChild(modalBtn);

  // Заполнение контентом 
  btnClose.innerHTML = 'X';

  btnClose.addEventListener('click', (e) => {
    modal.classList.add('none');
    while (modal.hasChildNodes()) {  
      modal.removeChild(modal.firstChild);
    }
  })

  return modalContainer;
}

function fillModal(product) {
  // Заполнение контентом  
  for (let i = 0; i < product.rating.rate; i++) {
    const image = document.createElement("img");
    if ((product.rating.rate - i) < 1) {
      image.src = starHalf;
    } else {
      image.src = star;
    }
    modalRatingImg.appendChild(image);
  }
  imgModal.src = product.image;
  modalTitle.innerHTML = product.title;
  modalPrice.innerHTML = '$' + product.price;
  modalDescr.innerHTML = product.description;
  modalRatingNumb.innerHTML = product.rating.rate;
  modalBtn.innerHTML = 'Add to cart';

  modalTitle.classList.remove("loading");
  modalPrice.classList.remove("loading");
  modalDescr.classList.remove("loading");
  modalRating.classList.remove("loading");
  modalRatingImg.classList.remove("loading");
  modalRatingNumb.classList.remove("loading");
  modalBtn.classList.remove("loading");
  modalImg.classList.remove("loading");
}

export default function requestProduct(index) {
    modal.classList.remove('none');
    const modalWindow = createModal();
    modal.appendChild(modalWindow);

    const url = 'https://fakestoreapi.com/products/' + index;
    fetch(url)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
      setTimeout(fillModal, 1000, data); // Чтобы показать Прелоадер
    })
    .catch(function (error) {
        console.log('Что-то пошло не так', error);
  })
}