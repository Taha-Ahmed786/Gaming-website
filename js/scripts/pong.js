        const canvas = document.getElementById("pong");
        const ctx = canvas.getContext("2d");

        // Create the Pong paddle
        const paddleWidth = 10, paddleHeight = 100;
        const player = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: "#17a2b8", dy: 0 };
        const computer = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: "#ffc107", dy: 0 };

        // Create the ball
        const ballSize = 10;
        let ball = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            size: ballSize,
            speedX: 5,
            speedY: 5,
            color: "white"
        };

        let playerScore = 0;
        let computerScore = 0;
        const winningScore = 5;

        // Draw the ball and paddles
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

            // Draw paddles
            ctx.fillStyle = player.color;
            ctx.fillRect(player.x, player.y, player.width, player.height);
            ctx.fillStyle = computer.color;
            ctx.fillRect(computer.x, computer.y, computer.width, computer.height);

            // Draw the ball
            ctx.fillStyle = ball.color;
            ctx.fillRect(ball.x, ball.y, ball.size, ball.size);

            // Display the score
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.fillText(`Player: ${playerScore}`, 30, 30);
            ctx.fillText(`Computer: ${computerScore}`, canvas.width - 150, 30);

            // If game over
            if (playerScore === winningScore || computerScore === winningScore) {
                displayGameOver();
            }
        }

        // Update ball position and collisions
        function updateBall() {
            ball.x += ball.speedX;
            ball.y += ball.speedY;

            // Ball collision with top and bottom
            if (ball.y <= 0 || ball.y + ball.size >= canvas.height) {
                ball.speedY = -ball.speedY;
            }

            // Ball collision with paddles
            if (ball.x <= player.x + player.width && ball.y >= player.y && ball.y <= player.y + player.height || ball.x + ball.size >= computer.x && ball.y >= computer.y && ball.y <= computer.y + computer.height) {
                ball.speedX = -ball.speedX;
            }

            // Ball out of bounds (left or right)
            if (ball.x <= 0) {
                computerScore++;
                resetBall();
            }
            if (ball.x + ball.size >= canvas.width) {
                playerScore++;
                resetBall();
            }
        }

        // Reset the ball to the center
        function resetBall() {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.speedX = -ball.speedX; // Change direction after a point
        }

        // Update paddle position based on player input
        function movePaddle() {
            if (player.dy > 0 && player.y + player.height < canvas.height) {
                player.y += player.dy;
            } else if (player.dy < 0 && player.y > 0) {
                player.y += player.dy;
            }

            // Basic AI for computer paddle
            if (ball.y < computer.y + computer.height / 2) {
                computer.dy = -5;
            } else if (ball.y > computer.y + computer.height / 2) {
                computer.dy = 5;
            } else {
                computer.dy = 0;
            }

            computer.y += computer.dy;
            if (computer.y < 0) computer.y = 0;
            if (computer.y + computer.height > canvas.height) computer.y = canvas.height - computer.height;
        }

        // Update everything
        function update() {
            movePaddle();
            updateBall();
            draw();
            requestAnimationFrame(update);
        }

        // Listen to user key input for controlling the player's paddle
        document.addEventListener("keydown", function(event) {
            if (event.key === "ArrowDown") {
                player.dy = 5;
            }
            if (event.key === "ArrowUp") {
                player.dy = -5;
            }
        });

        document.addEventListener("keyup", function(event) {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                player.dy = 0;
            }
        });

        // Display Game Over screen
        function displayGameOver() {
            const gameOverMessage = playerScore === winningScore ? "You Win!" : "Game Over! Computer Wins!";
            ctx.font = "40px Arial";
            ctx.fillStyle = "white";
            ctx.fillText(gameOverMessage, canvas.width / 2 - 100, canvas.height / 2);

            document.getElementById('restartBtn').style.display = 'block';
        }

        // Start the game
        function startGame() {
            playerScore = 0;
            computerScore = 0;
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            document.getElementById('restartBtn').style.display = 'none';
            update();
        }

        // Start the game for the first time
        startGame();