CREATE TABLE [dbo].[NotebookRate]
(
	[User] VARCHAR(50) NOT NULL , 
    [NotebookId] INT NOT NULL, 
    [Rate] INT NOT NULL,
    CONSTRAINT [FK_NotebookRate_User] FOREIGN KEY ([User]) REFERENCES [User]([Email]), 
    CONSTRAINT [FK_NotebookRate_NotebookId] FOREIGN KEY ([NotebookId]) REFERENCES [Notebook]([Id])
)
