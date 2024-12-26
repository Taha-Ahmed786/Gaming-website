$(document).ready(function () {
    const size = 4;
    let board = Array(size).fill().map(() => Array(size).fill(0));
    let score = 0;

    function updateBoard() {
        $(".grid-cell").each(function (index) {
            const row = Math.floor(index / size);
            const col = index % size;
            const value = board[row][col];
            $(this).text(value === 0 ? "" : value);
            $(this).css("background-color", getTileColor(value));
        });
        $("#score").text(score);
    }

    function getTileColor(value) {
        switch (value) {
            case 2: return "#eee4da";
            case 4: return "#ede0c8";
            case 8: return "#f2b179";
            case 16: return "#f59563";
            case 32: return "#f67c5f";
            case 64: return "#f65e3b";
            case 128: return "#edcf72";
            case 256: return "#edcc61";
            case 512: return "#edc850";
            case 1024: return "#edc53f";
            case 2048: return "#edc22e";
            default: return "#cdc1b4";
        }
    }

    function generateRandomTile() {
        let emptyCells = [];
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (board[r][c] === 0) {
                    emptyCells.push({ r, c });
                }
            }
        }
        if (emptyCells.length === 0) return;
        const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }

    function slideTiles(direction) {
        let moved = false;
        if (direction === 'left' || direction === 'right') {
            for (let r = 0; r < size; r++) {
                let row = board[r].filter(val => val !== 0);
                if (direction === 'right') row.reverse();
                for (let i = 0; i < row.length - 1; i++) {
                    if (row[i] === row[i + 1]) {
                        row[i] *= 2;
                        score += row[i];
                        row[i + 1] = 0;
                    }
                }
                row = row.filter(val => val !== 0);
                if (direction === 'right') row.reverse();
                while (row.length < size) row.push(0);
                board[r] = row;
                if (row.length !== board[r].length) moved = true;
            }
        } else if (direction === 'up' || direction === 'down') {
            for (let c = 0; c < size; c++) {
                let column = board.map(row => row[c]).filter(val => val !== 0);
                if (direction === 'down') column.reverse();
                for (let i = 0; i < column.length - 1; i++) {
                    if (column[i] === column[i + 1]) {
                        column[i] *= 2;
                        score += column[i];
                        column[i + 1] = 0;
                    }
                }
                column = column.filter(val => val !== 0);
                if (direction === 'down') column.reverse();
                while (column.length < size) column.push(0);
                for (let r = 0; r < size; r++) {
                    board[r][c] = column[r];
                }
            }
        }
        generateRandomTile();
        updateBoard();
    }

    $(document).keydown(function (e) {
        if (e.key === "ArrowUp") slideTiles('up');
        if (e.key === "ArrowDown") slideTiles('down');
        if (e.key === "ArrowLeft") slideTiles('left');
        if (e.key === "ArrowRight") slideTiles('right');
    });

    $("#restart").click(function () {
        board = Array(size).fill().map(() => Array(size).fill(0));
        score = 0;
        generateRandomTile();
        generateRandomTile();
        updateBoard();
    });

    generateRandomTile();
    generateRandomTile();
    updateBoard();
});
