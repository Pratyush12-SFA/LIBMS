ALTER TABLE Employees
ALTER COLUMN Phone NVARCHAR(10);

EXEC sp_rename 'Employees', 'Member';

SELECT*FROM Member;
