import Score from './score.js';
import ScoreList from './display.js';

const scoreList = new ScoreList();

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/5i0QZaOi8b4LzXZ3l4iE/scores/';

const fetchScores = async () => {
  const data = await fetch(url);
  const json = await data.json();
  return json.result;
};

const renderScore = (obj) => {
  const scoreEl = document.createElement('li');
  scoreEl.classList.add('score-item');
  scoreEl.setAttribute('value', obj.id);
  scoreEl.innerHTML = `
        <h3>${obj.user} : ${obj.score} </h3>
    `;
  document.querySelector('.list').appendChild(scoreEl);
};

const refreshScores = async () => {
  scoreList.list = await fetchScores();
  const list = document.querySelector('.list');
  list.innerHTML = '';
  scoreList.list.forEach((obj) => renderScore(obj));
};

const addScore = async () => {
  const user = document.querySelector('#name').value;
  const score = document.querySelector('#score').value;
  if (user === '' || score === '' || score < 0) {
    throw new Error('Please fill in the fields');
  } else {
    document.querySelector('#name').value = '';
    document.querySelector('#score').value = '';

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(new Score(user, score)),
    });
    refreshScores();
  }
};

export {
  addScore, refreshScores,
};