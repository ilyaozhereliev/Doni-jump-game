const gameStarted = () => {
  console.log('GAME START !_!')
  const startButton = document.getElementById('startGame')
  startButton.classList.add('displayNone')

  const score = document.querySelector('.score')
  const alert = document.querySelector('.alert')
  const result = document.querySelector('.result')
  const gameField = document.getElementById('gameField')

  gameField.classList.remove('displayNone')

  const dino = document.querySelector('.dino')
  const game = document.querySelector('.game')
  let isJumping = false
  let gravity = 0.9
  let isGameOver = false
  let distance = 0
  // Рандомная генерация банков
  const banks = ['sberbank', 'alfa', 'tinkoff', 'vtb', 'raif']
  let randomBank = () => Math.floor(Math.random() * banks.length)
  // Звуковые файлы
  let fly = new Audio() // Создание аудио объекта
  let score_audio = new Audio() // Создание аудио объекта
  let game_over = new Audio()
  let mainTheme = new Audio()
  fly.src = 'audio/fly.mp3' // Указание нужной записи
  score_audio.src = 'audio/score.mp3' // Аналогично
  game_over.src = 'audio/game over.mp3'
  mainTheme.src = 'audio/hp song.mp3'

  // Старт основной мелодии при запуске игры
  mainTheme.play()

  // Прыжок по нажатию на пробел
  const control = (e) => {
    if (e.keyCode === 32) {
      dino.classList.add('jump')
      fly.play()
      if (!isJumping) {
        isJumping = true
        jump()
      }
    }
  }
  // Событие срабатывает, когда клавмша нажата
  document.addEventListener('keydown', control)

  let position = 15

  function jump() {
    dino.classList.replace('.doni', '.jump')

    let count = 15
    let timerId = setInterval(function () {
      // Приземление
      if (count === 45) {
        clearInterval(timerId)
        let downTimerId = setInterval(function () {
          if (count === 15) {
            clearInterval(downTimerId)
            isJumping = false
          }
          position += 1
          count--
          position = position * gravity
          dino.style.bottom = position + 'px'
          dino.classList.remove('jump')
        }, 13)
      }
      // Подъем
      count++
      position += 30
      position = position * gravity
      dino.style.bottom = position + 'px'
    }, 10)
  }

  // Случайный генератор препятствий
  function generateBlocks() {
    const randomInteger = (min, max) =>
      Math.floor(Math.random() * (max - min)) + min

    let randomTime = randomInteger(900, 1800)
    let blockPosition = 1000

    const block = document.createElement('div')
    if (!isGameOver) block.classList.add('block')
    game.appendChild(block)
    block.style.left = blockPosition + 'px'

    banks.forEach((bank) => block.classList.remove(`background-${bank}`))
    block.classList.add(`background-${banks[randomBank()]}`)

    let timerId = setInterval(function () {
      distance++
      score.innerHTML = distance
      if (blockPosition > 80 && blockPosition < 390 && position < 80) {
        clearInterval(timerId)
        game_over.play()
        alert.innerHTML = `Game Over!`
        result.innerHTML = `You were able to earn $${distance}`
        distance = 0
        isGameOver = true

        const restartButton = document.getElementById('restart')
        restartButton.classList.remove('displayNone')
        restartButton.addEventListener('click', () => {
          window.location.href = window.location.href
        })
        document.onkeydown = (e) => {
          if (e.keyCode === 32) {
            window.location.href = window.location.href
          }
        }

        gameField.remove()
      }
      blockPosition -= 10
      block.style.left = blockPosition + 'px'
    }, randomInteger(6, 14))
    if (!isGameOver) setTimeout(generateBlocks, randomTime)
  }
  generateBlocks()
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', gameStarted)

  const gameStartedOnSpace = (e) => {
    if (e.keyCode === 32) {
      gameStarted()
      document.removeEventListener('keydown', gameStartedOnSpace)
    }
  }
  document.addEventListener('keydown', gameStartedOnSpace)
})
