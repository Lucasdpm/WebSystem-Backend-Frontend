using Db.Models;
using Db.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace  Api.Controllers
{
    [ApiController]
    [Authorize(Policy = "Mod")]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var result = await _userRepository.GetAllUsersAsync();
            return Ok(result);

        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            var result = await _userRepository.GetUserAsyncById(userId);
            return Ok(result);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> PostAccountAsync([FromBody] User data)
        {
            await _userRepository.CreateUserAsync(data.Name, data.Email, data.Password, data.Cpf);
            return Ok();
        }

        [HttpPost]
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> Post(User model)
        {
            _userRepository.Add(model);
            return Ok(model);
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
    }
}
