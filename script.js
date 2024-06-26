let fields = [
    null, null, null,
    null, null, null,
    null, null, null,
];

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
            let value = fields[index] ? fields[index] : '';
            tableHTML += `<td onclick="handleClick(${index})">${value}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    container.innerHTML = tableHTML;
}

function handleClick(index) {
    if (!fields[index]) {
        fields[index] = 'X'; // oder 'O', abhängig von deinem Spielzustand
        render();
    }
}
