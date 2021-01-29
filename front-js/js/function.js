
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
  elements.finalScore.innerText = context.score
}

const updateScoreList = (data, currentScore) => {
  // TODO: スコア一覧の表示部分を実装してください　→取ってきたJSONをDOM操作で、HTML等に変換する関数

  data.forEach((item, index) => {
    const list = document.createElement('li')
    list.classList.add('score-item')
    list.innerHTML = `
      <div>
        <p>
          ${index+1}. ${item.name}
        </p>
      </div>
      <div class="score-result">
        <p>
          ${item.score}
        </p>
      </div>
    `
    if (item._id === currentScore._id) {
      list.classList.add('current')
      setTimeout(() => {
        list.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }, 500)
    }
    elements.scoreList.appendChild(list)
  })
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

//最初のスタート画面。
const onLoadStartScene = async() => {
  
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
    const record = await createScore({
      name,
      score
    })
    const data = await fetchScoreList()
    updateScoreList(data, record)
  }

const fetchScoreList = async () => {
  //取得・・・GETメソッド(保存しておいたデータを一覧で取得する)
  const data = await fetch('http://localhost:3300/api/v1/scores')//GETメソッドの定数→○
  return await data.json() //GETでDBからとって来たものをjsonでreturn
}

const createScore = async (params) => {//保存・・・POSTメソッド(先に結果をDBに保存する。その後でGETで一覧取得し、プレイヤーのものだけDOM操作)
    const data = await fetch('http://localhost:3300/api/v1/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    return await data.json()//追加→成功。JSON形式で入っていた。DBにも同じ内容が入っている。
  }

const init = onLoadStartScene

init()

