USE hotelMamimar
GO


INSERT INTO [dbo].[tb_room_type]
(
[price],
[name], 
[description]
)
VALUES
(150000.11,'Prueba', 'Prueba')
,(100000.00,'Estandar','Habitacion estandar')
,(50000.00,'Junior', 'Habitacion Junior')

INSERT INTO tb_image(uniqueIdentifier, imageData)
SELECT NEWID(), BulkColumn
FROM OPENROWSET(BULK 'C:\Users\saygo\OneDrive\Escritorio\habitacion3.jpg', SINGLE_BLOB) as Image
Go 

INSERT INTO tb_room_type_image(imageId, roomTypeId)
values 
(SCOPE_IDENTITY(), 1)


INSERT INTO tb_image(uniqueIdentifier, imageData)
SELECT NEWID(), BulkColumn
FROM OPENROWSET(BULK 'C:\Users\saygo\OneDrive\Escritorio\habitacion3.jpg', SINGLE_BLOB) as Image
Go 

INSERT INTO tb_room_type_image(imageId, roomTypeId)
values 
(SCOPE_IDENTITY(), 2)


INSERT INTO tb_image(uniqueIdentifier, imageData)
SELECT NEWID(), BulkColumn
FROM OPENROWSET(BULK 'C:\Users\saygo\OneDrive\Escritorio\habitacion2.jpg', SINGLE_BLOB) as Image
Go 

INSERT INTO tb_room_type_image(imageId, roomTypeId)
values 
(SCOPE_IDENTITY(), 3)


SELECT * from [dbo].[tb_room_type_image]