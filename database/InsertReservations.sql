INSERT INTO tb_customer (name, lastName, email, id_number, creditCardNumber)
VALUES 
('John', 'Doe', 'johndoe@example.com', '123456789', '1111222233334444')
,('Jane', 'Smith', 'janesmith@example.com', '987654321', '5555666677778888')
,('David', 'Johnson', 'davidjohnson@example.com', '456789123', '9999000011112222')
,('Sarah', 'Williams', 'sarahwilliams@example.com', '321654987', '3333444455556666')
,('Michael', 'Brown', 'michaelbrown@example.com', '654987321', '7777888899990000')
,('Emily', 'Jones', 'emilyjones@example.com', '987123654', '1010101010101010')
,('Daniel', 'Davis', 'daviddavis@example.com', '258741369', '1212121212121212')
,('Olivia', 'Miller', 'oliviamiller@example.com', '753951852', '1313131313131313')
,('Andrew', 'Wilson', 'andrewwilson@example.com', '159357852', '1414141414141414')
,('Sophia', 'Taylor', 'sophiataylor@example.com', '369258147', '1515151515151515');

INSERT INTO tb_room (roomTypeId)
VALUES 
	(1), (1), (1), (1), (1),
	(2), (2), (2), (2), (2),
	(3), (3), (3), (3), (3),
	(1), (2), (3), (1), (2);


INSERT INTO tb_reservation (startingDate, endingDate, roomId, customerId)
VALUES 
	('2023-06-10', '2023-06-14', 1, 1),
	('2023-06-12', '2023-06-17', 2, 2),
	('2023-06-15', '2023-06-19', 3, 3),
	('2023-06-18', '2023-06-23', 4, 4),
	('2023-06-21', '2023-06-26', 5, 5),
	('2023-06-24', '2023-06-29', 6, 6),
	('2023-06-27', '2023-07-01', 7, 7),
	('2023-06-30', '2023-07-05', 8, 8),
	('2023-07-03', '2023-07-07', 9, 9),
	('2023-07-06', '2023-07-11', 10, 10);
