import database_common
import psycopg2


@database_common.connection_handler
def get_boards(cursor):
    cursor.execute("""
                    SELECT boards.id AS boardID, boards.title, cols.id, cols.col_title, cols.board_id, cards.id, cards.board_id,
                     cards.card_title, cards.col_id, cards.order_num
                    FROM cards FULL JOIN boards ON cards.board_id = boards.id
                    FULL JOIN cols ON cards.col_id = cols.id
                    ORDER BY boards.id, cols.id, cards.order_num
                    """

                   )
    return cursor.fetchall()

