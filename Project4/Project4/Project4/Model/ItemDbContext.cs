using Microsoft.EntityFrameworkCore;

namespace Project4.Model
{
    public class ItemDbContext : DbContext
    {
        public ItemDbContext(DbContextOptions<ItemDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.LogTo(Console.WriteLine).EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //WARNING WINDOW IMPLEMENTATION?
            modelBuilder.Entity<Item>().HasData(new Item
            {
                Id = 1,
                Name = "TODOTEST1",
                Description = "THIS IS A TEST ENTRY.",
                DueDate = DateTime.UtcNow,
                Completed = 0,
            });
            modelBuilder.Entity<ItemTags>().HasData(new ItemTags
            {
                Id = 50,
                Name = "TAGTEST1",
                ItemId = 1
            });
        }

        public DbSet<Item> Items { get; set; }
        public DbSet<ItemTags> Tags { get; set; }
    }
}
