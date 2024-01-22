using System.ComponentModel.DataAnnotations;

namespace Backend.Db.Models
{
    public class ProductDto
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public float Price { get; set; } = 0;
        public float Weight { get; set; } = 0;
        public string Description { get; set; } = string.Empty;
        public int Storage { get; set; } = 0;
    }
}
