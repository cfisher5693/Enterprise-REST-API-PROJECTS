using Final.Model;

namespace Final.Services
{
    public interface ITodoItemService
    {
        IEnumerable<Item> Get();
        Item Create(Item item);
        Item Update(Item item);
        bool Delete(int itemId);
    }
}
