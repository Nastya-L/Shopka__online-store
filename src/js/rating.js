import '../styles/styles.scss';

import starHalf from '../public/images/star-half.png';
import star from '../public/images/star.png';

export default function createRatingImg(rate, targetEl) {
  for (let i = 0; i < rate; i += 1) {
    const image = document.createElement('img');
    if ((rate - i) < 1) {
      image.src = starHalf;
    } else {
      image.src = star;
    }
    targetEl.appendChild(image);
  }
  return targetEl;
}
