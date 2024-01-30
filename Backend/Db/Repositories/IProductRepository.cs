using Db.Models;

namespace Db.Repositories
{
    public interface IProductRepository
    {
        public void Add<T>(T entity) where T : class;
        public Task Update<T>(T entity);
        public void Delete<T>(T entity) where T : class;

        public Task<Product[]> GetAllProductsAsync();
        public Task<Product?> GetProductAsyncById(int id);
    }
}
