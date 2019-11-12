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
    /// <summary>
    /// This api controller is used to manage the bookmark data  in the database
    /// </summary>
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

        /// <summary>
        /// This method will get the list of bookmarks
        /// </summary>
        /// <returns>List of bookmarks</returns>
        [HttpGet]
        public IActionResult Get()
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            return Ok(_context.Bookmark.Where(b => b.User == currentUser).ToList());
        }

        /// <summary>
        /// This method will get a specific bookmark
        /// </summary>
        /// <param name="id">The id of the bookmark that will returned</param>
        /// <returns>The bookmark associated with the id parameter</returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var bookmark = _context.Bookmark.SingleOrDefault(b => b.Id == id);

            if (bookmark == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(bookmark);
            }
        }

        /// <summary>
        /// This method is used to create a bookmark
        /// </summary>
        /// <param name="bookmarkViewModel">The bookmark view model that will be added to the database</param>
        /// <returns>An error or an ok response</returns>
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

        /// <summary>
        /// This method will update a bookmark from the database
        /// </summary>
        /// <param name="id">The id of bookrmark that will be updated</param>
        /// <param name="bookmarkViewModel">The view model that will used to update the values of the bookmark</param>
        /// <returns>An error or an ok response</returns>
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] BookmarkViewModel bookmarkViewModel)
        {
            if (ModelState.IsValid)
            {
                var bookmark = _context.Bookmark.SingleOrDefault(b => b.Id == id);

                if (bookmark == null)
                {
                    return NotFound();
                }
                else
                {
                    bookmark.Name = bookmarkViewModel.Name;
                    bookmark.Url = bookmarkViewModel.Url;

                    _context.SaveChanges();

                    return Ok();
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        /// <summary>
        /// This method will delete a bookmark from the database
        /// </summary>
        /// <param name="id">The id of the bookmark that will be deleted</param>
        /// <returns>An error or an ok response</returns>
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
