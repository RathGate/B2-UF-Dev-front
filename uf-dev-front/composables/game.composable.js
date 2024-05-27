import {isValidIndex} from "~/composables/board.composable.js";

export class GameData {
    constructor(round=null, history=null, board=null, current_turn=null, last_move=null, legal_moves=null, player_color) {
        this.round = round;
        this.history_str = history;
        this.history = parse_history(history);
        this.board = board;
        this.current_turn = current_turn;
        this.last_move = last_move;
        this.legal_moves = parse_legal_moves(legal_moves);
        this.player_color = player_color
    }
    parse_game_data(game_data) {
        console.log(game_data)
        this.current_turn = game_data["game"]["current_turn"]
        this.legal_moves = parse_legal_moves(game_data["legal_moves"])
        this.round = game_data["game"]["round"];
        this.history_str = game_data["game"]["moves_str"];
        this.history = game_data["game"]["moves"];
        this.board = game_data["game"]["board"];
        this.last_move = game_data["game"]["last_move"];
        this.player_color = game_data["player_color"];
        console.log(this)
    }
}

export function parse_history(history_str) {
    if (!history_str) {
        return [];
    }
    // Todo
    return history_str;
}
export function parse_legal_moves(legal_moves_arr) {
    let result = {}
    if (!legal_moves_arr) {
        return result;
    }
    legal_moves_arr.forEach(move => {
        if (!/^\d+[x-]\d+$/.test(move)) {
            console.log()
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