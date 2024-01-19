﻿using Backend.Db.Data;
using Backend.Db.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Db.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly DatabaseContext _context;

        public ProductRepository(DatabaseContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.ChangeTracker.Clear();
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task<Product[]> GetAllProductsAsync()
        {
            return await _context.Products.ToArrayAsync();
        }

        public async Task<Product?> GetProductAsyncById(int id)
        {
            return await _context.Products
                .SingleOrDefaultAsync(Product => Product.Id == id);
        }
    }
}
