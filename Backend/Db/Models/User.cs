using System.ComponentModel.DataAnnotations;

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

        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        [Required]
        public string Cpf { get; set; } = string.Empty;

        [Required]
        public Access Access { get; set; }
    }
}
