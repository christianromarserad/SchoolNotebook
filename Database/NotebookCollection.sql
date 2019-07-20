CREATE TABLE [dbo].[NotebookCollection]
(
	[User] VARCHAR(50) NOT NULL, 
    [NotebookId] INT NOT NULL, 
	CONSTRAINT PK_NotebookCollection PRIMARY KEY ([User],[NotebookId]), 
    CONSTRAINT [FK_NotebookCollection_User] FOREIGN KEY ([User]) REFERENCES [User]([Email]), 
    CONSTRAINT [FK_NotebookCollection_Notebook] FOREIGN KEY ([NotebookId]) REFERENCES [Notebook]([Id])
)
