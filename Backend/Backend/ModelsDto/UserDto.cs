﻿using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public enum AccessDto
    {
        USER,
        MOD,
        ADMIN
    }

    public class UserDto
    {
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
        public AccessDto Access { get; set; }
    }
}
