// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";


function build_board(card) {
    let create_board = document.createElement('section');
    create_board.setAttribute('class', 'board');
    create_board.id = `board${card.board_id}`;
    let board_header = document.createElement("div");
    board_header.setAttribute('class', 'board-header');
    let board_title = document.createElement('span');
    board_title.setAttribute('class', 'board-title');
    board_title.innerText = card.title;
    let board_add = document.createElement('button');
    board_add.setAttribute('class', 'board-add');
    board_add.innerText = 'Add Card';
    let board_toggle = document.createElement('button');
    board_toggle.setAttribute('class', 'board-toggle');
    let image = document.createElement('i');
    image.setAttribute('class', 'fas fa-chevron-down');
    let board_columns = document.createElement('div');
    board_columns.setAttribute('class', 'board-columns');
    board_toggle.appendChild(image);
    board_header.appendChild(board_title);
    board_header.appendChild(board_add);
    board_header.appendChild(board_toggle);
    create_board.appendChild(board_header);
    create_board.appendChild(board_columns);
    document.getElementById('board-container').appendChild(create_board);
}

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        for (let card of Object.values(boards)){
            let board = document.getElementById(`board${card.board_id}`);
            if (board === null) {
                build_board(card);
            }
        }
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, function (cards) {
            dom.showCards(cards);
        });
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let boardcolumns = '';
        for (let card in cards) {
            let columns=document.querySelector(`board-columns.${card.board_id}`)

        }
    },
    // here comes more features
};


