USE [hotelMamimar]
GO


INSERT INTO [dbo].[tb_room]
           ([roomTypeId]
           ,[active])
     VALUES
           (1,1)
		   ,(1,1)
		   ,(1,0)
		   ,(2,1)
		   ,(2,1)
		   ,(2,0)
		   ,(3,1)
		   ,(3,1)
		   ,(3,0)

INSERT INTO [dbo].[tb_customer]
           ([name]
           ,[lastName]
           ,[email]
           ,[id_number]
           ,[creditCardNumber])
     VALUES
           ('John', 'Doe', 'johndoe@example.com', '1234567890', '1234-5678-9012-3456'),
           ('Jane', 'Smith', 'janesmith@example.com', '0987654321', '9876-5432-1098-7654'),
           ('Michael', 'Johnson', 'michaeljohnson@example.com', '555555555', '5555-5555-5555-5555'),
           ('Emily', 'Brown', 'emilybrown@example.com', '987654321', '9876-5432-1987-6543'),
           ('David', 'Taylor', 'davidtaylor@example.com', '123456789', '1234-5678-9012-3456');

INSERT INTO [dbo].[tb_reservation]
           ([startingDate]
           ,[endingDate]
           ,[roomId]
           ,[customerId])
     VALUES
           ('2023-06-10', '2023-06-15', 1, 1),
           ('2023-07-01', '2023-07-05', 2, 2),
           ('2023-08-20', '2023-08-25', 4, 3),
           ('2023-09-10', '2023-09-15', 5, 4),
           ('2023-10-01', '2023-10-05', 7, 5);





