CREATE VIEW `ai_permitted_tables_view` AS 
    SELECT type, name, tbl_name, sql
    FROM sqlite_master
    WHERE (type = 'table' OR type = 'view')
      AND sql IS NOT NULL
      AND tbl_name NOT LIKE '\__%' ESCAPE '\'
      AND tbl_name NOT IN (
        'sqlite_sequence', 
        'movies', 
        'actors'
        )
      AND name NOT IN (
        'ai_permitted_tables_view'
        )
    ;