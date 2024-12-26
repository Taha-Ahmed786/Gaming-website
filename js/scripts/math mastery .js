 let currentQuestion = 0;

        function generateQuestion() {
            const num1 = Math.floor(Math.random() * 50) + 1;
            const num2 = Math.floor(Math.random() * 50) + 1;
            const operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
            const question = `${num1} ${operator} ${num2}`;
            let answer;
            switch (operator) {
                case '+': answer = num1 + num2; break;
                case '-': answer = num1 - num2; break;
                case '*': answer = num1 * num2; break;
            }
            return { question, answer };
        }

        const questionElement = document.getElementById("question");
        const answerInput = document.getElementById("answer");
        const submitButton = document.getElementById("submit-answer");
        const feedbackElement = document.getElementById("feedback");
        const nextButton = document.getElementById("next-question");

        let currentQ = generateQuestion();
        questionElement.textContent = currentQ.question;

        submitButton.addEventListener("click", () => {
            const userAnswer = parseFloat(answerInput.value);
            if (userAnswer === currentQ.answer) {
                feedbackElement.textContent = "Correct! You win!";
                feedbackElement.className = "feedback success";
                nextButton.style.display = "block";
            } else {
                feedbackElement.textContent = "Wrong! Try again.";
                feedbackElement.className = "feedback error";
            }
        });

        nextButton.addEventListener("click", () => {
            currentQ = generateQuestion();
            questionElement.textContent = currentQ.question;
            answerInput.value = '';
            feedbackElement.textContent = '';
            nextButton.style.display = "none";
        });