const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');

document.addEventListener('keydown', function (event) {
	jump();
});

// Звуковые файлы
let fly = new Audio(); // Создание аудио объекта
let score_audio = new Audio(); // Создание аудио объекта
let game_over = new Audio();

fly.src = 'audio/fly.mp3'; // Указание нужной записи
score_audio.src = 'audio/score.mp3'; // Аналогично
game_over.src = 'audio/game over.mp3';

function jump() {
	if (dino.classList !== 'jump') {
		dino.classList.add('jump');
		fly.play();
	}
	setTimeout(function () {
		dino.classList.remove('jump');
	}, 300); // каждые 300 мс удаляет класс "jump"
}

let isAlive = setInterval(function () {
	let dinoTop = parseInt(
		window.getComputedStyle(dino).getPropertyValue('top')
	);
	let cactusLeft = parseInt(
		window.getComputedStyle(cactus).getPropertyValue('left')
	);

	if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 320) {
		game_over.play();
		alert('GAME OVER');
	}
}, 10);
