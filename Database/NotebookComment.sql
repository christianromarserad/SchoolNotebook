CREATE TABLE [dbo].[NotebookComment]
(
	[Id] INT NOT NULL, 
    [NotebookId] INT NOT NULL, 
    [User] VARCHAR(50) NOT NULL, 
    [Comment] VARCHAR(50) NOT NULL, 
    [Date] DATE NOT NULL, 
    CONSTRAINT [PK_NotebookComment] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_NotebookComment_Notebook] FOREIGN KEY ([NotebookId]) REFERENCES [Notebook]([Id]), 
	CONSTRAINT [FK_NotebookComment_User] FOREIGN KEY ([User]) REFERENCES [User]([Email])
)
