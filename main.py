from flask import Flask, render_template, url_for, request, jsonify
from util import json_response

import data_handler

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/new-board", methods=['POST'])
@json_response
def new_board():
    new_title = request.get_json()
    data_handler.new_board(new_title)
    return '', 204


@app.route("/change-board-name", methods=['POST'])
def change_board_name():
    changed_title = request.get_json()
    data_handler.change_board_title(changed_title)
    return '', 204


@app.route("/change-col-name", methods=['POST'])
def change_col_name():
    id_title = request.get_json()
    data_handler.change_col_title(id_title)
    return '', 204


@app.route("/change-card-name", methods=['POST'])
def change_card_name():
    id_title = request.get_json()
    data_handler.change_card_title(id_title)
    return '', 204


@app.route("/new-card", methods=['POST'])
def new_card():
    new_card_data = request.get_json()
    data_handler.new_card(new_card_data)
    return '', 204


@app.route("/delete-element", methods=['POST'])
def delete_card():
    deleted_elem = request.get_json()
    data_handler.delete_element(deleted_elem)
    return '', 204

@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
