DROP DATABASE IF EXISTS auth_lemon;

CREATE DATABASE  auth_lemon;

DROP TABLE IF EXISTS client;

CREATE TABLE client(
    username varchar(100) NOT NULL,
    id text NOT NULL,
    hashed_password text NOT NULL,
    salt text NOT NULL UNIQUE,
    PRIMARY KEY (username)
);

-- CREATE PROCEDURE dbo.uspAddUser
--     @pLogin NVARCHAR(50), 
--     @pPassword NVARCHAR(50), 
--     @pFirstName NVARCHAR(40) = NULL, 
--     @pLastName NVARCHAR(40) = NULL,
--     @responseMessage NVARCHAR(250) OUTPUT
-- AS
-- BEGIN
--     SET NOCOUNT ON
--     BEGIN TRY
--         INSERT INTO dbo.[User] (LoginName, PasswordHash, FirstName, LastName)
--         VALUES(@pLogin, HASHBYTES('SHA2_512', @pPassword), @pFirstName, @pLastName)
--         SET @responseMessage='Success'
--     END TRY
--     BEGIN CATCH
--         SET @responseMessage=ERROR_MESSAGE() 
--     END CATCH
-- END