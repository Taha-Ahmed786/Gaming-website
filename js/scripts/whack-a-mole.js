        let score = 0;
        let misses = 0;
        const maxMisses = 5;
        let gameInterval;
        let moleTimeout;
        let currentLevel = 1;
        let moleSpeed = 1500; // Speed of the mole (starts at 1500ms)
        let isPlaying = false;

        const scoreElement = document.querySelector('.score');
        const levelElement = document.querySelector('.level');
        const startButton = document.getElementById('startButton');
        const resetButton = document.getElementById('resetButton');

        const holes = document.querySelectorAll('.hole');
        const moles = document.querySelectorAll('.mole');
        const gameOverMessage = document.getElementById('gameOverMessage');
        const finalScore = document.getElementById('finalScore');

        // Function to start the game
        function startGame() {
            score = 0;
            misses = 0;
            currentLevel = 1;
            moleSpeed = 1500; // Reset speed
            scoreElement.textContent = `Score: ${score} | Misses: ${misses}`;
            levelElement.textContent = `Level: ${currentLevel}`;
            isPlaying = true;
            startButton.style.display = 'none';
            resetButton.style.display = 'inline-block';
            showMole();
        }

        // Function to reset the game
        function resetGame() {
            score = 0;
            misses = 0;
            currentLevel = 1;
            moleSpeed = 1500; // Reset speed
            scoreElement.textContent = `Score: ${score} | Misses: ${misses}`;
            levelElement.textContent = `Level: ${currentLevel}`;
            isPlaying = false;
            startButton.style.display = 'inline-block';
            resetButton.style.display = 'none';
            clearInterval(gameInterval);
            clearTimeout(moleTimeout);
            hideAllMoles();
            gameOverMessage.style.display = 'none';
        }

        // Function to show a random mole (with speedup for each level)
        function showMole() {
            if (!isPlaying) return;

            const randomHole = Math.floor(Math.random() * holes.length);
            const mole = moles[randomHole];
            mole.classList.remove('hidden');

            // Slow down the appearance of moles (speed increases after each level)
            moleTimeout = setTimeout(() => {
                mole.classList.add('hidden');
                showMole(); // Repeat mole appearance after a short delay
                checkLevelUp();
            }, moleSpeed); // Mole speed depends on level

            holes[randomHole].addEventListener('click', () => {
                if (mole.classList.contains('hidden')) return;
                
                // Correct hit: increase score
                score++;
                scoreElement.textContent = `Score: ${score} | Misses: ${misses}`;
                mole.classList.add('hidden');
                showMole();
            });

            // If the mole disappears, count it as a miss
            setTimeout(() => {
                if (!mole.classList.contains('hidden')) {
                    misses++;
                    scoreElement.textContent = `Score: ${score} | Misses: ${misses}`;
                    mole.classList.add('hidden');
                    if (misses >= maxMisses) {
                        gameOver();
                    }
                }
            }, moleSpeed); // Mole disappearing after a speed-based time delay
        }

        // Check if it's time to level up
        function checkLevelUp() {
            if (score >= currentLevel * 10) { // Level up when score reaches (level * 10)
                currentLevel++;
                moleSpeed = Math.max(1000, moleSpeed - 100); // Speed up (minimum speed 1000ms)
                levelElement.textContent = `Level: ${currentLevel}`;
            }
        }

        // Hide all moles
        function hideAllMoles() {
            moles.forEach(mole => mole.classList.add('hidden'));
        }

        // Custom Game Over Message
        function gameOver() {
            isPlaying = false;
            finalScore.textContent = score;
            gameOverMessage.style.display = 'block'; // Display the custom game over box
            scoreElement.textContent = `Score: ${score} | Misses: ${misses}`;
            startButton.style.display = 'inline-block';
            resetButton.style.display = 'none';
        }

        startButton.addEventListener('click', startGame);
        resetButton.addEventListener('click', resetGame);