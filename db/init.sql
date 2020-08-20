--Can't create dummy data for users because of password. Can't store password in database. Can only store the hash password in the database.


CREATE TABLE app_users (
    user_id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email VARCHAR(60),
    password TEXT,
    user_karma_score INT DEFAULT 0
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    body TEXT,
    img TEXT,
    post_karma_score INT,
    user_id INT REFERENCES app_users(user_id)
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    body TEXT,
    comment_karma_score INT,
    post_id iNT REFERENCES posts(post_id),
    user_id iNT REFERENCES app_users(user_id)
);