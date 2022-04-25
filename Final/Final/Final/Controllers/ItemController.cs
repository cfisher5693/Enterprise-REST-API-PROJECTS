using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Final.Model;
using Final.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Final.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
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
            var owner = this.User.Identity.Name;
            return Ok(this._todoItemService.Get(owner));
        }

        [HttpPost]
        public async Task<ActionResult<Item>> CreateItem([FromBody]Item item)
        {
            var owner = this.User.Identity.Name;
            item.Owner = owner;
            return Ok(this._todoItemService.Create(item));
        }

        [HttpPut]
        public async Task<ActionResult<Item>> UpdateItem([FromBody]Item item)
        {
            var owner = this.User.Identity.Name;
            item.Owner = owner;
            return Ok(this._todoItemService.Update(item));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var owner = this.User.Identity.Name;
            return Ok(this._todoItemService.Delete(id, owner));
        }
    }
}
