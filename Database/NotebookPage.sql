CREATE TABLE [dbo].[NotebookPage]
(
	[NotebookId] INT NOT NULL, 
    [PageNumber] INT NOT NULL, 
    [Notes] VARCHAR(MAX) NOT NULL,
	CONSTRAINT PK_NotebookPage PRIMARY KEY ([NotebookId],[PageNumber]), 
    CONSTRAINT [FK_NotebookPage_Notebook] FOREIGN KEY ([NotebookId]) REFERENCES [Notebook]([Id]), 
)
