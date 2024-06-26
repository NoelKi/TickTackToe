let fields = [
    null, null, null,
    null, null, null,
    null, null, null,
];

let currentPlayer = 'cross';
let lastAnimatedIndex = -1;

function init() {
    render();
}

function render() {
    let container = document.getElementById('container');
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let value = fields[index];
            tableHTML += `<td id="cell-${index}" onclick="handleClick(${index})">${getSVG(value)}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    container.innerHTML = tableHTML;

    // Füge die Animationsklasse zum letzten Symbol hinzu
    if (lastAnimatedIndex !== -1) {
        let cell = document.getElementById(`cell-${lastAnimatedIndex}`).querySelector('svg');
        if (cell) {
            cell.classList.add(fields[lastAnimatedIndex] === 'circle' ? 'animate-circle' : 'animate-cross');
        }
    }

    // Zeichne die Gewinnlinie, falls es einen Gewinner gibt
    let winningCombination = checkWinner();
    if (winningCombination) {
        drawWinnerLine(winningCombination);
    }
}

function handleClick(index) {
    if (!fields[index]) {
        fields[index] = currentPlayer;
        lastAnimatedIndex = index;
        render();
        if (checkWinner()) {
            console.log(`Player ${currentPlayer} wins!`);
        }
        currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
    }
}

function getSVG(value) {
    if (value === 'cross') {
        return `
            <svg viewBox="0 0 100 100" class="cross">
                <line x1="10" y1="10" x2="90" y2="90" />
                <line x1="10" y1="90" x2="90" y2="10" />
            </svg>
        `;
    } else if (value === 'circle') {
        return `
            <svg viewBox="0 0 100 100" class="circle">
                <circle cx="50" cy="50" r="40" />
            </svg>
        `;
    }
    return '';
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Spalten
        [0, 4, 8], [2, 4, 6]             // Diagonalen
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return combination;
        }
    }
    return null;
}

function drawWinnerLine(winningCombination) {
    const container = document.getElementById('container');
    const cellSize = 100; // Größe der Zelle
    const padding = 10; // Padding zwischen den Zellen
    const [a, b, c] = winningCombination;

    // Berechne die Startkoordinaten (x1, y1)
    const startX = (a % 3) * (cellSize + padding) + (cellSize / 2);
    const startY = Math.floor(a / 3) * (cellSize + padding) + (cellSize / 2);

    // Berechne die Endkoordinaten (x2, y2)
    const endX = (c % 3) * (cellSize + padding) + (cellSize / 2);
    const endY = Math.floor(c / 3) * (cellSize + padding) + (cellSize / 2);

    // Erstelle das Linien-Element
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", startX);
    line.setAttribute("y1", startY);
    line.setAttribute("x2", endX);
    line.setAttribute("y2", endY);
    line.setAttribute("class", "winner-line");

    // Erstelle das SVG-Element und füge die Linie hinzu
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${3 * (cellSize + padding)} ${3 * (cellSize + padding)}`);
    svg.setAttribute("style", "position: relative; top: -300px; left: 0; width: 100%; height: 100%; pointer-events: none;");
    svg.appendChild(line);

    // Füge das SVG-Element zum Container hinzu
    container.appendChild(svg);
}