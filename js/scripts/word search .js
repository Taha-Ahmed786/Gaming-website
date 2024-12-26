        const gridSize = 12;
        const countries = ["INDIA", "FRANCE", "CHINA", "CANADA", "BRAZIL"];
        const specialWord = "YARA";
        const totalLevels = 25;
        let currentLevel = 1;
        let timerInterval;
        let timer = 300; // 5 minutes in seconds
        let selectedLetters = [];

        const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));
        const directions = [
            [0, 1],   // Right
            [1, 0],   // Down
            [1, 1],   // Diagonal Down-Right
            [-1, 1],  // Diagonal Up-Right
        ];

        // Timer functionality
        function startTimer() {
            timerInterval = setInterval(() => {
                timer--;
                const minutes = Math.floor(timer / 60);
                const seconds = timer % 60;
                document.getElementById("timer").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                if (timer === 0) {
                    clearInterval(timerInterval);
                    document.getElementById("result").textContent = "Time's up! Game over!";
                }
            }, 1000);
        }

        // Place the word "YARA" vertically
        function placeSpecialWord() {
            for (let i = 0; i < specialWord.length; i++) {
                grid[i][0] = specialWord[i];
            }
        }

        // Word placement function
        function placeWord(word) {
            let placed = false;

            while (!placed) {
                const dir = directions[Math.floor(Math.random() * directions.length)];
                const startRow = Math.floor(Math.random() * gridSize);
                const startCol = Math.floor(Math.random() * gridSize);

                let canPlace = true;
                for (let i = 0; i < word.length; i++) {
                    const newRow = startRow + i * dir[0];
                    const newCol = startCol + i * dir[1];

                    if (
                        newRow < 0 || newRow >= gridSize ||
                        newCol < 0 || newCol >= gridSize ||
                        (grid[newRow][newCol] && grid[newRow][newCol] !== word[i])
                    ) {
                        canPlace = false;
                        break;
                    }
                }

                if (canPlace) {
                    for (let i = 0; i < word.length; i++) {
                        const newRow = startRow + i * dir[0];
                        const newCol = startCol + i * dir[1];
                        grid[newRow][newCol] = word[i];
                    }
                    placed = true;
                }
            }
        }

        // Fill the grid with random letters
        function fillGrid() {
            for (let r = 0; r < gridSize; r++) {
                for (let c = 0; c < gridSize; c++) {
                    if (!grid[r][c]) {
                        grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letters A-Z
                    }
                }
            }
        }

        // Render the grid and words
        function renderGame() {
            const container = document.getElementById("game-container");
            container.innerHTML = "";
            for (let r = 0; r < gridSize; r++) {
                for (let c = 0; c < gridSize; c++) {
                    const cell = document.createElement("div");
                    cell.textContent = grid[r][c];
                    cell.className = "cell";
                    cell.dataset.row = r;
                    cell.dataset.col = c;
                    container.appendChild(cell);
                }
            }

            const wordList = document.getElementById("word-list");
            countries.concat(specialWord).forEach(word => {
                const wordElem = document.createElement("div");
                wordElem.textContent = word;
                wordElem.className = "word";
                wordElem.dataset.word = word;
                wordList.appendChild(wordElem);
            });
        }

        // Handle cell click
        function handleCellClick(e) {
            const cell = e.target;
            if (!cell.classList.contains("cell")) return;

            if (!cell.classList.contains("found")) {
                cell.classList.add("found");
                selectedLetters.push(cell.textContent);

                // Check if a word is formed
                checkWords();
            }
        }

        function checkWords() {
            const currentSelection = selectedLetters.join("");
            countries.concat(specialWord).forEach(word => {
                if (currentSelection.includes(word)) {
                    markWordFound(word);
                    selectedLetters = [];
                }
            });

            // Win condition
            const allWordsFound = document.querySelectorAll('.word.found').length === (countries.length + 1);
            if (allWordsFound) {
                document.getElementById("result").textContent = "Congratulations! You've found all the words!";
                clearInterval(timerInterval);  // Stop the timer
            }
        }

        function markWordFound(word) {
            const wordElements = document.querySelectorAll('.word');
            wordElements.forEach(wordElem => {
                if (wordElem.dataset.word === word) {
                    wordElem.classList.add("found");
                    wordElem.style.textDecoration = "line-through";
                }
            });
        }

        // Game Initialization
        function initGame() {
            document.getElementById("result").textContent = ""; // Reset result
            placeSpecialWord();
            countries.forEach(placeWord);
            fillGrid();
            renderGame();
            startTimer();
            document.getElementById("game-container").addEventListener("click", handleCellClick);
            document.getElementById("start-button").style.display = 'none';  // Hide start button once game starts
        }