CREATE PROCEDURE SpSendTransitEmail
AS
BEGIN
 SELECT * FROM specCarOrders WHERE isEmailSent='1'
END; 

EXECUTE SpSendTransitEmail

