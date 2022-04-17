namespace Project4.Model
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public int Completed { get; set; }
        public IList<ItemTags> Tags { get; set; } = new List<ItemTags>();
    }
}
