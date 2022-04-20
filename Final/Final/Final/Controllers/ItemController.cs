using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Final.Model;
using Final.Services;

namespace Final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly ITodoItemService _todoItemService;
        public ItemController(ITodoItemService itemService)
        {
            this._todoItemService = itemService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetAllItems()
        {
            return Ok(this._todoItemService.Get());
        }

        [HttpPost]
        public async Task<ActionResult<Item>> CreateItem([FromBody]Item item)
        {
            return Ok(this._todoItemService.Create(item));
        }

        [HttpPut]
        public async Task<ActionResult<Item>> UpdateItem([FromBody]Item item)
        {
            return Ok(this._todoItemService.Update(item));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            return Ok(this._todoItemService.Delete(id));
        }
    }
}
