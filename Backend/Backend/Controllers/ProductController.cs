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
            var result = await _productRepository.GetAllProductsAsync();
            return Ok(result);
        }

        [HttpGet("{productId}")]
        public async Task<IActionResult> GetByProductId(int productId)
        {
            var result = await _productRepository.GetProductAsyncById(productId);
            return Ok(result);
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
            var Product = await _productRepository.GetProductAsyncById(productId);
            _productRepository.Update(model);
            return Ok(model);
        }

        [HttpDelete("{productId}")]
        public async Task<IActionResult> Delete(int productId)
        {
            var Product = await _productRepository.GetProductAsyncById(productId);
            if (Product == null)
            {
                return BadRequest();
            }
            _productRepository.Delete(Product);
            return Ok(Product);
        }
    }
}
