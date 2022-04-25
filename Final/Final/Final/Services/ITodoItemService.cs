using Final.Model;

namespace Final.Services
{
    public interface ITodoItemService
    {
        IEnumerable<Item> Get(string owner);
        Item Create(Item item);
        Item Update(Item item);
        bool Delete(int itemId, string owner);
    }
}
