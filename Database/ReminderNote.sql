CREATE TABLE [dbo].[ReminderNote]
(
	[Id] INT NOT NULL IDENTITY PRIMARY KEY, 
    [User] VARCHAR(50) NOT NULL, 
    [Notes] VARCHAR(160) NOT NULL,
	CONSTRAINT [FK_ReminderNote_User] FOREIGN KEY ([User]) REFERENCES [User]([Email])
)
