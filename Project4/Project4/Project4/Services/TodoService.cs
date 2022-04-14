using Microsoft.EntityFrameworkCore;
using Project4.Model;

namespace Project4.Services
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

        public bool Delete(int itemId)
        {
            this._context.Items.Remove(GetById(itemId));
            this._context.SaveChanges();
            return true;
        }

        public Item GetById(int id)
        {
            return this._context.Items.Include(i => i.Tags).FirstOrDefault(i => i.Id == id);
        }

        public IEnumerable<Item> Get()
        {
            return this._context.Items.Include(i => i.Tags).ToList<Item>();
        }

        public Item Update(Item item)
        {
            var itemUpdating = GetById(item.Id);
            itemUpdating.Name = item.Name;
            itemUpdating.Description = item.Description;
            itemUpdating.DueDate = item.DueDate;
            itemUpdating.Completed = item.Completed;
            foreach(ItemTags tag in item.Tags)
            {
                itemUpdating.Tags.Add(tag);
            }
            this._context.SaveChanges();
            return itemUpdating;
        }
    }
}
