namespace LibraryMangaementSystem.Dto;

public class BooksDto
{
    
    public string Book_Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string Publisher { get; set; } = string.Empty;
    public string Edition { get; set; } = string.Empty;
    public string ISBN { get; set; } = string.Empty;
    public DateOnly Published_Date { get; set; }

    public BooksDto(string book_Name, string category, string author, string publisher, string edition, string iSBN, DateOnly published_Date)
    {
        Book_Name = book_Name;
        Category = category;
        Author = author;
        Publisher = publisher;
        Edition = edition;
        ISBN = iSBN;
        Published_Date = published_Date;
    }
}
