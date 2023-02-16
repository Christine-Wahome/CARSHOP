CREATE OR ALTER PROCEDURE SpSendOrderEmail
AS
BEGIN
 SELECT * FROM specCarOrders WHERE isDeleted ='0'
 UPDATE specCarOrders SET isEmailSent='1' 
END; 
