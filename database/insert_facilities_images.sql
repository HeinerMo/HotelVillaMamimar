USE [hotelMamimar]
GO

/*
FACILITY 1
*/

INSERT INTO tb_facility (description) 
VALUES
('Imagínate un lugar rodeado de exuberantes paisajes naturales, en donde los huéspedes pueden disfrutar de una experiencia única de contacto con la naturaleza y la vida silvestre. En este hotel, hay áreas especialmente diseñadas para la observación de aves, como terrazas, jardines, senderos y miradores estratégicamente ubicados para que los huéspedes puedan apreciar de manera cómoda y segura a estas fascinantes criaturas.')

INSERT INTO tb_image(uniqueIdentifier, imageData)
SELECT NEWID(), BulkColumn
FROM OPENROWSET(BULK 'C:\Users\sojos\Documents\I Semestre 2023\Ingeniería de Software\Img\Facility1.jpg', SINGLE_BLOB) as Image
Go 

INSERT INTO tb_facility_image(imageId, facilityId)
values 
(SCOPE_IDENTITY(), SCOPE_IDENTITY())

/*
FACILITY 2
*/

INSERT INTO tb_facility (description) 
VALUES
('Para garantizar la privacidad y la comodidad de los huéspedes, los baños compartidos están separados por género y se encuentran en áreas convenientes y accesibles de nuestro local. Además, nuestros colaboradores se encarga de mantener los baños limpios y en buen estado durante todo el día.')

INSERT INTO tb_image(uniqueIdentifier, imageData)
SELECT NEWID(), BulkColumn
FROM OPENROWSET(BULK 'C:\Users\sojos\Documents\I Semestre 2023\Ingeniería de Software\Img\Facility2.jpg', SINGLE_BLOB) as Image
Go 

INSERT INTO tb_facility_image(imageId, facilityId)
values 
(SCOPE_IDENTITY(), SCOPE_IDENTITY())

/*
FACILITY 3
*/

INSERT INTO tb_facility (description) 
VALUES
('El parqueo es una de las facilidades más destacadas, ya que se cuenta con un espacio amplio y seguro para el estacionamiento de autos y otros vehículos. El parqueo del hotel está diseñado para que los huéspedes puedan acceder a él de manera fácil y cómoda. Los espacios están bien organizados, con suficiente espacio para maniobrar y estacionar el vehículo sin problemas.')

INSERT INTO tb_image(uniqueIdentifier, imageData)
SELECT NEWID(), BulkColumn
FROM OPENROWSET(BULK 'C:\Users\sojos\Documents\I Semestre 2023\Ingeniería de Software\Img\Facility3.jpg', SINGLE_BLOB) as Image
Go 

INSERT INTO tb_facility_image(imageId, facilityId)
values 
(SCOPE_IDENTITY(), SCOPE_IDENTITY())

/*
FACILITY 4
*/

INSERT INTO tb_facility (description) 
VALUES
('Imagínate un lugar rodeado de naturaleza y paisajes hermosos, que ofrece a sus huéspedes la oportunidad de disfrutar de la vida al aire libre en una zona de camping. Nuestra zona de camping está diseñada para brindar una experiencia única y auténtica a los huéspedes que deseen explorar la naturaleza y acampar bajo las estrellas.')

INSERT INTO tb_image(uniqueIdentifier, imageData)
SELECT NEWID(), BulkColumn
FROM OPENROWSET(BULK 'C:\Users\sojos\Documents\I Semestre 2023\Ingeniería de Software\Img\Facility4.jpg', SINGLE_BLOB) as Image
Go 

INSERT INTO tb_facility_image(imageId, facilityId)
values 
(SCOPE_IDENTITY(), SCOPE_IDENTITY())

/*
FACILITY 5
*/

INSERT INTO tb_facility (description) 
VALUES
('Contamos con acceso directo al Río Gato, lo que permite a los huéspedes disfrutar de este hermoso río sin tener que desplazarse a otros lugares. La zona del río está diseñada para garantizar la seguridad y la comodidad de los huéspedes, es una opción ideal para aquellos huéspedes que desean disfrutar de actividades acuáticas en un ambiente natural y seguro.')

INSERT INTO tb_image(uniqueIdentifier, imageData)
SELECT NEWID(), BulkColumn
FROM OPENROWSET(BULK 'C:\Users\sojos\Documents\I Semestre 2023\Ingeniería de Software\Img\Facility5.jpg', SINGLE_BLOB) as Image
Go 

INSERT INTO tb_facility_image(imageId, facilityId)
values 
(SCOPE_IDENTITY(), SCOPE_IDENTITY())


