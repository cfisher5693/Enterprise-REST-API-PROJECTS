using Project4.Model;

namespace Project4.Services
{
    public interface ITodoItemService
    {
        IEnumerable<Item> Get();
        Item Create(Item item);
        Item Update(Item item);
        bool Delete(int itemId);
    }
}
