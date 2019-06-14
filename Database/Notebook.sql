CREATE TABLE [dbo].[Notebook]
(
	[Id] INT NOT NULL IDENTITY PRIMARY KEY, 
    [User] VARCHAR(50) NOT NULL, 
    [Name] VARCHAR(50) NOT NULL,  
    [Public] BIT NOT NULL,
	CONSTRAINT [FK_Notebook_User] FOREIGN KEY ([User]) REFERENCES [User]([Email])
)
