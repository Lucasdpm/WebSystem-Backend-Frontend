using Db.Models;
using Db.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace  Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        [Authorize(Policy = "Mod")]
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            var result = await _userRepository.GetAllUsersAsync();
            return Ok(result);

        }

        [HttpGet("{userId}")]
        [Authorize(Policy = "Mod")]
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            var result = await _userRepository.GetUserAsyncById(userId);
            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> PostAccountAsync([FromBody] User data)
        {
            try
            {
                await _userRepository.CreateUserAsync(data.Name, data.Email, data.Password, data.Cpf);
            } 
            catch (DuplicateNameException exception)
            {
                if(exception == new DuplicateNameException("E-mail em uso."))
                {
                    return Conflict("E-mail em uso.");
                } 
                else if (exception == new DuplicateNameException("Cpf em uso."))
                {
                    return Conflict("Cpf em uso.");
                }
            }
            
            return Ok();
        }


        [HttpPut("{userId}")]
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> Put(int userId, User model)
        {
            var User = await _userRepository.GetUserAsyncById(userId);
            _userRepository.Update(model);
            return Ok(model);
        }

        [HttpDelete("{userId}")]
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> Delete(int userId)
        {
            var User = await _userRepository.GetUserAsyncById(userId);
            if (User == null)
            {
                return BadRequest();
            }
            _userRepository.Delete(User);
            return Ok("Deletado");
        }

        [HttpGet("userAccess/{userId}")]
        public async Task<IActionResult> GetUserAccessAsyncById(int userId)
        {
            var result = await _userRepository.GetUserAsyncById(userId);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result.Access);
        }

        [HttpGet("userEmail/{userEmail}")]
        public async Task<IActionResult> UserEmailAsyncVerifier(string userEmail)
        {
            var result = await _userRepository.UserEmailIsValidAsync(userEmail);
            if (result.Equals(true))
            {
                return Ok();
            }
            return Conflict();
            
        }

        [HttpGet("userCpf/{usercCpf}")]
        public async Task<IActionResult> UserCpfIsValidAsync(string usercCpf)
        {
            var result = await _userRepository.GetAllUsersAsync();
            for (int i = 0; i < result.Length; i++)
            {
                if (result[i].Cpf == usercCpf)
                {
                    return Conflict();
                }
            }
            return Ok();
        }
    }
}
