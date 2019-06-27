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
    public class NotebookCommentController : ControllerBase
    {
        private SchoolNotebookContext _context;

        public NotebookCommentController(SchoolNotebookContext context)
        {
            _context = context;
        }

        // GET: api/NotebookComment
        [HttpGet]
        public IActionResult Get(int notebookId)
        {
            return Ok(_context.NotebookComment.Where(nc => nc.NotebookId == notebookId).ToList());
        }

        // POST: api/NotebookComment
        [HttpPost]
        public IActionResult Post([FromBody] NotebookCommentViewModel notebookCommentViewModel)
        {
            if (ModelState.IsValid)
            {
                var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

                _context.NotebookComment.Add(new NotebookComment
                {
                    Comment = notebookCommentViewModel.Comment,
                    Date = DateTime.Now,
                    NotebookId = notebookCommentViewModel.NotebookId,
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

        // PUT: api/NotebookComment/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
