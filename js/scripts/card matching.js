        const gameBoard = document.getElementById('gameBoard');
        const message = document.getElementById('message');
        const restartBtn = document.getElementById('restartBtn');

        const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        let cards = [...cardValues, ...cardValues];  // Duplicate values for pairs
        let flippedCards = [];
        let matchedCards = 0;

        // Function to shuffle cards
        function shuffleCards() {
            for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[j]] = [cards[j], cards[i]];
            }
        }

        // Create card elements
        function createBoard() {
            gameBoard.innerHTML = '';
            for (let i = 0; i < cards.length; i++) {
                const card = document.createElement('div');
                card.classList.add('card');
                card.setAttribute('data-value', cards[i]);
                card.addEventListener('click', flipCard);
                gameBoard.appendChild(card);
            }
        }

        // Flip a card
        function flipCard(event) {
            const clickedCard = event.target;

            if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped') && !clickedCard.classList.contains('matched')) {
                clickedCard.classList.add('flipped');
                clickedCard.textContent = clickedCard.getAttribute('data-value');
                flippedCards.push(clickedCard);

                if (flippedCards.length === 2) {
                    checkMatch();
                }
            }
        }

        // Check if two flipped cards match
        function checkMatch() {
            if (flippedCards[0].getAttribute('data-value') === flippedCards[1].getAttribute('data-value')) {
                flippedCards[0].classList.add('matched');
                flippedCards[1].classList.add('matched');
                flippedCards = [];
                matchedCards++;

                if (matchedCards === cardValues.length) {
                    message.textContent = "Congratulations! You've matched all pairs!";
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

        // Restart the game
        function restartGame() {
            cards = [...cardValues, ...cardValues];
            shuffleCards();
            createBoard();
            flippedCards = [];
            matchedCards = 0;
            message.textContent = '';
        }

        // Start the game
        shuffleCards();
        createBoard();

        restartBtn.addEventListener('click', restartGame);
