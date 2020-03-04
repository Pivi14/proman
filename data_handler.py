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
    new_board_id = sql_querries.get_id_of_new_board()
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


def new_col(col_data):
    sql_querries.create_col(col_data)


def change_board_title(changed_name):
    sql_querries.change_board_name(changed_name)


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


def check_card_id(card_list, card):
    for one_card in card_list:
        if card['id'] == one_card['id']:
            return True
    return False


def update_card(card_data):
    order_num = sql_querries.get_order_num_by_col_id(card_data['col_id'])
    order_range = list(range(len(order_num)))
    order_range.reverse()
    order_data = []
    old_column = 0
    old_data_reorder = True
    if order_num is not None:
        if check_card_id(order_num, card_data):
            old_data_reorder = False
            new_data = {
                'id': card_data['id'],
                'col_id': card_data['col_id'],
                'order_num': len(order_num) - 1
            }
            order_data.append(new_data)
            for order in order_range:
                if card_data['id'] == order_num[order]['id']:
                    continue
                else:
                    new_data = {
                        'id': order_num[order]['id'],
                        'col_id': card_data['col_id'],
                        'order_num': order - 1
                    }
                order_data.append(new_data)
        else:
            card_data['order_num'] = len(order_num)
            order_data.append(card_data)
            old_column = sql_querries.old_column(card_data['id'])
    else:
        card_data['order_num'] = 0
        order_data.append(card_data)
        old_column = sql_querries.old_column(card_data['id'])

    sql_querries.update_card(order_data)
    print('OK1')
    if old_data_reorder:
        card_from_old_col = sql_querries.all_data_from_col(old_column['col_id'])
        print(card_from_old_col)
        for index in range(len(card_from_old_col)):
            card_from_old_col[index]['order_num'] = index
        sql_querries.update_card(card_from_old_col)
        print('OK2')
