IF OBJECT_ID(N'__EFMigrationsHistory') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [Objectives] (
    [ObjectiveId] int NOT NULL IDENTITY,
    [Name] nvarchar(max),
    [UserId] nvarchar(max),
    CONSTRAINT [PK_Objectives] PRIMARY KEY ([ObjectiveId])
);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20170510163728_Init', N'1.1.1');

GO

