DROP TABLE IF EXISTS documents;
CREATE TABLE documents (
    id ROWID,
    title TEXT,
    description TEXT,
    type TEXT,
    date INTEGER,
    thumbnail TEXT,
    path TEXT
);

