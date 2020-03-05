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
            .then(function () {
                callback()
            })
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
    changeBoardName: function (id, boardname) {
        let changed_name = {id: id, boardname: boardname};
        dataHandler._api_post('/change-board-name', changed_name, () => {
        })
    },
    changeColdName(col_id, col_title) {
        let id_title = {col_id: col_id, col_title: col_title};
        dataHandler._api_post('/change-col-name', id_title, () => {
        })
    },
    changeCardName(card_id, card_title) {
        let id_title = {id: card_id, card_title: card_title};
        dataHandler._api_post('/change-card-name', id_title, () => {
        })
    },
    createNewBoard: function (boardTitle, callback) {
        dataHandler._api_post('/new-board', boardTitle, callback)
    },
    createNewCard: function (card, callback) {
        // creates new card, saves it and calls the callback function with its data
        dataHandler._api_post('/new-card', card, callback)
    },
    deleteElement: function (card) {
        dataHandler._api_post('/delete-element', card, () => {
        })
    },
    createNewCol: function (col, callback) {
        dataHandler._api_post('/new-col', col, callback)
    },
    updateCard: function (card) {
        dataHandler._api_post('/update-card', card, () => {
        })
    },
    updateOpenClose: function (data) {
        dataHandler._api_post('/update-open-close', data, () => {
        })
    }
};
// here comes more features

