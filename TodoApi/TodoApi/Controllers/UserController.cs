
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TodoContext dbcontext;
        private readonly UserManager<User> userManager;
        private readonly JwtTokenGenerator tokenGenerator;

        public UserController(TodoContext dbcontext, UserManager<User> userManager, JwtTokenGenerator tokenGenerator)
        {
            this.dbcontext = dbcontext;
            this.userManager = userManager;
            this.tokenGenerator = tokenGenerator;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var result = await userManager.CreateAsync(
                new User()
                {
                    UserName = model.Username,
                    Email = model.Email,
                },
                model.Password
                );
            Console.WriteLine(result.Succeeded);
            foreach(var item in result.Errors)
            {
                Console.WriteLine($"error: {item.Description}");
            }
            if (result.Succeeded)
                return Ok();
            else
                return BadRequest();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if(user != null)
            {
                var result = await userManager.CheckPasswordAsync(user, model.Password);
                if (result)
                {
                    var token = tokenGenerator.GenerateToken(user.Id, user.UserName);
                    return Ok(new LoginResult()
                    {
                        Token = token,
                        Expires = tokenGenerator.Expiration,
                        UserId = user.Id,
                        Username = user.UserName
                    });
                }
                    
            }
            return BadRequest();
        }
    }
}
