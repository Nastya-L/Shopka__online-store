import '../styles/styles.scss';

export default function createFault(parent, titleError) {
  const fault = document.createElement('div');
  fault.classList = 'fault';
  parent.appendChild(fault);

  const faultTitle = document.createElement('h2');
  fault.appendChild(faultTitle);
  faultTitle.innerHTML = titleError;
}
