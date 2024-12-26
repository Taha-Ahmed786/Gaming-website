const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const scale = 20;
        const rows = canvas.height / scale;
        const columns = canvas.width / scale;

        let snake, fruit, obstacles, score, level, highScore, speed, gameInterval;

        function setup() {
            snake = new Snake();
            fruit = new Fruit();
            obstacles = [];
            score = 0;
            level = 1;
            speed = 150;

            // Hide Game Over Screen
            document.getElementById('gameOverScreen').style.display = 'none';

            // Load high score from local storage
            highScore = localStorage.getItem('highScore') || 0;

            updateInfo();
            if (gameInterval) clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, speed);
        }

        function updateInfo() {
            document.getElementById('score').textContent = `Score: ${score}`;
            document.getElementById('level').textContent = `Level: ${level}`;
            document.getElementById('highScore').textContent = `High Score: ${highScore}`;
        }

        function gameLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            snake.update();
            fruit.draw();
            drawObstacles();
            snake.draw();

            if (snake.eat(fruit)) {
                score += 10;
                fruit.randomize();
                checkLevelUp();
            }
            if (snake.collide() || snake.hitObstacle(obstacles)) {
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem('highScore', highScore);
                }
                gameOver();
            }

            updateInfo();
        }

        function checkLevelUp() {
            if (score % 100 === 0) {
                level++;
                speed = Math.max(50, speed - 10);
                obstacles = generateObstacles(level);

                clearInterval(gameInterval);
                gameInterval = setInterval(gameLoop, speed);
            }
        }

        function generateObstacles(count) {
            const obstacleArray = [];
            for (let i = 0; i < count; i++) {
                obstacleArray.push({
                    x: Math.floor(Math.random() * columns),
                    y: Math.floor(Math.random() * rows),
                });
            }
            return obstacleArray;
        }

        function drawObstacles() {
            ctx.fillStyle = '#ff6f61';
            obstacles.forEach(obstacle => {
                ctx.fillRect(obstacle.x * scale, obstacle.y * scale, scale, scale);
            });
        }

        function gameOver() {
            clearInterval(gameInterval);
            const gameOverScreen = document.getElementById('gameOverScreen');
            document.getElementById('finalScore').textContent = `Your Score: ${score}`;
            gameOverScreen.style.display = 'flex';
        }

        class Snake {
            constructor() {
                this.body = [{ x: 5, y: 5 }];
                this.direction = 'RIGHT';
            }

            draw() {
                ctx.fillStyle = '#61dafb';
                this.body.forEach(segment => {
                    ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
                });
            }

            update() {
                const head = { ...this.body[0] };
                if (this.direction === 'RIGHT') head.x++;
                if (this.direction === 'LEFT') head.x--;
                if (this.direction === 'UP') head.y--;
                if (this.direction === 'DOWN') head.y++;

                this.body.unshift(head);
                if (!this.eat(fruit)) this.body.pop();
            }

            eat(fruit) {
                const head = this.body[0];
                return head.x === fruit.x && head.y === fruit.y;
            }

            collide() {
                const head = this.body[0];
                return (
                    head.x < 0 || head.x >= columns ||
                    head.y < 0 || head.y >= rows ||
                    this.body.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
                );
            }

            hitObstacle(obstacles) {
                const head = this.body[0];
                return obstacles.some(obstacle => obstacle.x === head.x && obstacle.y === head.y);
            }

            changeDirection(event) {
                if (event.key === 'ArrowRight' && this.direction !== 'LEFT') this.direction = 'RIGHT';
                if (event.key === 'ArrowLeft' && this.direction !== 'RIGHT') this.direction = 'LEFT';
                if (event.key === 'ArrowUp' && this.direction !== 'DOWN') this.direction = 'UP';
                if (event.key === 'ArrowDown' && this.direction !== 'UP') this.direction = 'DOWN';
            }
        }

        class Fruit {
            constructor() {
                this.randomize();
            }

            randomize() {
                this.x = Math.floor(Math.random() * columns);
                this.y = Math.floor(Math.random() * rows);
            }

            draw() {
                ctx.fillStyle = '#e74c3c';
                ctx.fillRect(this.x * scale, this.y * scale, scale, scale);
            }
        }

        window.addEventListener('keydown', event => snake.changeDirection(event));

        setup();