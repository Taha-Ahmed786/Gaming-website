        const gameContainer = document.getElementById('game-container');
        const basket = document.getElementById('basket');
        const scoreDisplay = document.getElementById('score');
        const gameOverDisplay = document.getElementById('game-over');
        const restartBtn = document.getElementById('restart-btn');

        const fruitEmojis = ['🍎', '🍌', '🍓', '🍇', '🍉'];
        const gameWidth = 400;
        const gameHeight = 600;
        const fruitSpawnIntervalBase = 1000;
        let fruitSpeed = 3; // Starting speed for the fruits

        let score = 0;
        let missed = 0;
        const maxMissed = 5;
        let gameActive = true;

        // Mouse movement for the basket
        gameContainer.addEventListener('mousemove', (e) => {
            const containerRect = gameContainer.getBoundingClientRect();
            const mouseX = e.clientX - containerRect.left;
            const basketWidth = basket.offsetWidth;
            
            // Ensure basket stays within game container bounds
            const newLeft = Math.max(0, Math.min(mouseX - basketWidth / 2, gameWidth - basketWidth));
            basket.style.left = newLeft + 'px';
        });

        // Spawn fruits
        function spawnFruit() {
            if (!gameActive) return;

            const fruit = document.createElement('div');
            fruit.classList.add('fruit');
            fruit.textContent = fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];
            fruit.style.left = Math.random() * (gameWidth - 30) + 'px'; // Ensure fruit is within bounds
            fruit.style.top = '0px'; // Start at top of game container

            gameContainer.appendChild(fruit);

            let fallInterval = setInterval(() => {
                if (!gameActive) {
                    clearInterval(fallInterval);
                    fruit.remove();
                    return;
                }

                const fruitRect = fruit.getBoundingClientRect();
                const basketRect = basket.getBoundingClientRect();

                // Check if fruit is caught by basket
                if (
                    fruitRect.bottom >= basketRect.top &&
                    fruitRect.left < basketRect.right &&
                    fruitRect.right > basketRect.left
                ) {
                    score++;
                    scoreDisplay.textContent = `Score: ${score}`;

                    // Increase speed every 100 score
                    if (score % 100 === 0) {
                        fruitSpeed += 1;
                    }

                    fruit.remove();
                    clearInterval(fallInterval);
                }
                // Check if fruit falls out of bounds
                else if (fruitRect.top >= gameHeight) {
                    missed++;
                    if (missed >= maxMissed) {
                        endGame();
                    }
                    fruit.remove();
                    clearInterval(fallInterval);
                }

                // Move the fruit down
                fruit.style.top = fruit.offsetTop + fruitSpeed + 'px';
            }, 10);
        }

        // End the game
        function endGame() {
            gameActive = false;
            gameOverDisplay.style.display = 'block';
        }

        // Restart game
        restartBtn.addEventListener('click', () => {
            score = 0;
            missed = 0;
            fruitSpeed = 3; // Reset fruit speed
            gameActive = true;
            scoreDisplay.textContent = 'Score: 0';
            gameOverDisplay.style.display = 'none';
            resetGame();
        });

        // Reset the game state
        function resetGame() {
            const fruits = document.querySelectorAll('.fruit');
            fruits.forEach((fruit) => fruit.remove());
            basket.style.left = '50%'; // Reset basket position to the center
        }

        // Game loop to spawn fruits at intervals
        setInterval(spawnFruit, fruitSpawnIntervalBase);