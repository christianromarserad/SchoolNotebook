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
    /// <summary>
    /// This api controller is used to manage the users
    /// </summary>
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

        /// <summary>
        /// This method is used to login to the api
        /// </summary>
        /// <param name="loginViewModel">The login view model that checks the tokenid</param>
        /// <returns>An error or a jwt token</returns>
        [HttpPost("[action]")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginViewModel loginViewModel)
        {
            Payload payload = null;

            try
            {
                payload = await GoogleJsonWebSignature.ValidateAsync(loginViewModel.TokenId, new GoogleJsonWebSignature.ValidationSettings());
            }
            catch (Exception ex)
            {
                return BadRequest("hello");
            }

            if (!_context.User.Any(u => u.Email == payload.Email))
            {
               
                _context.User.Add(new User
                {
                    Email = payload.Email,
                    Name = payload.Name,
                    Picture = payload.Picture
                });
            }
            else
            {
                var user = _context.User.Single(u => u.Email == payload.Email);
                user.Name = payload.Name;
                user.Picture = payload.Picture;
            }

            _context.SaveChanges();


            var claim = new[]
            {
                new Claim("email", payload.Email),
                new Claim("name", payload.Name),
                new Claim("picture", payload.Picture)
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
