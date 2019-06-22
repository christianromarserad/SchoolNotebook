using System;
using System.Collections.Generic;
using System.Linq;
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
    public class NotebookPageController : ControllerBase
    {
        private SchoolNotebookContext _context;

        public NotebookPageController(SchoolNotebookContext context)
        {
            _context = context;
        }

        // GET: api/NotebookPage/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_context.NotebookPage.Where(np => np.NotebookId == id).OrderBy(np => np.PageNumber).ToList());
        }

        // GET: api/NotebookPage?notebookId=5&pageNumber=5
        [HttpGet]
        public IActionResult Get(int notebookId, int pageNumber)
        {
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

        // POST: api/NotebookPage
        [HttpPost]
        public IActionResult Post([FromBody] NotebookPageViewModel notebookPageViewModel)
        {
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
                    Notes = notebookPageViewModel.Notes
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

        // PUT: api/NotebookPage/5
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
