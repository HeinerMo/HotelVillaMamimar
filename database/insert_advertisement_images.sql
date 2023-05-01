USE hotelMamimar
GO

INSERT INTO tb_advertisement (url) 
VALUES
('https://www.coca-colacompany.com/')

INSERT INTO tb_image(uniqueIdentifier, imageData)
SELECT NEWID(), BulkColumn
FROM OPENROWSET(BULK 'C:\Users\saygo\Downloads\puibli3.jpg', SINGLE_BLOB) as Image
Go 

INSERT INTO tb_advertisement_image(imageId, advertisementId)
values 
(SCOPE_IDENTITY(), 1)


INSERT INTO tb_advertisement (url) 
VALUES
('https://pozuelo.com/')

INSERT INTO tb_image(uniqueIdentifier, imageData)
SELECT NEWID(), BulkColumn
FROM OPENROWSET(BULK 'C:\Users\saygo\Downloads\puibli3.jpg', SINGLE_BLOB) as Image
Go 

INSERT INTO tb_advertisement_image(imageId, advertisementId)
values 
(SCOPE_IDENTITY(), 2)


INSERT INTO tb_advertisement (url) 
VALUES
('https://www.cooperativadospinos.com/')

INSERT INTO tb_image(uniqueIdentifier, imageData)
SELECT NEWID(), BulkColumn
FROM OPENROWSET(BULK 'C:\Users\saygo\Downloads\puibli3.jpg', SINGLE_BLOB) as Image
Go 

INSERT INTO tb_advertisement_image(imageId, advertisementId)
values 
(SCOPE_IDENTITY(), 3)


