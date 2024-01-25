using Db.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Db.Data
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
                    new Product(1, "ProdutoUm", 1, 1, "produto um", 1),
                    new Product(2, "ProdutoDois", 2, 2, "produto dois", 2),
                    new Product(3, "ProdutoTres", 3, 3, "produto tres", 3),
               });
        }
    }
}
