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
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class NotebookController : ControllerBase
    {
        private SchoolNotebookContext _context;
        private NotebookService _notebookService;

        public NotebookController(SchoolNotebookContext context)
        {
            _context = context;
            _notebookService = new NotebookService(_context);
        }

        // GET: api/Notebook
        [HttpGet]
        public IActionResult Get()
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value; 

            return Ok(_context.Notebook.Where(n => n.User == currentUser).ToList());
        }

        // GET: api/Notebook/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            if(!_notebookService.CanUserView(id, currentUser))
            {
                return Forbid();
            }

            var notebook = _context.Notebook.SingleOrDefault(b => b.Id == id);

            if (notebook == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(notebook);
            }
        }

        // POST: api/Notebook
        [HttpPost]
        public IActionResult Post([FromBody] NotebookViewModel notebookViewModel)
        {
            if (ModelState.IsValid)
            {
                var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

                _context.Notebook.Add(new Notebook
                {
                    Name = notebookViewModel.Name,
                    Public = notebookViewModel.Public,
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

        // PUT: api/Notebook/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] NotebookViewModel notebookViewModel)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            if(!_notebookService.CanUserEdit(id, currentUser))
            {
                return Forbid();
            }

            var notebook = _context.Notebook.SingleOrDefault(b => b.Id == id);

            if (notebook == null)
            {
                return NotFound();
            }
            else
            {
                notebook.Name = notebookViewModel.Name;
                notebook.Public = notebookViewModel.Public;

                _context.SaveChanges();

                return Ok(notebook);
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            if (!_notebookService.CanUserEdit(id, currentUser))
            {
                return Forbid();
            }

            var notebook = _context.Notebook.SingleOrDefault(b => b.Id == id);

            if (notebook == null)
            {
                return NotFound();
            }
            else
            {
                _context.Notebook.Remove(notebook);
                _context.SaveChanges();
                return Ok();
            }
        }
    }
}
