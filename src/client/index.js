import { performAction } from './js/app';

import './styles/style.scss';



export { performAction };

// Event listener for genrate button
document.getElementById('generate').addEventListener('click', performAction);
