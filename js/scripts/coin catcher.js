 const player = document.getElementById('player');
        const coin = document.getElementById('coin');
        const scoreText = document.getElementById('score');
        const gameOverText = document.getElementById('game-over');
        const gameContainer = document.querySelector('.game-container');

        let score = 0;
        let playerSpeed = 10;   // Player speed slightly increased
        let coinSpeed = 2;      // Coin speed reduced
        let coinPosition = { x: Math.random() * (gameContainer.offsetWidth - 35), y: -35 };
        let missedCount = 0;    // Track number of misses

        // Move the player
        function movePlayer(event) {
            if (missedCount >= 3) return;  // Prevent player movement after game over

            const containerWidth = gameContainer.offsetWidth;
            let newX = player.offsetLeft;

            if (event.key === 'ArrowLeft' && newX > 0) {
                newX -= playerSpeed;
            } else if (event.key === 'ArrowRight' && newX < containerWidth - player.offsetWidth) {
                newX += playerSpeed;
            }

            // Ensure player stays within the container
            player.style.left = newX + 'px';
        }

        // Move the coin
        function moveCoin() {
            if (missedCount >= 3) return;  // Stop coin movement if game over

            coinPosition.y += coinSpeed;

            // Prevent the coin from going outside the container's bottom edge
            if (coinPosition.y > gameContainer.offsetHeight) {
                coinPosition.y = -35; // Reset coin to the top
                coinPosition.x = Math.random() * (gameContainer.offsetWidth - 35);
                missedCount++;  // Increment missed count

                if (missedCount === 3) {
                    endGame();  // Game over
                }
            }

            coin.style.left = coinPosition.x + 'px';
            coin.style.top = coinPosition.y + 'px';
        }

        // Check if player caught the coin
        function checkCollision() {
            if (missedCount >= 3) return;  // Stop checking for collision if game over

            const coinRect = coin.getBoundingClientRect();
            const playerRect = player.getBoundingClientRect();

            if (
                coinRect.top < playerRect.bottom &&
                coinRect.bottom > playerRect.top &&
                coinRect.left < playerRect.right &&
                coinRect.right > playerRect.left
            ) {
                // Coin caught
                score++;
                scoreText.textContent = `Score: ${score}`;

                // Reset coin position
                coinPosition.y = -35;
                coinPosition.x = Math.random() * (gameContainer.offsetWidth - 35);
            }
        }

        // Display Game Over
        function endGame() {
            gameOverText.style.display = 'block'; // Show Game Over message
            scoreText.style.display = 'none';    // Hide score
        }

        // Game loop to update game logic
        function gameLoop() {
            moveCoin();
            checkCollision();
            requestAnimationFrame(gameLoop);
        }

        // Add event listener for player movement
        document.addEventListener('keydown', movePlayer);
        gameLoop();