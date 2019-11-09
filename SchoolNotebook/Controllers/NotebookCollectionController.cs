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
    /// This api controller is used to manage the user notebook collection from the database
    /// </summary>
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class NotebookCollectionController : ControllerBase
    {
        private SchoolNotebookContext _context;
        private NotebookService _notebookService;

        public NotebookCollectionController(SchoolNotebookContext context)
        {
            _context = context;
            _notebookService = new NotebookService(_context);
        }

        /// <summary>
        /// This method will get a list of notebook collection from the current user
        /// </summary>
        /// <returns>The list notebook collection of the current user</returns>
        [HttpGet]
        public IActionResult Get()
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            return Ok(_context.NotebookCollection.Where(nc => nc.User == currentUser));
        }

        /// <summary>
        /// This method is used to create a notebook collection for the current user
        /// </summary>
        /// <param name="notebookCollectionViewModel">The view model that will be used to create a notebook collection</param>
        /// <returns>An error or an ok response</returns>
        [HttpPost]
        public IActionResult Post(NotebookCollectionViewModel notebookCollectionViewModel)
        {
            var notebook = _context.Notebook.SingleOrDefault(n => n.Id == notebookCollectionViewModel.NotebookId);
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            if (notebook == null)
            {
                return NotFound(new { message = "Notebook not found" });
            }

            if (!_notebookService.CanUserView(notebookCollectionViewModel.NotebookId, currentUser))
            {
                return Forbid();
            }

            _context.NotebookCollection.Add(new NotebookCollection
            {
                NotebookId = notebookCollectionViewModel.NotebookId,
                User = currentUser
            });

            _context.SaveChanges();

            var notebookCollection = _context.NotebookCollection.Single(ns => ns.NotebookId == notebookCollectionViewModel.NotebookId && ns.User == currentUser);

            return Ok(notebookCollection);
        }

        /// <summary>
        /// This method is used to delete a notebook collection from the database
        /// </summary>
        /// <param name="notebookId">The notebook id that will be deleted from the user's notebook collection</param>
        /// <returns>An error or an ok response</returns>
        [HttpDelete("{notebookId}")]
        public IActionResult Delete(int notebookId)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            var notebookCollection = _context.NotebookCollection.SingleOrDefault(nc => nc.NotebookId == notebookId && nc.User == currentUser);

            if(notebookCollection == null)
            {
                return NotFound();
            }
            else
            {
                _context.NotebookCollection.Remove(notebookCollection);
                _context.SaveChanges();
                return Ok();
            }
        }
    }
}
