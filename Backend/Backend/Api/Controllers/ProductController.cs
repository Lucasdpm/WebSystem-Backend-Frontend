using Backend.Db.Models;
using Backend.Db.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                var result = await _productRepository.GetAllProductsAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpGet("{productId}")]
        public async Task<IActionResult> GetByProductId(int productId)
        {
            try
            {
                var result = await _productRepository.GetProductAsyncById(productId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Product model)
        {
            _productRepository.Add(model);
            return Ok(model);            
        }

        [HttpPut("{productId}")]
        public async Task<IActionResult> Put(int productId, Product model)
        {
            try
            {
                var Product = await _productRepository.GetProductAsyncById(productId);

                if (Product == null) {
                    return NotFound();
                } 

                _productRepository.Update(model);

                if (await _productRepository.SaveChangesAsync())
                {
                    return Ok(model);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return Ok();
        }

        [HttpDelete("{productId}")]
        public async Task<IActionResult> Delete(int productId)
        {
            try
            {
                var Product = await _productRepository.GetProductAsyncById(productId);
                if (Product == null) return NotFound();

                _productRepository.Delete(Product);

                if (await _productRepository.SaveChangesAsync())
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
