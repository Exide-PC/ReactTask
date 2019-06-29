using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SimpleCodeTask.Services
{
    public interface IAuthService
    {
        AuthData Login(string login, string password);
    }

    public class AuthData
    {
        public string Token { get; set; }
        public long Expires { get; set; }
        public string Name { get; set; }
    }

    public class AuthService: IAuthService
    {
        readonly string jwtSecret;
        readonly int jwtLifespan;

        public AuthService(string jwtSecret, int jwtLifespan)
        {
            this.jwtSecret = jwtSecret;
            this.jwtLifespan = jwtLifespan;
        }
        public AuthData Login(string login, string password)
        {
            if (login != "admin" || password != "admin")
                return null;

            var expirationTime = DateTime.UtcNow.AddSeconds(jwtLifespan);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Role, "admin")
                }),
                Expires = expirationTime,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken = tokenHandler.CreateToken(tokenDescriptor);
            string token = tokenHandler.WriteToken(securityToken);

            return new AuthData
            {
                Token = token,
                Expires = ((DateTimeOffset)expirationTime).ToUnixTimeSeconds(),
                Name = login
            };
        }
    }
}
