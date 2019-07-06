CREATE TABLE [dbo].[NotebookPage]
(
	[NotebookId] INT NOT NULL, 
    [PageNumber] INT NOT NULL, 
    [Content] VARCHAR(MAX) NOT NULL,
	[Title] VARCHAR(50) NOT NULL, 
    CONSTRAINT PK_NotebookPage PRIMARY KEY ([NotebookId],[PageNumber]), 
    CONSTRAINT [FK_NotebookPage_Notebook] FOREIGN KEY ([NotebookId]) REFERENCES [Notebook]([Id]), 
)
