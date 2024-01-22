using Backend.Db.Models;

namespace Backend.Db.Repositories
{
    public interface IProductRepository
    {
        public void Add<T>(T entity) where T : class;
        public void Update<T>(T entity) where T : class;
        public void Delete<T>(T entity) where T : class;

        public Task<Product[]> GetAllProductsAsync();
        public Task<Product?> GetProductAsyncById(int id);
    }
}
