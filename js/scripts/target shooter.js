 const gameContainer = document.getElementById("game-container");
        const scoreDisplay = document.getElementById("score");
        const timerDisplay = document.getElementById("timer");
        const missDisplay = document.getElementById("miss-counter");
        const restartButton = document.getElementById("restart-btn");

        let score = 0;
        let timeLeft = 30;
        let misses = 0;
        let gameInterval;

        // Function to generate a target within game container bounds
        function createTarget() {
            const target = document.createElement("div");
            target.classList.add("target");

            // Random Position (keeping it within game container bounds)
            const randomX = Math.floor(Math.random() * (gameContainer.offsetWidth - 100)); 
            const randomY = Math.floor(Math.random() * (gameContainer.offsetHeight - 100));

            target.style.left = `${randomX}px`;
            target.style.top = `${randomY}px`;

            gameContainer.appendChild(target);

            // Target Clicked
            target.addEventListener("click", () => {
                score++;
                scoreDisplay.innerHTML = `<i class="fas fa-star"></i> Score: ${score}`;
                target.remove();
                createTarget();
            });

            setTimeout(() => {
                if (target.parentNode) {
                    misses++;
                    missDisplay.innerHTML = `<i class="fas fa-times-circle"></i> Misses: ${misses} / 5`;
                    target.remove();
                    createTarget();
                    if (misses >= 5) {
                        endGame();
                    }
                }
            }, 1500);  // Reduced time interval to 1.5 seconds
        }

        // Timer Function
        function startTimer() {
            timerDisplay.innerHTML = `<i class="fas fa-clock"></i> Time Left: ${timeLeft}`;
            gameInterval = setInterval(() => {
                timeLeft--;
                timerDisplay.innerHTML = `<i class="fas fa-clock"></i> Time Left: ${timeLeft}`;
                if (timeLeft <= 0) {
                    endGame();
                }
            }, 1000);
        }

        // End Game
        function endGame() {
            clearInterval(gameInterval);
            gameContainer.innerHTML = '';
            const endMessage = document.createElement("div");
            endMessage.id = "game-over";
            endMessage.textContent = `Game Over! ?? Score: ${score}`;
            gameContainer.appendChild(endMessage);
            restartButton.style.display = "block";
        }

        // Restart Game
        function restartGame() {
            score = 0;
            timeLeft = 30;
            misses = 0;
            scoreDisplay.innerHTML = `<i class="fas fa-star"></i> Score: 0`;
            timerDisplay.innerHTML = `<i class="fas fa-clock"></i> Time Left: 30`;
            missDisplay.innerHTML = `<i class="fas fa-times-circle"></i> Misses: 0 / 5`;
            restartButton.style.display = "none";
            gameContainer.innerHTML = '';
            createTarget();
            startTimer();
        }

        // Start Game
        createTarget();
        startTimer();




