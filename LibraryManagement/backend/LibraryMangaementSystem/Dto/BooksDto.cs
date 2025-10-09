namespace LibraryMangaementSystem.Dto;

public class BooksDto(string book_Name, string category, string author, string publisher, string edition, string iSBN, DateOnly published_Date, string bookStatus)
{

    public string Book_Name { get; set; } = book_Name;
    public string Category { get; set; } = category;
    public string Author { get; set; } = author;
    public string Publisher { get; set; } = publisher;
    public string Edition { get; set; } = edition;
    public string ISBN { get; set; } = iSBN;
    public DateOnly Published_Date { get; set; } = published_Date;
    public string BookStatus { get; set; } = bookStatus;
}
