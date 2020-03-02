import persistence
import sql_querries


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence.get_statuses()
    return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')


def new_board(title):
    print(title)
    sql_querries.create_board(title)
    new_board_id = sql_querries.get_id_of_new_board()
    print(new_board_id)
    sql_querries.add_four_static_cols_to_new_board(new_board_id['max'])


def new_card(card_data):
    col_id = sql_querries.col_by_board_id(card_data['board_id'])
    order_num = sql_querries.order_by_col_id(col_id['col_id'])
    if order_num is None:
        order_number = 0
    else:
        order_number = order_num['order_num'] + 1
    card_data['col_id'] = col_id['col_id']
    card_data['order_num'] = order_number
    sql_querries.create_card(card_data)


def change_board_title(changedName):
    sql_querries.change_board_name(changedName)


def change_col_title(id_title):
    sql_querries.change_col_name(id_title)


def change_card_title(id_title):
    sql_querries.change_card_name(id_title)


def delete_element(element):
    if element['table'] == 'cards':
        sql_querries.delete_card(element)
    elif element['table'] == 'cols':
        sql_querries.delete_column(element)
    elif element['table'] == 'boards':
        sql_querries.delete_table(element)


def get_boards():
    """
    Gather all boards
    :return:
    """
    return sql_querries.get_boards()


def get_cards_for_board(board_id):
    persistence.clear_cache()
    all_cards = persistence.get_cards()
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == str(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards
