using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Db.Models
{
    public enum Access
    {
        USER,
        MOD,
        ADMIN
    }

    public class User
    {
        public User(int id, string name, string email, string password, string cpf, Access access)
        {
            Id = id;
            Name = name;
            Email = email;
            Password = password;
            Cpf = cpf;
            Access = access;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Cpf { get; set; }
        public Access Access { get; set; }
    }
}
