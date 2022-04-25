using Microsoft.EntityFrameworkCore;
using Final.Model;

namespace Final.Services
{
    public class TodoService : ITodoItemService
    {
        //TEMPORARY
        private IList<Item> items;
        private ItemDbContext _context;

        public TodoService(ItemDbContext itemDbContext)
        {
            this.items = new List<Item>();
            this._context = itemDbContext;
        }
        //TEMPORARY
        public Item Create(Item item)
        {
            this._context.Items.Add(item);
            this._context.SaveChanges();
            return item;
        }

        public bool Delete(int itemId, string owner)
        {
            this._context.Items.Remove(GetById(itemId, owner));
            this._context.SaveChanges();
            return true;
        }

        public Item GetById(int id, string owner)
        {
            var item = this._context.Items.Where(it => it.Owner == owner).Include(i => i.Tags).FirstOrDefault(i => i.Id == id);
            return item;
        }

        public IEnumerable<Item> Get(string owner)
        {
            return this._context.Items.Where(it => it.Owner == owner).Include(i => i.Tags).ToList<Item>();
        }

        public Item Update(Item item)
        {
            var itemUpdating = GetById(item.Id, item.Owner);
            itemUpdating.Name = item.Name;
            itemUpdating.Description = item.Description;
            itemUpdating.DueDate = item.DueDate;
            itemUpdating.Completed = item.Completed;
            itemUpdating.Tags.Clear();
            foreach(ItemTags tag in item.Tags)
            {
                itemUpdating.Tags.Add(tag);
            }
            this._context.SaveChanges();
            return itemUpdating;
        }
    }
}
