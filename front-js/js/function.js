const PROBLEM_COUNT = 5

const soundFiles = [
  '01_do',
  '02_re',
  '03_mi',
  '04_fa',
  '05_so',
  '06_ra',
  '07_shi'
]

const context = {
  name: '',
  score: 0,
  count: 1,
  answer: null,
}

const elements = {
  input: document.querySelector('.input'),
  playerName: document.querySelector('.player-name'),
  player: document.querySelector('#player'),
  playButton: document.querySelector('.play'),
  restartButton: document.querySelector('.restart'),
  startButton: document.querySelector('.start-button'),
  scaleButtons: document.querySelectorAll('.sound'),
  scoreText: document.querySelector('.score'),
  answerCount: document.querySelector('.answer-count'),
  finalScore: document.querySelector('.final-score'),
  scoreList: document.querySelector('.score-list'),
  wrongAudio: document.getElementById('wrong'),
  scenes: {
    start: document.querySelector('.start-scene'),
    game: document.querySelector('.game-scene'),
    result: document.querySelector('.result-scene')
  }
}

const incrementCount = () => {
  context.count++
}

const updateScore = () => {
  elements.scoreText.innerText = context.score
}

const updateAnswerCount = () => {
  elements.answerCount.innerText = Math.min(context.count, PROBLEM_COUNT)
}

const updatePlayerName = () => {
  elements.playerName.innerText = context.name
}

const updateFinalScore = () => {
  elements.finalScore = context.score
}

const updateScoreList = (data, currentScore) => {
  // TODO: スコア一覧の表示部分を実装してください
  
}



const makeQuestion = () => {
  context.answer = Math.floor(Math.random() * soundFiles.length)
  const fileName = soundFiles[context.answer]
  elements.player.setAttribute('src', `assets/mp3/${fileName}.mp3`)
}

const checkAnswer = (ans) => {
  const { score, answer } = context
  const { wrongAudio } = elements

  const correct = soundFiles[answer] === ans
  if (correct) {
    context.score += 200
    document.getElementById(ans).play()
  } else {
    context.score = Math.max(score - 100, 0)
    wrongAudio.play()
  }
  updateScore()
  return correct
}

const moveToGameScene = () => {
  const { start, game } = elements.scenes
  start.classList.add('is-hidden')
  game.classList.remove('is-hidden')

  onLoadGameScene()
}

const moveToResultScene = () => {
  const { game, result } = elements.scenes
  game.classList.add('is-hidden')
  result.classList.remove('is-hidden')

  onLoadResultScene()
}

const onLoadStartScene = () => {
  elements.startButton.addEventListener('click', () => {
    context.name = elements.input.value
    if (!context.name) {
      alert('プレイヤー名を入力してください')
      return
    }
    moveToGameScene()
  })
}


const onLoadGameScene = () => {
  const { player, playButton, scaleButtons } = elements
  updatePlayerName()
  makeQuestion()
  updateScore()
  updateAnswerCount()

  playButton.addEventListener('click', () => {
    player.play()
  })

  scaleButtons.forEach(item => {
    item.addEventListener('click', (e) => {
      const ans = e.target.getAttribute('data-key')
      if (checkAnswer(ans)) {
        incrementCount()
        if (context.count > PROBLEM_COUNT) {
          moveToResultScene()
          return
        }

        makeQuestion()
        updateAnswerCount()
      }
    })
  })
}

const onLoadResultScene = async () => {
  const { name, score } = context
  const { restartButton } = elements


  // 再挑戦用のボタン追加
  restartButton.addEventListener('click', () => {
    location.reload()
  })

  // 最終スコアの書き込み
  updateFinalScore()

  // スコアの保存・取得
  // TODO: スコア保存・スコア一覧の表示部分を実装してください
}

  

const fetchScoreList = async () => {
}

const createScore = async (params) => {
}

const init = onLoadStartScene

init()
