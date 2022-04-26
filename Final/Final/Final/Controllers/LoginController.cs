using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Final.Model;
using System.Text.Json;
using Microsoft.AspNetCore.Identity;

namespace Final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        IConfiguration configuration;
        private UserManager<IdentityUser> userManager;
        private SignInManager<IdentityUser> signInManager;
        public LoginController(IConfiguration configuration, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            this.configuration = configuration;
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateUser([FromBody] TodoUserLogin creds)
        {
            var result = await userManager.CreateAsync(new IdentityUser()
            {
                UserName = creds.UserName,
            }, creds.Password);
            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] TodoUserLogin creds)
        {
            var result = await signInManager.PasswordSignInAsync(creds.UserName, creds.Password, true, false);
            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<TokenResponse> PostForTokenAsync([FromBody] TokenRequest request)
        {
            request.client_id = configuration["ClientID"];
            request.client_secret = configuration["ClientSecret"];

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("Accept", "application/json");
            HttpResponseMessage response = await client.PostAsJsonAsync("https://github.com/login/oauth/access_token", request);
            TokenResponse tokenResponse = await JsonSerializer.DeserializeAsync<TokenResponse>(await response.Content.ReadAsStreamAsync());
            return tokenResponse;
        }
    }
}