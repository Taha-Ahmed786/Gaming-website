    function playGame(userChoice) {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * 3)];

        let resultMessage = `You chose ${userChoice}, computer chose ${computerChoice}. `;
        const resultElement = document.getElementById('result');
        const overlay = document.getElementById('overlay');
        const overlayMessage = document.getElementById('overlay-message');

        if (userChoice === computerChoice) {
            resultMessage += "It's a draw!";
            resultElement.className = "result draw";
            overlayMessage.textContent = "It's a Draw!";
        } else if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            resultMessage += "You win!";
            resultElement.className = "result win";
            overlayMessage.textContent = "Congratulations, You Win! 🎉";
        } else {
            resultMessage += "You lose!";
            resultElement.className = "result lose";
            overlayMessage.textContent = "Oh no, You Lose! 😢";
        }

        resultElement.textContent = resultMessage;

        // Show overlay
        overlay.style.display = 'flex';
    }

    function closeOverlay() {
        document.getElementById('overlay').style.display = 'none';
    }