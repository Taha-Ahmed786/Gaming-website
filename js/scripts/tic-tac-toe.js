   let currentPlayer = "X";
        let gameBoard = ["", "", "", "", "", "", "", "", ""];
        let gameOver = false;
        let winningCells = [];

        const cells = document.querySelectorAll(".cell");
        const gameMessage = document.getElementById("game-message");
        const restartButton = document.getElementById("restart-button");
        const modal = document.getElementById("endModal");
        const modalMessage = document.getElementById("modal-message");
        const closeModalButton = document.getElementById("close-modal");

        function startGame() {
            gameOver = false;
            currentPlayer = "X";
            gameBoard = ["", "", "", "", "", "", "", "", ""];
            winningCells = [];
            gameMessage.textContent = "Player X's turn!";
            cells.forEach(cell => {
                cell.textContent = "";
                cell.style.pointerEvents = "auto";
                cell.classList.remove("highlight");
                cell.style.color = "";
            });
            restartButton.disabled = false;
        }

        function checkWinner() {
            const winPatterns = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            for (let pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    winningCells = [a, b, c];
                    return gameBoard[a];
                }
            }
            return null;
        }

        function handleCellClick(event) {
            if (gameOver) return;

            const index = event.target.getAttribute("data-index");

            if (gameBoard[index] !== "") return;

            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;

            // Set color based on player
            event.target.style.color = currentPlayer === "X" ? "blue" : "red";

            const winner = checkWinner();
            if (winner) {
                gameMessage.textContent = `Player ${winner} wins!`;
                gameOver = true;
                highlightWinner();
                cells.forEach(cell => cell.style.pointerEvents = "none");
                showModal(`Player ${winner} wins!`);
                return;
            }

            if (!gameBoard.includes("")) {
                gameMessage.textContent = "It's a draw!";
                gameOver = true;
                cells.forEach(cell => cell.style.pointerEvents = "none");
                showModal("It's a draw!");
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            gameMessage.textContent = `Player ${currentPlayer}'s turn!`;
        }

        function highlightWinner() {
            winningCells.forEach(index => {
                cells[index].classList.add("highlight");
            });
        }

        function showModal(message) {
            modalMessage.textContent = message;
            modal.style.display = "flex"; // Show the modal
        }

        closeModalButton.addEventListener("click", () => {
            modal.style.display = "none"; // Close the modal
            startGame(); // Restart the game after closing the modal
        });

        restartButton.addEventListener("click", startGame);

        cells.forEach(cell => {
            cell.addEventListener("click", handleCellClick);
        });

        startGame();