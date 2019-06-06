﻿CREATE TABLE [dbo].[Bookmark]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [User] VARCHAR(50) NOT NULL, 
    [Name] VARCHAR(50) NOT NULL, 
    [Url] VARCHAR(50) NOT NULL,
	CONSTRAINT [FK_Bookmark_User] FOREIGN KEY ([User]) REFERENCES [User]([Email])
)
