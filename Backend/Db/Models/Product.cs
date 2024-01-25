using System.ComponentModel.DataAnnotations;

namespace Db.Models
{
    public class Product
    {
        public Product(int id, string name, float price, float weight, string description, int storage)
        {
            Id = id;
            Name = name;
            Price = price;
            Weight = weight;
            Description = description;
            Storage = storage;
        }

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
