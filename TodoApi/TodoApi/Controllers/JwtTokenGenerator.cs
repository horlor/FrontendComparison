using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace TodoApi.Controllers
{
    public class JwtTokenGenerator
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public SymmetricSecurityKey Key { get; set; }
        public DateTime Expiration { get; set; }

        public object GenerateToken(string userId, string username)

        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("username", username),
            };

            var creds = new SigningCredentials(Key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(Issuer, Audience, claims, null, Expiration, creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
