using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolNotebook.Models;
using SchoolNotebook.ViewModels;

namespace SchoolNotebook.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private SchoolNotebookContext _context;

        public BookmarkController(SchoolNotebookContext context)
        {
            _context = context;
        }

        // GET: api/Bookmark
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Bookmark.ToList());
        }

        // GET: api/Bookmark/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Bookmark
        [HttpPost]
        public IActionResult Post([FromBody] BookmarkViewModel bookmarkViewModel)
        {
            if (ModelState.IsValid)
            {
                var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

                _context.Bookmark.Add(new Bookmark
                {
                    Name = bookmarkViewModel.Name,
                    Url = bookmarkViewModel.Url,
                    User = currentUser
                });

                _context.SaveChanges();

                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // PUT: api/Bookmark/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var bookmark = _context.Bookmark.SingleOrDefault(b => b.Id == id);

            if (bookmark == null)
            {
                return NotFound();
            }
            else
            {
                _context.Bookmark.Remove(bookmark);
                _context.SaveChanges();
                return Ok();
            }
        }
    }
}
