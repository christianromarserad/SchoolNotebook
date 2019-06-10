using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SchoolNotebook.Models;
using SchoolNotebook.ViewModels;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace SchoolNotebook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private IConfiguration _configugartion;
        private SchoolNotebookContext _context;

        public UserController(IConfiguration configuration, SchoolNotebookContext context)
        {
            _configugartion = configuration;
            _context = context;
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginViewModel loginViewModel)
        {
            Payload payload = null;

            try
            {
                payload = GoogleJsonWebSignature.ValidateAsync(loginViewModel.TokenId, new GoogleJsonWebSignature.ValidationSettings()).Result;
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            if (!_context.User.Any(u => u.Email == payload.Email))
            {
                _context.User.Add(new User
                {
                    Email = payload.Email
                });

                _context.SaveChanges();
            }

            var claim = new[]
            {
                new Claim("email", payload.Email),
                new Claim("givenName", payload.GivenName),
                new Claim("familyName", payload.FamilyName)
            };

            var signinKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configugartion["Jwt:SigningKey"]));

            int expiryInMinutes = Convert.ToInt32(_configugartion["Jwt:ExpiryInMinutes"]);

            var token = new JwtSecurityToken(
                issuer: _configugartion["Jwt:Site"],
                audience: _configugartion["Jwt:Site"],
                claims: claim,
                expires: DateTime.UtcNow.AddMinutes(expiryInMinutes),
                signingCredentials: new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256)
            );

            return Ok(
                new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
        }
    }
}
