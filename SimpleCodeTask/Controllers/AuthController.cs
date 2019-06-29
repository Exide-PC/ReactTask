using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SimpleCodeTask.Services;

namespace SimpleCodeTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private IAuthService _authService;

        public class LoginParameters
        {
            public string Login { get; set; }
            public string Password { get; set; }
        }

        public AuthController(IAuthService authService)
        {
            this._authService = authService;
        }

        [HttpPost("[action]")]
        public ActionResult<AuthData> Login([FromForm]LoginParameters loginData)
        {
            var token = _authService.Login(
                loginData.Login, 
                loginData.Password);

            if (token == null)
                return Unauthorized();

            return token;
        }
    }
}