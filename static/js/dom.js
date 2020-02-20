// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

function new_board() {
    let user_title=prompt('Add title name please!');
    if (user_title === ''){
        user_title = 'New Board'
    }
    dataHandler.createNewBoard(user_title);
    setTimeout(function () {
        dom.loadBoards()
    }, 200)

}

function create_card(board_id){
    let card_title = prompt('Give me the card title!');
    if (card_title === ''){
        card_title = 'New card'
    }
    let card = {
        'card_title': card_title,
        'board_id': board_id
    };
    dataHandler.createNewCard(card);
    setTimeout(function () {
        dom.loadBoards()
    }, 200)
}
function isNullOrWhiteSpace(str) {
  return (!str || str.length === 0 || /^\s*$/.test(str))
}

function board_close() {
    let board_id = this.getAttribute('data-board-id');
    let board_columns = document.getElementById(`board-columns${board_id}`);
    let elements = board_columns.childNodes;
    if (elements.length !== 0){
        board_columns.animate([
            {height: "100px"},
            {height: "0px"}
        ], {
            duration: 500
        });
        setTimeout(function () {
            for (let element of elements){
                element.style.display = 'none'
            }
        }, 250);
        document.getElementById(`chevron-image${board_id}`).classList.remove('fa-chevron-down');
        document.getElementById(`chevron-image${board_id}`).classList.add('fa-chevron-up');
        document.getElementById(`toggle${board_id}`).removeEventListener('click', board_close);
        document.getElementById(`toggle${board_id}`).addEventListener('click', board_open)
    }
}

function board_open(){
    let board_id = parseInt(this.dataset.boardId);
    let board_columns = document.getElementById(`board-columns${board_id}`);
    let elements = board_columns.childNodes;
    board_columns.animate([
        {height: "0px"},
        {height: '100px'}
    ],{
        duration: 500
    });
    setTimeout(function () {
        for (let element of elements){
            element.style.display = 'block'
        }
    }, 250);
    document.getElementById(`chevron-image${board_id}`).classList.remove('fa-chevron-up');
    document.getElementById(`chevron-image${board_id}`).classList.add('fa-chevron-down');
    document.getElementById(`toggle${board_id}`).removeEventListener('click', board_open);
    document.getElementById(`toggle${board_id}`).addEventListener('click', board_close)

}

function build_board(card) {
    let create_board = document.createElement('section');
    create_board.setAttribute('class', 'board');
    create_board.id = `board${card.board_id}`;
    let board_header = document.createElement("div");
    board_header.setAttribute('class', 'board-header');
    let board_title = document.createElement('span');
    board_title.setAttribute('class', 'board-title');
    board_title.id = `board${card.board_id}`;
    board_title.isContentEditable;
    board_title.contentEditable = true;
    board_title.tabIndex = 1;
    board_title.innerText = card.title;
    board_title.addEventListener("focusout",function () {
        if ( isNullOrWhiteSpace(board_title.innerText) === false) {
            dataHandler.changeBoardName(parseInt(board_title.id.slice(5)),board_title.innerText)}
        else{
            board_title.innerText = card.title
        }
    });
    let board_add = document.createElement('button');
    board_add.setAttribute('class', 'board-add');
    board_add.innerText = 'Add Card';
    board_add.addEventListener('click', function (){create_card(card.board_id)});
    let board_toggle = document.createElement('button');
    board_toggle.setAttribute('class', 'board-toggle');
    board_toggle.id = `toggle${card.board_id}`;
    board_toggle.setAttribute('data-board-id', `${card.board_id}`);
    board_toggle.addEventListener('click', board_close);
    let image = document.createElement('i');
    image.setAttribute('class', 'fas fa-chevron-down');
    image.id = `chevron-image${card.board_id}`;
    let board_columns = document.createElement('div');
    board_columns.id=`board-columns${card.board_id}`;
    board_columns.setAttribute('class', 'board-columns');
    board_toggle.appendChild(image);
    board_header.appendChild(board_title);
    board_header.appendChild(board_add);
    board_header.appendChild(board_toggle);
    create_board.appendChild(board_header);
    create_board.appendChild(board_columns);
    document.getElementById('board-container').appendChild(create_board);
}

function build_column(card) {
    let board_column = document.createElement('div');
    board_column.setAttribute('class', 'board-column');
    board_column.id = `col${card.col_id}`;
    let board_column_title = document.createElement('div');
    board_column_title.setAttribute('class', 'board-column-title');
    board_column_title.innerText = card.col_title;
    let board_column_content = document.createElement('div');
    board_column_content.id = `board-column-content${card.col_id}`;
    board_column_content.setAttribute('class', 'board-column-content');

    board_column.appendChild(board_column_title);
    board_column.appendChild(board_column_content);

    document.getElementById(`board-columns${card.board_id}`).appendChild(board_column);
}

function build_card(card) {
    let individual_card = document.createElement('div');
    individual_card.setAttribute('class', 'card');
    individual_card.id = `card${card.id}`;
    let card_remove = document.createElement('div');
    card_remove.setAttribute('class', 'card-remove');
    let image = document.createElement('i');
    image.setAttribute('class', 'fas fa-trash-alt');
    let card_title = document.createElement('div');
    card_title.setAttribute('class', 'card-title');
    card_title.innerText = card.card_title;

    card_remove.appendChild(image);
    individual_card.appendChild(card_remove);
    individual_card.appendChild(card_title);
    document.getElementById(`board-column-content${card.col_id}`).appendChild(individual_card);
}

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // document.getElementById('board-container').innerHTML='';
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
        document.getElementById('create-board').addEventListener('click',new_board)
    },
    showBoards: function (boards) {
        for (let card of Object.values(boards)){
            let board = document.getElementById(`board${card.board_id}`);
            if (board === null) {
                build_board(card);
            }
            let columns=document.getElementById(`col${card.col_id}`);
            if (columns===null && card.col_id !== null){
                build_column(card);
            }
            let cards = document.getElementById(`card${card.id}`);
            if (cards === null && card.id !== null){
                build_card(card);
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


