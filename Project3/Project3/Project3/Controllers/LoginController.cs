using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project3.Model;
using System.Text.Json;

namespace Project3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        IConfiguration configuration;
        public LoginController(IConfiguration configuration)
        {
            this.configuration = configuration;
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
