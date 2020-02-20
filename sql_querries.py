import database_common
import psycopg2


@database_common.connection_handler
def get_boards(cursor):
    cursor.execute("""
                    SELECT boards.board_id, boards.title, cols.col_id, cols.col_title, cards.id,
                     cards.card_title, cards.order_num
                    FROM boards
                    FULL JOIN cols ON  cols.board_id = boards.board_id
                    FULL JOIN cards ON cards.board_id = boards.board_id AND cards.col_id = cols.col_id
                    ORDER BY boards.board_id, cols.col_id, cards.order_num
                    """
                   )
    return cursor.fetchall()


@database_common.connection_handler
def create_board(cursor, title):
    cursor.execute("""                  
                   INSERT INTO boards(title) VALUES (%(title)s) """,
                   {'title': title}
                   )


@database_common.connection_handler
def create_card(cursor, card_data):
    print('card_data: ', card_data)
    cursor.execute("""
                    INSERT INTO cards(board_id, card_title, col_id, order_num) 
                    VALUES (%(board_id)s, %(card_title)s, %(col_id)s, %(order_num)s)
    """, {
        'board_id': card_data['board_id'],
        'card_title': card_data['card_title'],
        'col_id': card_data['col_id'],
        'order_num': card_data['order_num']
    })


@database_common.connection_handler
def col_by_board_id(cursor, board_id):
    cursor.execute("""   
                    SELECT col_id
                    FROM cols
                    WHERE board_id = %(board_id)s
                    ORDER BY col_id
                    LIMIT 1
    """, {'board_id': board_id})
    return cursor.fetchone()


@database_common.connection_handler
def order_by_col_id(cursor, col_id):
    cursor.execute("""
                    SELECT order_num
                    FROM cards
                    WHERE col_id = %(col_id)s
                    ORDER BY order_num DESC
                    LIMIT 1
    """, {'col_id': col_id})
    return cursor.fetchone()


@database_common.connection_handler
def add_four_static_cols_to_new_board(cursor, new_board_id):
    cursor.execute("""                    
                    INSERT INTO cols (col_title, board_id) VALUES ('New', %(id)s);
                    INSERT INTO cols (col_title, board_id) VALUES ('In progress', %(id)s);
                    INSERT INTO cols (col_title, board_id) VALUES ('Testing', %(id)s);
                    INSERT INTO cols (col_title, board_id) VALUES ('Done', %(id)s);
                    """, {'id': new_board_id})


@database_common.connection_handler
def get_id_of_new_board(cursor):
    cursor.execute("""
                    SELECT max(board_id) from boards;
                    """)
    max_id = cursor.fetchone()
    return max_id

@database_common.connection_handler
def change_board_name(cursor, changed_name):
    cursor.execute("""
                    UPDATE boards
                    SET title = %(changed_name)s
                    WHERE board_id = %(id)s""",
                   {'changed_name': changed_name['boardname'],
                    'id': changed_name['id']})
