import './styles/main.css';

import { addScore, refreshScores } from './modules/apiCall.js';

const addScoreBtn = document.querySelector('.submit-btn');
const refreshBtn = document.querySelector('.refresh-btn');

addScoreBtn.addEventListener('click', addScore);
refreshBtn.addEventListener('click', refreshScores);

window.onload = () => {
  refreshScores();
};