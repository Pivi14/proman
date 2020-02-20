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
def col_by_board_id(cursor, board_id):
    cursor.execute("""
                    SELECT col_id
                    FROM cols
                    WHERE board_id = %(board_id)s
                    ORDER BY col_id DESC
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
def add_four_static_cols_to_new_board(cursor):
    cursor.execute("""
                    SELECT setval('cols_col_id_seq', (SELECT max(col_id) FROM cols));
                    
                    INSERT INTO cols (col_title, board_id) VALUES ('New', 3);
                    INSERT INTO cols (col_title, board_id) VALUES ('In progress', 3);
                    INSERT INTO cols (col_title, board_id) VALUES ('Testing', 3);
                    INSERT INTO cols (col_title, board_id) VALUES ('Done', 3);
                    """)


def get_id_of_new_board():
    pass
