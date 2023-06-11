/*
 This script resets the database if exists, 
 if not, the database is created. 
 
 Autor: Heiner Monge L.
 Creation Date: March 08 2023.
 */
USE master
GO

BEGIN TRY
	PRINT('Dropping database if exists.') 
	DROP DATABASE hotelMamimar
	PRINT('Database dropped.')
END TRY 
BEGIN CATCH 
	PRINT('Database did not exists')
END CATCH 
	PRINT('Creating database...') 
	CREATE DATABASE hotelMamimar
	ON
	PRIMARY ( NAME = Arch1,
		FILENAME = 'C:\data\archdat1.mdf'),
	FILEGROUP  FileStreamGroup1 CONTAINS FILESTREAM ( NAME = Arch3,
		FILENAME = 'C:\data\filestream1')
	LOG ON  ( NAME = Archlog1,
		FILENAME = 'C:\data\archlog1.ldf')
	GO
	PRINT('Database created successfully') 
BEGIN TRY 
	PRINT('Creating tables...') 
	USE hotelMamimar
BEGIN TRANSACTION 

	-- Admins
	CREATE TABLE tb_admin (
		id INT IDENTITY(1, 1) PRIMARY KEY NOT NULL
		,userName VARCHAR(80) NOT NULL
		,password VARCHAR(80) NOT NULL);

	--Season
	CREATE TABLE tb_season (
		id INT IDENTITY(1, 1) PRIMARY KEY NOT NULL
		,name VARCHAR(80) NOT NULL
		,porcentage INT NOT NULL
		,startingDate DATE NOT NULL
		,endingDate DATE NOT NULL);

	--Location
	CREATE TABLE tb_location (
		id INT IDENTITY(1, 1) PRIMARY KEY NOT NULL
		,latitude DECIMAL(8,6)
		,longitude DECIMAL(9,6)
		,extraDetails VARCHAR(400) NULL);

	--Room Type
	CREATE TABLE tb_room_type (
		id INT IDENTITY(1, 1) PRIMARY KEY NOT NULL
		,price NUMERIC(11, 4) NOT NULL
		,name VARCHAR(80) NOT NULL
		,description VARCHAR(500) NOT NULL);

	--Discount
	CREATE TABLE tb_discount (
		id INT IDENTITY(1, 1) PRIMARY KEY NOT NULL
		,startingDate DATETIME NOT NULL
		,endingDate DATETIME NOT NULL
		,name VARCHAR(80)
		,description VARCHAR(500)
		,roomTypeId INT NOT NULL
		,porcentage INT NOT NULL
		,FOREIGN KEY (roomTypeId) REFERENCES tb_room_type (id));

	--Customer
	CREATE TABLE tb_customer (
		id INT IDENTITY(1, 1) PRIMARY KEY NOT NULL
		,name VARCHAR(80) NOT NULL
		,lastName VARCHAR(80) NOT NULL
		,email VARCHAR(100) NOT NULL
		,id_number VARCHAR(100) UNIQUE NOT NULL
		,creditCardNumber VARCHAR(100) NOT NULL);

	--Room
	CREATE TABLE tb_room (
		id INT IDENTITY (1, 1) PRIMARY KEY NOT NULL
		,roomTypeId INT NOT NULL
		,active BIT NOT NULL DEFAULT 1
		,FOREIGN KEY (roomTypeId) REFERENCES tb_room_type (id));

	--Reservation
	CREATE TABLE tb_reservation (
		id INT IDENTITY(1, 1) PRIMARY KEY NOT NULL
		,startingDate DATE NOT NULL
		,endingDate DATE NOT NULL
		,roomId INT NOT NULL
		,customerId INT NOT NULL
		,FOREIGN KEY (roomId) REFERENCES tb_room (id)
		,FOREIGN KEY (customerId) REFERENCES tb_customer (id));

	--Facility
	CREATE TABLE tb_facility (
		id INT IDENTITY(1, 1) PRIMARY KEY NOT NULL
		,description VARCHAR(500) NOT NULL);

	--Advertisement
	CREATE TABLE tb_advertisement (
		id INT IDENTITY(1, 1) PRIMARY KEY NOT NULL
		,url VARCHAR(100) NOT NULL);

	-- Images
	CREATE TABLE tb_image (
		id INT IDENTITY(1, 1) PRIMARY KEY NOT NULL
		,uniqueIdentifier UNIQUEIDENTIFIER ROWGUIDCOL NOT NULL UNIQUE
		,imageData VARBINARY(MAX) FILESTREAM NULL);

	--Hotel information
	CREATE TABLE tb_hotel_information (
		id INT IDENTITY(1, 1) PRIMARY KEY NOT NULL
		,phone VARCHAR(20) NOT NULL
		,email VARCHAR(80) NOT NULL
		,instagram VARCHAR(200) NULL
		,facebook VARCHAR(200) NULL
		,welcomeMessage VARCHAR(500) NULL
		,aboutMessage VARCHAR(2000) NULL);

	--Hotel welcome images
	CREATE TABLE tb_hotel_welcome_image (
		id INT IDENTITY(1, 1) PRIMARY KEY NOT NULL
		,imageId INT NOT NULL
		,FOREIGN KEY (imageId) REFERENCES tb_image (id));

	--Hotel about images
	CREATE TABLE tb_hotel_about_image (
		id INT IDENTITY(1, 1) PRIMARY KEY NOT NULL
		,imageId INT NOT NULL
		,FOREIGN KEY (imageId) REFERENCES tb_image (id));
		
	--faility image
	CREATE TABLE tb_facility_image (
		id INT IDENTITY(1, 1) PRIMARY KEY NOT NULL
		,imageId INT NOT NULL
		,facilityId INT NOT NULL
		,FOREIGN KEY (imageId) REFERENCES tb_image (id)
		,FOREIGN KEY (facilityId) REFERENCES tb_facility (id));

	--roomtype image
	CREATE TABLE tb_room_type_image (
		id INT IDENTITY(1, 1) PRIMARY KEY NOT NULL
		,imageId INT NOT NULL
		,roomTypeId INT NOT NULL
		,FOREIGN KEY (imageId) REFERENCES tb_image (id)
		,FOREIGN KEY (roomTypeId) REFERENCES tb_room_type (id));

	--advertisement image
	CREATE TABLE tb_advertisement_image (
		id INT IDENTITY(1, 1) PRIMARY KEY NOT NULL
		,imageId INT NOT NULL
		,advertisementId INT NOT NULL
		,FOREIGN KEY (imageId) REFERENCES tb_image (id)
		,FOREIGN KEY (advertisementId) REFERENCES tb_advertisement (id));

	CREATE TABLE tb_feedback (
		id INT IDENTITY(1, 1) PRIMARY KEY NOT NULL
		,message VARCHAR(MAX) NOT NULL
	)

	PRINT('Tables created successfully') 
	
	/*
	 This section populates the data in the tables that are necessary. 
	 */
	PRINT('Populating tables...') 

	INSERT INTO tb_location 
		(extraDetails)
	VALUES
		('Pejivalle de Jiménez, un kilometro antes de la Reserva de Vida Silvestre la Marta Cartago, Provincia de Cartago, Costa Rica')

	INSERT INTO [dbo].[tb_hotel_information]
           ([phone]
           ,[email]
           ,[instagram]
           ,[facebook]
           ,[welcomeMessage]
           ,[aboutMessage])
     VALUES
           ('8694 9070'
           ,'villamamimar@outlook.com'
           ,'Villa Mamimar & Quinta Don Antonio'
           ,'Villa Mamimar & Quinta Don Antonio'
           ,''
           ,'En Villa Mami Mar somos un hotel ubicado en una hermosa zona montañosa, donde podrás disfrutar de vistas panorámicas y aire puro en un ambiente tranquilo y relajante. Nos enfocamos en brindar a nuestros huéspedes la oportunidad de conectarse con la naturaleza y desconectar de la rutina diaria, ofreciendo acogedoras habitaciones diseñadas para brindar la máxima comodidad y privacidad, y un personal amable y servicial siempre a tu disposición para asegurarse de que tengas todo lo que necesitas para una experiencia memorable. En nuestro hotel, encontrarás una amplia variedad de actividades al aire libre para disfrutar durante todo el año, desde senderismo y paseos en bicicleta hasta excursiones de pesca, ideal tanto para escapadas románticas como aventuras en familia. En resumen, en Villa Mami Mar encontrarás un ambiente acogedor, actividades al aire libre emocionantes y un equipo comprometido en hacer de tu estadía una experiencia inolvidable. ¡Esperamos tener el placer de recibirte pronto!'
			)



	INSERT INTO [dbo].[tb_season]
	(
		[name], [porcentage], [startingDate], [endingDate]
	)
	VALUES
		('Temporada alta', 20,'2023-11-1', '2023-03-31')
		,('Temporada baja', -20,'2023-04-1', '2023-10-31')

	INSERT INTO [dbo].[tb_admin]
	(
		[userName], [password]
	)
	VALUES 
	('admin','1234')

	
	COMMIT 
	PRINT('Database ready!')
END TRY 
BEGIN CATCH 
	ROLLBACK 
	PRINT ERROR_MESSAGE()
END CATCH
	