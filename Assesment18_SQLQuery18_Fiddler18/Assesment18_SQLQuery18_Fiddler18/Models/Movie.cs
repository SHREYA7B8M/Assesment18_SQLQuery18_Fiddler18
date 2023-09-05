using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Assesment18_SQLQuery18_Fiddler18.Models
{
    [Table("Movie")]
    public class Movie
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Genre { get; set; }
        public DateTime ReleaseDate { get; set; }   
    }
}
