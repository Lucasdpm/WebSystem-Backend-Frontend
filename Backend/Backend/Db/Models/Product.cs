namespace Backend.Db.Models
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

        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; } = 0;
        public float Weight { get; set; } = 0;
        public string Description { get; set; } = string.Empty;
        public int Storage { get; set; }
    }
}
