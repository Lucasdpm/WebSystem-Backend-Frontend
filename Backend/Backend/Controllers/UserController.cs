using Backend.Db.Models;
using Backend.Db.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers
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

        [HttpPost]
        public async Task<IActionResult> Post(User model)
        {
            _userRepository.Add(model);
            return Ok(model);
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> Put(int userId, User model)
        {
            var User = await _userRepository.GetUserAsyncById(userId);
            _userRepository.Update(model);
            return Ok(model);
        }

        [HttpDelete("{userId}")]
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
