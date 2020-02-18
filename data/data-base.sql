ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS boards_pkey CASCADE;
ALTER TABLE IF EXISTS ONLY public.cols DROP CONSTRAINT IF EXISTS cols_pkey CASCADE;
ALTER TABLE IF EXISTS ONLY public.cols DROP CONSTRAINT IF EXISTS cols_board_id_fkey CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS cards_pkey CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS cards_board_id_fkey CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS cards_col_id_fkey CASCADE;


DROP TABLE IF EXISTS boards;
DROP SEQUENCE IF EXISTS public.boards_id_seq;
CREATE TABLE public.boards (
    id serial,
    title text,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS cols;
DROP SEQUENCE IF EXISTS public.cols_id_seq;
CREATE TABLE cols (
    id serial,
    status_title text,
    board_id integer,
    PRIMARY KEY (id),
    FOREIGN KEY (board_id) REFERENCES boards(id)
);

DROP TABLE IF EXISTS cards;
DROP SEQUENCE IF EXISTS public.cards_id_seq;
CREATE TABLE cards (
    id serial,
    board_id integer,
    card_title text,
    col_id int,
    order_num int,
    PRIMARY KEY (id),
    FOREIGN KEY (board_id) REFERENCES boards(id),
    FOREIGN KEY (col_id) REFERENCES cols(id)
);

INSERT INTO boards VALUES (1, 'Board 1');
INSERT INTO boards VALUES (2, 'Board 2');

INSERT INTO cols VALUES (0, 'New', 1);
INSERT INTO cols VALUES (1, 'In progress', 1);
INSERT INTO cols VALUES (2, 'Testing', 1);
INSERT INTO cols VALUES (3, 'Done', 1);

INSERT INTO cols VALUES (4, 'New', 2);
INSERT INTO cols VALUES (5, 'In progress', 2);
INSERT INTO cols VALUES (6, 'Testing', 2);
INSERT INTO cols VALUES (7, 'Done', 2);

INSERT INTO cards VALUES (1, 1, 'New card 1', 0, 0);
INSERT INTO cards VALUES (2, 1, 'New card 2', 0, 1);
INSERT INTO cards VALUES (3, 1, 'In progress card', 1, 0);
INSERT INTO cards VALUES (4, 1, 'planning', 2, 0);
INSERT INTO cards VALUES (5, 1, 'Done card', 3, 0);
INSERT INTO cards VALUES (6, 1, 'Done card', 3, 1);
INSERT INTO cards VALUES (7, 2, 'In progress card', 0, 0);
INSERT INTO cards VALUES (8, 2, 'In progress card', 0, 1);
INSERT INTO cards VALUES (9, 2, 'In progress card', 1, 0);
INSERT INTO cards VALUES (10, 2, 'planning', 2, 0);
INSERT INTO cards VALUES (11, 2, 'Done card', 3, 0);
INSERT INTO cards VALUES (12, 2, 'Done card', 3, 0);
