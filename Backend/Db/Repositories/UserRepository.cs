using Db.Data;
using Db.Models;
using Db.Utils;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Db.Repositories
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
            _context.SaveChangesAsync();
        }

        public void Update<T>(T entity) where T : class
        {
            _context.ChangeTracker.Clear();
            _context.Update(entity);
            _context.SaveChangesAsync();
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
            _context.SaveChangesAsync();
        }
        
        public async Task<User> CreateUserAsync(string name, string email, string password, string cpf)
        {

            var existingEmail = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            var existingCpf = await _context.Users.FirstOrDefaultAsync(u => u.Cpf == cpf);

            if (existingEmail != null)
            {
                throw new DuplicateNameException("E-mail em uso.");
            }
            if (existingEmail != null)
            {
                throw new DuplicateNameException("Cpf em uso.");
            }

            var user = new User
            {
                Name = name.Trim(),
                Email = email.Trim().ToLower(),
                Password = PasswordHasher.Hash(password),
                Cpf = new string(cpf.Where(c => char.IsDigit(c)).ToArray()),
                Access = Access.USER
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User[]> GetAllUsersAsync()
        {
            return await _context.Users.ToArrayAsync();
        }

        public async Task<User?> GetUserAsyncById(int id)
        {
            return await _context.Users.SingleOrDefaultAsync(user => user.Id == id);
        }

        public async Task<User?> GetUserAsyncByEmail(string email)
        {
            return await _context.Users.SingleOrDefaultAsync(user => user.Email == email);
        }
    }
}
