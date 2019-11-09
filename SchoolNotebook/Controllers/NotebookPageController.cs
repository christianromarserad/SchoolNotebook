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
    /// This api controller is used to manage the pages of the notebook
    /// </summary>
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class NotebookPageController : ControllerBase
    {
        private SchoolNotebookContext _context;
        private NotebookService _notebookService;

        public NotebookPageController(SchoolNotebookContext context)
        {
            _context = context;
            _notebookService = new NotebookService(_context);
        }

        /// <summary>
        /// This method is used to get the pages of the notebook
        /// </summary>
        /// <param name="notebookId">The notebook id that will be used to get its pages</param>
        /// <returns>The pages of the notebook</returns>
        [HttpGet("{notebookId}")]
        public IActionResult Get(int notebookId)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            if (!_notebookService.CanUserView(notebookId, currentUser))
            {
                return Forbid();
            }

            return Ok(_context.NotebookPage.Where(np => np.NotebookId == notebookId).OrderBy(np => np.PageNumber).ToList());
        }

        /// <summary>
        /// This method is used to get a specific page from a notebook
        /// </summary>
        /// <param name="notebookId">The notebook id that will be used to get the page</param>
        /// <param name="pageNumber">The page number</param>
        /// <returns>A page from the notebook</returns>
        [HttpGet]
        public IActionResult Get(int notebookId, int pageNumber)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            if (!_notebookService.CanUserView(notebookId, currentUser))
            {
                return Forbid();
            }

            var notebookPage = _context.NotebookPage.SingleOrDefault(b => b.NotebookId == notebookId && b.PageNumber == pageNumber);

            if (notebookPage == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(notebookPage);
            }
        }

        /// <summary>
        /// This method is used to create a page for the notebook
        /// </summary>
        /// <param name="notebookPageViewModel">The view model that will be used to create a page</param>
        /// <returns>An error or an ok response</returns>
        [HttpPost]
        public IActionResult Post([FromBody] NotebookPageViewModel notebookPageViewModel)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            if (!_notebookService.CanUserEdit(notebookPageViewModel.NotebookId, currentUser))
            {
                return Forbid();
            }

            if (ModelState.IsValid)
            {
                int newPageNumber = 1;
                if (_context.NotebookPage.Any())
                {
                    newPageNumber = _context.NotebookPage.Max(np => np.PageNumber) + 1;
                }

                _context.NotebookPage.Add(new NotebookPage
                {
                    NotebookId = notebookPageViewModel.NotebookId,
                    PageNumber = newPageNumber,
                    Title = notebookPageViewModel.Title,
                    Content = notebookPageViewModel.Content
                });

                _context.SaveChanges();

                var notebookPage = _context.NotebookPage.Single(np => np.NotebookId == notebookPageViewModel.NotebookId && np.PageNumber == newPageNumber);

                return Ok(notebookPage);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        /// <summary>
        /// This method is used to update the page from the notebook
        /// </summary>
        /// <param name="notebookPageViewModel">The view model that will be used to update the value of the page</param>
        /// <returns>An error or an ok response</returns>
        [HttpPut]
        public IActionResult Put([FromBody] NotebookPageViewModel notebookPageViewModel)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            if (!_notebookService.CanUserEdit(notebookPageViewModel.NotebookId, currentUser))
            {
                return Forbid();
            }

            if (ModelState.IsValid)
            {
                var notebookPage = _context.NotebookPage.SingleOrDefault(np => np.NotebookId == notebookPageViewModel.NotebookId && np.PageNumber == notebookPageViewModel.PageNumber);

                if (notebookPage == null)
                {
                    return NotFound();
                }
                else
                {
                    notebookPage.Title = notebookPageViewModel.Title;
                    notebookPage.Content = notebookPageViewModel.Content;

                    _context.SaveChanges();

                    return Ok(notebookPage);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        /// <summary>
        /// This method is used to delete a page from the notebook
        /// </summary>
        /// <param name="notebookId">The notebook id of the page</param>
        /// <param name="pageNumber">The page number</param>
        /// <returns>An error or an ok response</returns>
        [HttpDelete]
        public IActionResult Delete(int notebookId, int pageNumber)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            if (!_notebookService.CanUserEdit(notebookId, currentUser))
            {
                return Forbid();
            }

            var notebookPage = _context.NotebookPage.SingleOrDefault(np => np.NotebookId == notebookId && np.PageNumber == pageNumber);

            if (notebookPage == null)
            {
                return NotFound();
            }
            else
            {
                _context.NotebookPage.Remove(notebookPage);
                _context.SaveChanges();
                return Ok();
            }
        }
    }
}
