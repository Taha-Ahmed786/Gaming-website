    const puzzleContainer = document.getElementById("puzzle-container");
        const shuffleButton = document.getElementById("shuffle-btn");
        const winMessage = document.getElementById("win-message");
        const nextLevelButton = document.getElementById("next-level-btn");
        const levelDisplay = document.getElementById("level-display");

        let tiles = [];
        let level = 1; // Start at level 1

        // Initialize the game
        function initGame() {
            const gridSize = 3 + Math.floor((level - 1) / 10); // Increase grid size every 10 levels
            puzzleContainer.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
            puzzleContainer.style.width = `${gridSize * 100 + (gridSize - 1) * 5}px`;
            puzzleContainer.style.height = `${gridSize * 100 + (gridSize - 1) * 5}px`;

            tiles = [...Array(gridSize * gridSize - 1).keys()].map(num => num + 1); // Numbers
            tiles.push(""); // Empty tile
            renderPuzzle();
        }

        // Render puzzle on the screen
        function renderPuzzle() {
            puzzleContainer.innerHTML = "";
            tiles.forEach((tile, index) => {
                const tileDiv = document.createElement("div");
                tileDiv.className = "tile";
                if (tile === "") {
                    tileDiv.classList.add("empty");
                } else {
                    tileDiv.textContent = tile;
                }
                tileDiv.addEventListener("click", () => moveTile(index));
                puzzleContainer.appendChild(tileDiv);
            });
        }

        // Shuffle the puzzle
        function shuffleTiles() {
            for (let i = tiles.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
            }
            renderPuzzle();
        }

        // Move a tile
        function moveTile(index) {
            const emptyIndex = tiles.indexOf("");
            const gridSize = Math.sqrt(tiles.length);
            const isValidMove =
                [index - 1, index + 1, index - gridSize, index + gridSize].includes(emptyIndex) &&
                Math.abs(emptyIndex % gridSize - index % gridSize) !== gridSize - 1;

            if (isValidMove) {
                [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
                renderPuzzle();
                checkWin();
            }
        }

        // Check if the player has won
        function checkWin() {
            const isSolved = tiles.slice(0, -1).every((tile, i) => tile === i + 1);
            if (isSolved) {
                winMessage.style.display = "block";
            }
        }

        // Go to the next level
        nextLevelButton.addEventListener("click", () => {
            level++;
            levelDisplay.textContent = level;
            winMessage.style.display = "none";
            initGame();
        });

        shuffleButton.addEventListener("click", shuffleTiles);

        // Start the game
        initGame();