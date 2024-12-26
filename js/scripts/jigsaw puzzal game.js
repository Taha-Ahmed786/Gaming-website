  const puzzleImages = "../New folder/gaming-website/assets/images/00.jpg";  // Path to your image
        const puzzleSize = 4;  // 4x4 grid (16 pieces)

        let pieces = [];
        let puzzleContainer = document.getElementById("puzzle-container");

        window.onload = function() {
            createPuzzle();
            shufflePuzzle();
        };

        function createPuzzle() {
            let image = new Image();
            image.src = "../New folder/gaming-website/assets/images/00.jpg";  // Path to your image
            image.onload = () => {
                // Cut the image into puzzle pieces and create puzzle pieces
                for (let row = 0; row < puzzleSize; row++) {
                    for (let col = 0; col < puzzleSize; col++) {
                        const piece = document.createElement("div");
                        piece.classList.add("puzzle-piece");
                        piece.style.backgroundImage = `url(${image.src})`;
                        piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
                        piece.setAttribute("data-position", `${row},${col}`);
                        piece.setAttribute("draggable", true);

                        // Add dragging event listeners
                        piece.addEventListener("dragstart", handleDragStart);
                        piece.addEventListener("dragover", handleDragOver);
                        piece.addEventListener("drop", handleDrop);

                        pieces.push(piece);
                    }
                }
                pieces.forEach(piece => puzzleContainer.appendChild(piece));
            };
        }

        function shufflePuzzle() {
            // Shuffle the puzzle pieces and randomly place them in the grid
            const shuffledPieces = [...pieces];
            shuffledPieces.sort(() => Math.random() - 0.5);  // Random shuffle
            puzzleContainer.innerHTML = "";  // Clear puzzle
            shuffledPieces.forEach(piece => puzzleContainer.appendChild(piece));  // Append shuffled pieces
        }

        // Handle drag start
        function handleDragStart(e) {
            e.dataTransfer.setData("text", e.target.dataset.position);  // Pass the piece's position as data
        }

        // Handle dragging over a piece
        function handleDragOver(e) {
            e.preventDefault();
        }

        // Handle drop on a piece
        function handleDrop(e) {
            e.preventDefault();

            let draggedPosition = e.dataTransfer.getData("text");  // Get the dragged piece's position
            let targetPosition = e.target.dataset.position;

            if (draggedPosition !== targetPosition && e.target.classList.contains("puzzle-piece")) {
                let draggedPiece = document.querySelector(`[data-position='${draggedPosition}']`);
                let targetPiece = e.target;

                // Swap the positions
                let draggedPosArr = draggedPosition.split(",");
                let targetPosArr = targetPosition.split(",");
                let tempBg = draggedPiece.style.backgroundPosition;
                draggedPiece.style.backgroundPosition = targetPiece.style.backgroundPosition;
                targetPiece.style.backgroundPosition = tempBg;

                draggedPiece.setAttribute("data-position", targetPosition);
                targetPiece.setAttribute("data-position", draggedPosition);

                checkPuzzleCompletion();  // Check if puzzle is complete
            }
        }

        // Check if the puzzle is solved
        function checkPuzzleCompletion() {
            let isComplete = true;
            pieces.forEach(piece => {
                let currentPos = piece.getAttribute("data-position");
                let correctPos = piece.style.backgroundPosition.split(" ").join(",");
                if (currentPos !== correctPos) {
                    isComplete = false;
                }
            });

            if (isComplete) {
                alert("Congratulations! You solved the puzzle!");
            }
        }
