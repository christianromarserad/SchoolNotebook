CREATE TABLE [dbo].[NotebookShare]
(
	[User] VARCHAR(50) NOT NULL, 
    [NotebookId] INT NOT NULL, 
    [CanEdit] BIT NOT NULL, 
    [DateShared] DATE NOT NULL,
	CONSTRAINT PK_NotebookShare PRIMARY KEY ([User],[NotebookId]), 
    CONSTRAINT [FK_NotebookShare_User] FOREIGN KEY ([User]) REFERENCES [User]([Email]), 
    CONSTRAINT [FK_NotebookShare_Notebook] FOREIGN KEY ([NotebookId]) REFERENCES [Notebook]([Id])
)
