document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function checkWinner() {
        for (let combo of winningCombinations) {
            if (
                gameState[combo[0]] !== '' &&
                gameState[combo[0]] === gameState[combo[1]] &&
                gameState[combo[1]] === gameState[combo[2]]
            ) {
                return true;
            }
        }
        return false;
    }

    function checkDraw() {
        return !gameState.includes('');
    }

    function handleClick(index) {
        if (gameState[index] === '' && !checkWinner()) {
            gameState[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                status.textContent = `Player ${currentPlayer} wins!`;
            } else if (checkDraw()) {
                status.textContent = `It's a draw!`;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function renderBoard() {
        board.innerHTML = '';
        gameState.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => handleClick(index));
            board.appendChild(cellElement);
        });
    }

    renderBoard();
});
