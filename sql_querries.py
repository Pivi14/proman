import database_common
import psycopg2


@database_common.connection_handler
def get_boards(cursor):
    cursor.execute("""
                    SELECT boards.board_id, boards.title, cols.col_id, cols.col_title, cols.board_id, cards.id,
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
    print(type(title))
    cursor.execute("""
                   INSERT INTO boards (title) VALUES (%(title)s);
                   """, {'title': title})
