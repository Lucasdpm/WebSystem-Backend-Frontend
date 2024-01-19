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
            try
            {
                var result = await _userRepository.GetAllUsersAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            try
            {
                var result = await _userRepository.GetUserAsyncById(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post(User model)
        {
            try
            {
                _userRepository.Add(model);

                if (await _userRepository.SaveChangesAsync())
                {
                    return Ok(model);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> Put(int userId, User model)
        {
            try
            {
                var User = await _userRepository.GetUserAsyncById(userId);
                if (User == null) return NotFound();

                _userRepository.Update(model);

                if (await _userRepository.SaveChangesAsync())
                {
                    return Ok(model);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> Delete(int userId)
        {
            try
            {
                var User = await _userRepository.GetUserAsyncById(userId);
                if (User == null) return NotFound();

                _userRepository.Delete(User);

                if (await _userRepository.SaveChangesAsync())
                {
                    return Ok("Deletado");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }
    }
}
