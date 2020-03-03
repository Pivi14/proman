// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
export let dataHandler = {
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => response.json())  // parse the response as JSON
            .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_post: function (url, data, callback) {
        // it is not called from outside
        // sends the data to the API, and calls callback function
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then()
    },
    init: function () {
    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/get-boards', (response) => {
            this._data = response;
            callback(response);
        });
    },
    getBoard: function (boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
    },
    changeBoardName: function (id, boardname) {
        let changed_name = {id: id, boardname: boardname};
        fetch('/change-board-name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changed_name)
        })
    },
    changeColdName(col_id, col_title) {
        let id_title = {col_id: col_id, col_title: col_title};
        fetch('change-col-name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id_title)
        })
    },
    changeCardName(card_id, card_title){
        let id_title = {id: card_id, card_title:card_title};
        fetch('/change-card-name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id_title)
        })
    },
    getStatuses: function (callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
    }
    ,
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: function (boardId, callback) {

    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function (boardTitle, callback) {
        fetch('/new-board', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(boardTitle)
        })
            .then(function () {
                callback();
            });
    },
    createNewCard: function (card, callback) {
        // creates new card, saves it and calls the callback function with its data
        fetch('/new-card', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(card)
        })
            .then(function () {
                callback();
            })
    },
    deleteElement: function (card) {
        dataHandler._api_post('/delete-element', card)
    },
    createNewCol: function (col, callback) {
        fetch('/new-col', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(col)
        })
            .then(function () {
                callback()
            })
    },
    updateCard: function (card) {
        dataHandler._api_post('/update-card', card)
    }
};
// here comes more features

