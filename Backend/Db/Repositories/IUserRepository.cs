using Db.Models;
using Microsoft.AspNetCore.Mvc;

namespace Db.Repositories
{
    public interface IUserRepository
    {
        public void Add<T>(T entity) where T : class;
        public void Update<T>(T entity) where T : class;
        public void Delete<T>(T entity) where T : class;

        public Task<User> CreateUserAsync(string name, string email, string password, string cpf);
        public Task<User[]> GetAllUsersAsync();
        public Task<User?> GetUserAsyncById(int id);
        public Task<bool> UserEmailIsValidAsync(string email);
        public Task<bool> UserCpfIsValidAsync(int id);
    }
}
