CREATE TABLE [dbo].[ReminderNote]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [User] VARCHAR(50) NOT NULL, 
    [Notes] VARCHAR(50) NOT NULL,
	CONSTRAINT [FK_ReminderNote_User] FOREIGN KEY ([User]) REFERENCES [User]([Email])
)
