CREATE PROCEDURE spRegisterUser( @IdUser VARCHAR(50), @Name VARCHAR(50), @Email VARCHAR(50), @Password VARCHAR(50), @Address VARCHAR(50),@fullname VARCHAR (50),@country VARCHAR (50))
AS

BEGIN
INSERT INTO users
     (
    userId ,
    userName ,
    email ,
    password,
    address ,
    fullname,
    country)
VALUES
    (@IdUser ,
     @Name,
     @Email ,
     @Password,
     @Address,
     @fullname,
     @country )   
END 

