using System.ComponentModel.DataAnnotations;

namespace Backend.ModelsDto
{
    public class UserLoginRequestDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Email { get; set; } = string.Empty;
    }
}
