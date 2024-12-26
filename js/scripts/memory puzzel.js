 const gameContainer = document.getElementById('game-container');
        const scoreDisplay = document.getElementById('score');
        const gameOverMessage = document.getElementById('game-over');
        const levelDisplay = document.getElementById('level');

        const cardSets = [
            ['🍎', '🍌', '🍊', '🍓', '🍉', '🍇', '🍍', '🍒', '🍎', '🍌', '🍊', '🍓', '🍉', '🍇', '🍍', '🍒'],
            ['🍟', '🍔', '🍕', '🌭', '🍿', '🥤', '🍩', '🍪', '🍟', '🍔', '🍕', '🌭', '🍿', '🥤', '🍩', '🍪'],
            ['🐶', '🐱', '🐰', '🐯', '🐼', '🐸', '🦄', '🐵', '🐶', '🐱', '🐰', '🐯', '🐼', '🐸', '🦄', '🐵'],
            ['⚽', '🏀', '🎾', '🏈', '🏐', '🥏', '🥍', '🏑', '⚽', '🏀', '🎾', '🏈', '🏐', '🥏', '🥍', '🏑'],
            ['🚗', '🚙', '🚓', '🚑', '🚕', '🚎', '🚌', '🚎', '🚗', '🚙', '🚓', '🚑', '🚕', '🚎', '🚌', '🚎'],
            ['🌎', '🌍', '🌕', '🌞', '💧', '🔥', '🌬', '🌸', '🌎', '🌍', '🌕', '🌞', '💧', '🔥', '🌬', '🌸'],
            ['🍓', '🍒', '🍊', '🍇', '🥝', '🍍', '🥥', '🍎', '🍓', '🍒', '🍊', '🍇', '🥝', '🍍', '🥥', '🍎'],
            ['🚀', '🛸', '🌕', '🌌', '🛳', '⛵', '🛶', '🚢', '🚀', '🛸', '🌕', '🌌', '🛳', '⛵', '🛶', '🚢'],
            ['🌧', '🌩', '⛅', '☀️', '🌨', '🌫', '🌪', '💨', '🌧', '🌩', '⛅', '☀️', '🌨', '🌫', '🌪', '💨'],
            ['🐙', '🐳', '🐡', '🦈', '🐠', '🦑', '🦋', '🐚', '🐙', '🐳', '🐡', '🦈', '🐠', '🦑', '🦋', '🐚']
        ];

        let shuffledCards = [];
        let flippedCards = [];
        let matchedCards = [];
        let score = 0;
        let currentLevel = 0;

        // Shuffle cards for each level
        function shuffleCards() {
            shuffledCards = cardSets[currentLevel].sort(() => Math.random() - 0.5);
        }

        // Create the game board for each level
        function createGameBoard() {
            gameContainer.innerHTML = '';
            for (let i = 0; i < shuffledCards.length; i++) {
                const card = document.createElement('div');
                card.classList.add('card');
                card.dataset.value = shuffledCards[i];
                card.addEventListener('click', flipCard);
                gameContainer.appendChild(card);
            }
        }

        // Flip the card
        function flipCard(e) {
            const card = e.target;

            if (flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
                return;
            }

            card.classList.add('flipped');
            card.textContent = card.dataset.value;
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                checkForMatch();
            }
        }

        // Check if two flipped cards match
        function checkForMatch() {
            if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
                flippedCards[0].classList.add('matched');
                flippedCards[1].classList.add('matched');
                flippedCards = [];
                score++;
                scoreDisplay.textContent = `Score: ${score}`;

                if (score === cardSets[currentLevel].length / 2) {
                    if (currentLevel < 9) {
                        currentLevel++;
                        levelDisplay.textContent = `Level: ${currentLevel + 1}`;
                        setTimeout(() => {
                            resetGame();
                            shuffleCards();
                            createGameBoard();
                        }, 1000);
                    } else {
                        gameOver();
                    }
                }
            } else {
                setTimeout(() => {
                    flippedCards[0].classList.remove('flipped');
                    flippedCards[1].classList.remove('flipped');
                    flippedCards[0].textContent = '';
                    flippedCards[1].textContent = '';
                    flippedCards = [];
                }, 1000);
            }
        }

        // Game Over
        function gameOver() {
            gameOverMessage.style.display = 'block';
            setTimeout(() => {
                gameOverMessage.style.display = 'none';
                resetGame();
            }, 2000);
        }

        // Reset the game for the next level
        function resetGame() {
            score = 0;
            scoreDisplay.textContent = 'Score: 0';
            flippedCards = [];
            matchedCards = [];
        }

        // Start the game
        function startGame() {
            shuffleCards();
            createGameBoard();
        }

        startGame();
    </script>