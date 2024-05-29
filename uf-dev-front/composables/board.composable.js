let state_re = /^(?:(?<turn>[WB]):)*W(?<white>((K?(?:3[0-2]|[12][0-9]|[0-9]))(?:,K?(?:3[0-2]|[12][0-9]|[0-9]))*))?:B(?<black>((K?(?:3[0-2]|[12][0-9]|[0-9]))(?:,K?(?:3[0-2]|[12][0-9]|[0-9]))*))?$/

export function isValidIndex(number) {
    return !isNaN(number) && number <= 32 && number > 0
}
export function isValidPoint(x, y) {
    if (isNaN(x) || isNaN(y) ||
        x < 0 || x > 7 || y < 0 || y > 7) {
        return false;
    }
    return !(x%2 === y%2);
}

export function toIndex(x, y) {
    if (!isValidPoint(x, y)) {
        return -1;
    }
    return Math.floor(y * 4 + x / 2)+1
}

export function getIndexFromClick(e) {
    if (!e) { return -1 }
    let x = e.offsetX;
    let y = e.offsetY;
    let w = e.target.offsetWidth;
    let col = Math.floor(x / (w/8));
    let row = Math.floor(y / (w/8));
    return toIndex(col, row)
}

export function addHints(origin, moves, board) {
    if (!board || !moves) { return;}
    board.innerHTML += `<div class="piece square-${origin} highlight"></div>`
    moves.forEach(move => {
        if (isValidIndex(move)) {
            board.innerHTML += `<div class="piece square-${move} hint"></div>`
        }
    })
}

export function drawBoard(state, addToHTML=false, last_move=null) {
    if (!state || !state_re.test(state)) {
        return null;
    }
    let temp = "";

    const { white, black } = state_re.exec(state).groups;
    let color_pos = {};
    color_pos["white"] = white ? white.split(",") : [];
    color_pos["black"] = black ? black.split(",") : [];


    for (const [color, positions] of Object.entries(color_pos)) {
        positions.forEach(position => {
            let type = position.includes("K") ? "king" : "man";
            let nb = position.replace(/\D/g,'');
            if (nb < 1 || nb > 32) {
                return null;
            }
            temp += `<div class="piece square-${nb} ${color}-${type}"></div>`
        })
    }
    if (last_move) {
        for (const p of last_move) {
            temp += `<div class="piece square-${p} last"></div>`
        }
    }


    if (addToHTML) {
        let board = document.getElementById("board");
        board.innerHTML = temp;
    }
    return temp;
}


