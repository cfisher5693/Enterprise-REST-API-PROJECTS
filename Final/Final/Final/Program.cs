using Microsoft.EntityFrameworkCore;
using Final.Middleware;
using Final.Model;
using Final.Services;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddTransient<ITodoItemService, TodoService>();

builder.Services.AddControllersWithViews().AddJsonOptions(o => o.JsonSerializerOptions.Converters.Add(new TodoDateTimeConverter()));
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration["ConnectionString"];
builder.Services.AddDbContext<ItemDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddIdentity<IdentityUser, IdentityRole>(config =>
{
    config.Password.RequireDigit = true;
    config.Password.RequiredLength = 8;
    config.Password.RequireUppercase = true;
    config.Password.RequireLowercase = true;
    config.Password.RequireNonAlphanumeric = false;
    config.SignIn.RequireConfirmedEmail = false;
    config.SignIn.RequireConfirmedAccount = false;
    config.User.RequireUniqueEmail = false;
}).AddEntityFrameworkStores<ItemDbContext>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/user/login";
    options.AccessDeniedPath = "/user/login";
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
