using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolNotebook.Models;
using SchoolNotebook.Services;
using SchoolNotebook.ViewModels;

namespace SchoolNotebook.Controllers
{
    /// <summary>
    /// This api controller is used to manage the notebook's comments from the database
    /// </summary>
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class NotebookCommentController : ControllerBase
    {
        private SchoolNotebookContext _context;
        private NotebookService _notebookService;

        public NotebookCommentController(SchoolNotebookContext context)
        {
            _context = context;
            _notebookService = new NotebookService(_context);
        }

        /// <summary>
        /// This method is used to get the comments from the notebook
        /// </summary>
        /// <param name="notebookId">The notebook id that will be used to get the comments</param>
        /// <returns>The list of comments from the notebook</returns>
        [HttpGet]
        public IActionResult Get(int notebookId)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            if (!_notebookService.CanUserView(notebookId, currentUser))
            {
                return Forbid();
            }

            return Ok(_context.NotebookComment.Where(nc => nc.NotebookId == notebookId).ToList());
        }

        /// <summary>
        /// This method is used to create a comment for the notebook
        /// </summary>
        /// <param name="notebookCommentViewModel">The view model that will be used to create a comment for the notebook</param>
        /// <returns>An error or an ok response</returns>
        [HttpPost]
        public IActionResult Post([FromBody] NotebookCommentViewModel notebookCommentViewModel)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            if (!_notebookService.CanUserView(notebookCommentViewModel.NotebookId, currentUser))
            {
                return Forbid();
            }

            if (ModelState.IsValid)
            {
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
    }
}
