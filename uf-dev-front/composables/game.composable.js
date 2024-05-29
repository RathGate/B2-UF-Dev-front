import {isValidIndex} from "~/composables/board.composable.js";

export class GameData {
    constructor(board=null, fen=null, current_turn=null, history=null, history_str=null, player_color=null, round=null, result=null, legal_moves=null, last_move=null) {
        this.board = board;
        this.fen = fen;
        this.current_turn = current_turn;
        this.history = history ? history : [];
        this.history_str = history;
        this.player_color = player_color
        this.round = round;
        this.legal_moves = parse_legal_moves(legal_moves);
        this.last_move = last_move ? last_move : null;
        this.result = result ? parseResult(result) : null;
        this.isGameOver = !!this.result;
    }
    parse_game_data(game_data) {
        this.board = game_data["game"]["board"];
        this.fen = game_data["game"]["fen"];
        this.current_turn = game_data["game"]["current_turn"]
        this.history = game_data["game"]["history"];
        this.history_str = game_data["game"]["history_str"];
        this.player_color = game_data["game"]["player_color"];
        this.round = game_data["game"]["round"];
        this.legal_moves = parse_legal_moves(game_data["game"]["legal_moves"])
        this.last_move = game_data["game"]["last_move"] ? JSON.parse(JSON.stringify(game_data["game"]["last_move"])) : [];
        this.result = game_data["game"]["result"] ? parseResult(game_data["game"]["result"]) : null;
        this.isGameOver = !!this.result;
        console.log(game_data)
        console.log(this)
    }
}

function parseResult(result) {
    let arr = {};
    arr["score"] = result["score"] ? result["score"] : "";
    arr["score_comment"] = scoreComment[result["score_comment"]];
    return arr;
}

const scoreComment = {
    "None": "",
    "NO_PIECES": "A player has no piece left.",
    "NO_LEGAL_MOVES": "A player has no legal move possible.",
    "CONSECUTIVE_KINGS": "20 consecutive kings were moved without taking any piece.",
    "BOARD_REPETITIVE": "The board presented the same layout 3 times.",
    "FORFEIT": "A player has forfeited the game."
}

export function parse_legal_moves(legal_moves_arr) {
    let result = {}
    if (!legal_moves_arr) {
        return result;
    }
    legal_moves_arr.forEach(move => {
        if (!/^\d+[x-]\d+$/.test(move)) {
            return;
        }
        let positions = move.split(/[x-]/);
        if (positions.length !== 2) { return; }

        let start_index = parseInt(positions[0]);
        let end_index = parseInt(positions[1]);
        if (!isValidIndex(start_index) || !isValidIndex(end_index)) { return; }
        if (result[start_index] === undefined) {
            result[start_index] = [end_index];
        } else {
            result[start_index].push(end_index);
        }
    })
    return result;


}