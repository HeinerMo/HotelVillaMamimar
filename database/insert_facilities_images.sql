USE [hotelMamimar]
GO

/*
FACILITY 1
*/

INSERT INTO tb_facility (description) 
VALUES
('Imag�nate un lugar rodeado de exuberantes paisajes naturales, en donde los hu�spedes pueden disfrutar de una experiencia �nica de contacto con la naturaleza y la vida silvestre. En este hotel, hay �reas especialmente dise�adas para la observaci�n de aves, como terrazas, jardines, senderos y miradores estrat�gicamente ubicados para que los hu�spedes puedan apreciar de manera c�moda y segura a estas fascinantes criaturas.')

INSERT INTO tb_image(uniqueIdentifier, imageData)
SELECT NEWID(), BulkColumn
FROM OPENROWSET(BULK 'C:\Users\sojos\Documents\I Semestre 2023\Ingenier�a de Software\Img\Facility1.jpg', SINGLE_BLOB) as Image
Go 

INSERT INTO tb_facility_image(imageId, facilityId)
values 
(SCOPE_IDENTITY(), SCOPE_IDENTITY())

/*
FACILITY 2
*/

INSERT INTO tb_facility (description) 
VALUES
('Para garantizar la privacidad y la comodidad de los hu�spedes, los ba�os compartidos est�n separados por g�nero y se encuentran en �reas convenientes y accesibles de nuestro local. Adem�s, nuestros colaboradores se encarga de mantener los ba�os limpios y en buen estado durante todo el d�a.')

INSERT INTO tb_image(uniqueIdentifier, imageData)
SELECT NEWID(), BulkColumn
FROM OPENROWSET(BULK 'C:\Users\sojos\Documents\I Semestre 2023\Ingenier�a de Software\Img\Facility2.jpg', SINGLE_BLOB) as Image
Go 

INSERT INTO tb_facility_image(imageId, facilityId)
values 
(SCOPE_IDENTITY(), SCOPE_IDENTITY())

/*
FACILITY 3
*/

INSERT INTO tb_facility (description) 
VALUES
('El parqueo es una de las facilidades m�s destacadas, ya que se cuenta con un espacio amplio y seguro para el estacionamiento de autos y otros veh�culos. El parqueo del hotel est� dise�ado para que los hu�spedes puedan acceder a �l de manera f�cil y c�moda. Los espacios est�n bien organizados, con suficiente espacio para maniobrar y estacionar el veh�culo sin problemas.')

INSERT INTO tb_image(uniqueIdentifier, imageData)
SELECT NEWID(), BulkColumn
FROM OPENROWSET(BULK 'C:\Users\sojos\Documents\I Semestre 2023\Ingenier�a de Software\Img\Facility3.jpg', SINGLE_BLOB) as Image
Go 

INSERT INTO tb_facility_image(imageId, facilityId)
values 
(SCOPE_IDENTITY(), SCOPE_IDENTITY())

/*
FACILITY 4
*/

INSERT INTO tb_facility (description) 
VALUES
('Imag�nate un lugar rodeado de naturaleza y paisajes hermosos, que ofrece a sus hu�spedes la oportunidad de disfrutar de la vida al aire libre en una zona de camping. Nuestra zona de camping est� dise�ada para brindar una experiencia �nica y aut�ntica a los hu�spedes que deseen explorar la naturaleza y acampar bajo las estrellas.')

INSERT INTO tb_image(uniqueIdentifier, imageData)
SELECT NEWID(), BulkColumn
FROM OPENROWSET(BULK 'C:\Users\sojos\Documents\I Semestre 2023\Ingenier�a de Software\Img\Facility4.jpg', SINGLE_BLOB) as Image
Go 

INSERT INTO tb_facility_image(imageId, facilityId)
values 
(SCOPE_IDENTITY(), SCOPE_IDENTITY())

/*
FACILITY 5
*/

INSERT INTO tb_facility (description) 
VALUES
('Contamos con acceso directo al R�o Gato, lo que permite a los hu�spedes disfrutar de este hermoso r�o sin tener que desplazarse a otros lugares. La zona del r�o est� dise�ada para garantizar la seguridad y la comodidad de los hu�spedes, es una opci�n ideal para aquellos hu�spedes que desean disfrutar de actividades acu�ticas en un ambiente natural y seguro.')

INSERT INTO tb_image(uniqueIdentifier, imageData)
SELECT NEWID(), BulkColumn
FROM OPENROWSET(BULK 'C:\Users\sojos\Documents\I Semestre 2023\Ingenier�a de Software\Img\Facility5.jpg', SINGLE_BLOB) as Image
Go 

INSERT INTO tb_facility_image(imageId, facilityId)
values 
(SCOPE_IDENTITY(), SCOPE_IDENTITY())


