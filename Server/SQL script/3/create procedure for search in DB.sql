CREATE PROCEDURE SelectNotifications
    @column NVARCHAR(MAX),
    @val NVARCHAR(MAX),
    @type NVARCHAR(MAX),
    @start INT = NULL,
    @end INT = NULL
AS
BEGIN
    DECLARE @query NVARCHAR(MAX)
    IF @column IS NOT NULL AND @val IS NOT NULL AND @type IS NOT NULL AND @start IS NOT NULL AND @end IS NOT NULL
    BEGIN
        SET @query = N'SELECT * FROM Notifications_tbl WHERE ' + @column + ' LIKE ''%' + @val + '%'' AND [' + @type + '] BETWEEN @start AND @end'
        EXEC sp_executesql @query, N'@start INT, @end INT', @start, @end
    END
    ELSE IF @column IS NOT NULL AND @val IS NOT NULL
    BEGIN
        DECLARE @sql NVARCHAR(MAX)
        SET @sql = N'SELECT * FROM Notifications_tbl WHERE ' + @column + ' LIKE ''%' + @val + '%'''
        EXEC sp_executesql @query
    END
    ELSE IF @type IS NOT NULL AND @start IS NOT NULL AND @end IS NOT NULL
    BEGIN
        SET @sql = N'SELECT * FROM Notifications_tbl WHERE [' + @type + '] BETWEEN @start AND @end'
        EXEC sp_executesql @sql, N'@start INT, @end INT', @start, @end
    END
    ELSE
    BEGIN
        SELECT * FROM Notifications_tbl
    END
END
