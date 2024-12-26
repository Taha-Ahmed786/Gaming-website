const words = ["hello", "world", "challenge", "javascript", "coding", "fast", "speed", "programming", "game", "typing", 
        "beautiful", "amazing", "incredible", "quick", "efficient", "keyboard", "master", "code", "practice", "improve",
        "writing", "speedy", "smart", "tasks", "fastest", "results", "teamwork", "focus", "concentration", "learning",
        "perfect", "knowledge", "love", "innovation", "creative", "success", "productivity", "training", "passion", "explore",
        "energy", "action", "brilliant", "consistency", "solutions", "ideas", "communication", "effort", "organization", "motivation",
        "determination", "growth", "excellence", "strength", "discipline", "work", "achievements", "goals", "technology", "strive",
        "skills", "ambition", "leader", "team", "vision", "motivate", "confidence", "problem-solving", "strategy", "creativity", 
        "advantage", "analysis", "cooperation", "development", "leadership", "clarity", "decisions", "commitment", "values", 
        "winning", "focus", "effectiveness", "objectives", "momentum", "strategy", "inspiration", "organization", "collaboration",
        "focus", "passion", "creativity", "achieve", "unity", "communication", "help", "quality", "integrity", "understanding",
        "discipline", "team", "drive", "action", "optimism", "goal", "balance", "discipline", "nurture", "success", "embrace",
        "harmony", "persistence", "resilience", "compassion", "opportunity", "drive", "force", "growth", "success", "leap", 
        "potential", "plan", "solve", "relationship", "collaboration", "enthusiasm", "creators", "imagine", "hope", "respect",
        "enlighten", "grit", "challenge", "leadership", "cooperation", "strategy", "advance", "believe", "conquer", "determination",
        "adjustment", "balance", "insight", "learn", "sharpen", "manage", "achieve", "support", "forward", "apply", "evolve", 
        "career", "seek", "upskill", "inspire", "mindset", "knowledge", "generate", "better", "mindset", "talent", "explore",
        "possibilities", "maximize", "improve"];

        let currentWord = "";
        let score = 0;
        let timer = 50;
        let level = 1;
        let timerInterval;
        let gameStarted = false;

        function startGame() {
            if (gameStarted) return;
            gameStarted = true;
            score = 0;
            timer = 50;
            level = 1;
            document.getElementById("score").textContent = `Score: ${score}`;
            document.getElementById("timer").textContent = `Time: ${timer}`;
            document.getElementById("level").textContent = `Level: ${level}`;
            document.getElementById("word").textContent = getRandomWord();
            document.getElementById("startButton").classList.add('hidden');
            document.getElementById("inputField").value = "";
            document.getElementById("inputField").focus();
            timerInterval = setInterval(updateTimer, 1000);
        }

        function getRandomWord() {
            const randomIndex = Math.floor(Math.random() * words.length);
            currentWord = words[randomIndex];
            return currentWord;
        }

        function updateTimer() {
            timer--;
            document.getElementById("timer").textContent = `Time: ${timer}`;
            if (timer <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }

        document.getElementById("inputField").addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                if (this.value.toLowerCase() === currentWord.toLowerCase()) {
                    score++;
                    document.getElementById("score").textContent = `Score: ${score}`;
                    currentWord = getRandomWord();
                    document.getElementById("word").textContent = currentWord;
                    this.value = ""; // Clear input after correct word
                    if (score % 10 === 0) {
                        level++;
                        document.getElementById("level").textContent = `Level: ${level}`;
                    }
                }
            }
        });

        function endGame() {
            document.getElementById("game-container").innerHTML += ` 
                <div style="color: #ff4081; font-size: 2em; font-weight: bold; margin-top: 20px;">
                    Beautiful Ending: 🌟 Keep improving! Success awaits with persistence! 🌟
                </div>`;
            document.getElementById("resetButton").classList.remove("hidden");
        }

        function resetGame() {
            gameStarted = false;
            document.getElementById("resetButton").classList.add("hidden");
            startGame();
        }