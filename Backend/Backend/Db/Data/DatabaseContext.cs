using Backend.Db.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Db.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Product> Products { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasData(new List<User>(){
                    new User(1, "User", "user@user.com.br","user", "10010010010", Access.USER),
                    new User(2, "Mod", "mod@mod.com.br","mod", "20020020020", Access.MOD),
                    new User(3, "Admin", "admin@admin.com.br", "admin", "30030030030", Access.ADMIN),
               });

            modelBuilder.Entity<Product>()
               .HasData(new List<Product>(){
                    new Product(1, "Um", 1, 1, "um", 1),
                    new Product(2, "Dois", 2, 2, "dois", 2),
                    new Product(3, "Tres", 3, 3, "tres", 3),
               });
       }
    }
}
