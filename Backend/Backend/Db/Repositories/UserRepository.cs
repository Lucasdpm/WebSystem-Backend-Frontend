using Backend.Db.Data;
using Backend.Db.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Db.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext _context;

        public UserRepository(DatabaseContext context)
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

        public async Task<User[]> GetAllUsersAsync()
        {
            return await _context.Users.ToArrayAsync();
        }

        public async Task<User?> GetUserAsyncById(int id)
        {
            return await _context.Users
                .SingleOrDefaultAsync(user => user.Id == id);
        }
    }
}
