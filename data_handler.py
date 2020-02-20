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
    sql_querries.create_board(title)


def new_card(card_data):
    col_id = sql_querries.col_by_board_id(card_data['board_id'])
    order_num = sql_querries.order_by_col_id(col_id['col_id'])
    card_data['col_id'] = col_id['col_id']
    card_data['order_num'] = order_num['order_num'] + 1
    print('card_datas:', card_data)
    sql_querries.create_card(card_data)


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
