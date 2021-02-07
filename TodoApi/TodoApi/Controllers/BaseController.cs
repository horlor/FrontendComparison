using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace TodoApi.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        protected string UserId { 
            get
            {
                return User.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;
            } 
        }
    }
}
