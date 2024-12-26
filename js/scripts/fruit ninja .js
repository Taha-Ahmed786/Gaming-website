        const gameContainer = document.querySelector('#game-container');
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const scoreDisplay = document.getElementById('score');
        const gameOverScreen = document.getElementById('game-over');
        const restartButton = document.getElementById('restart');

        canvas.width = gameContainer.offsetWidth;
        canvas.height = gameContainer.offsetHeight;

        let fruits = [];
        let score = 0;
        let gameOver = false;

        const fruitImages = ['🍎', '🍌', '🍓', '🍇', '🍉'];

        class Fruit {
            constructor(x, y, size, velocity, emoji) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.velocity = velocity;
                this.emoji = emoji;
                this.split = false;
            }

            draw() {
                ctx.font = `${this.size}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.emoji, this.x, this.y);
            }

            update() {
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.velocity.y += 0.1;

                if (this.y > canvas.height + this.size) {
                    gameOver = true;
                }
            }
        }

        function spawnFruit() {
            const size = Math.random() * 30 + 40;
            const x = Math.random() * canvas.width;
            const y = canvas.height + size;
            const velocity = { x: (Math.random() - 0.5) * 4, y: -Math.random() * 10 - 5 };
            const emoji = fruitImages[Math.floor(Math.random() * fruitImages.length)];
            fruits.push(new Fruit(x, y, size, velocity, emoji));
        }

        const mouse = { x: 0, y: 0 };
        canvas.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX - gameContainer.offsetLeft;
            mouse.y = e.clientY - gameContainer.offsetTop;

            fruits.forEach((fruit) => {
                const distance = Math.hypot(mouse.x - fruit.x, mouse.y - fruit.y);
                if (distance < fruit.size && !fruit.split) {
                    fruit.split = true;
                    score++;
                    scoreDisplay.textContent = `🍒 Score: ${score}`;
                    setTimeout(() => {
                        const index = fruits.indexOf(fruit);
                        if (index > -1) fruits.splice(index, 1);
                    }, 0);
                }
            });
        });

        function animate() {
            if (gameOver) {
                gameOverScreen.style.display = 'block';
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            fruits.forEach((fruit) => {
                fruit.update();
                if (!fruit.split) fruit.draw();
            });

            requestAnimationFrame(animate);
        }

        function restartGame() {
            fruits = [];
            score = 0;
            gameOver = false;
            scoreDisplay.textContent = `🍒 Score: ${score}`;
            gameOverScreen.style.display = 'none';
            startGame();
        }

        function startGame() {
            setInterval(() => {
                if (!gameOver) spawnFruit();
            }, 1000);
            animate();
        }

        restartButton.addEventListener('click', restartGame);
        startGame();