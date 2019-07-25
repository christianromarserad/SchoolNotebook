using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolNotebook.Models;
using SchoolNotebook.Services;
using SchoolNotebook.ViewModels;

namespace SchoolNotebook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotebookShareController : ControllerBase
    {
        private SchoolNotebookContext _context;
        private NotebookService _notebookService;

        public NotebookShareController(SchoolNotebookContext context)
        {
            _context = context;
            _notebookService = new NotebookService(_context);
        }

        // GET: api/NotebookShare
        [HttpGet("{notebookId}")]
        public IActionResult Get(int notebookId)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            if (!_notebookService.IsUserOwner(notebookId, currentUser))
            {
                return Forbid();
            }
            else
            {
                return Ok(_context.NotebookShare.Where(ns => ns.NotebookId == notebookId));
            }
        }

        // GET: api/NotebookShare/GetCurrentUserPermission/5
        [HttpGet("[action]/{notebookId}")]
        public IActionResult GetCurrentUserPermission(int notebookId)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            if (!_notebookService.CanUserView(notebookId, currentUser))
            {
                return Forbid();
            }
            else
            {
                var notebookShare = _context.NotebookShare.SingleOrDefault(ns => ns.NotebookId == notebookId && ns.User == currentUser);

                if(notebookShare == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(notebookShare);
                }
            }
        }

        // POST: api/NotebookShare
        [HttpPost]
        public IActionResult Post([FromBody] NotebookShareViewModel notebookShareViewModel)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            var notebook = _context.Notebook.SingleOrDefault(n => n.Id == notebookShareViewModel.NotebookId);

            if(notebook == null)
            {
                return NotFound(new { message = "Notebook not found" });
            }
            
            if (!_notebookService.IsUserOwner(notebookShareViewModel.NotebookId, currentUser))
            {
                return Forbid();
            }

            if (ModelState.IsValid)
            {
                _context.NotebookShare.Add(new NotebookShare
                {
                    NotebookId = notebookShareViewModel.NotebookId,
                    User = notebookShareViewModel.User,
                    CanEdit = notebookShareViewModel.CanEdit,
                    DateShared = DateTime.Now
                });

                _context.NotebookCollection.Add(new NotebookCollection
                {
                    NotebookId = notebookShareViewModel.NotebookId,
                    User = notebookShareViewModel.User
                });

                _context.SaveChanges();

                var notebookShare = _context.NotebookShare.Single(ns => ns.NotebookId == notebookShareViewModel.NotebookId && ns.User == notebookShareViewModel.User);

                return Ok(notebookShare);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // PUT: api/NotebookShare
        [HttpPut]
        public IActionResult Put([FromBody] NotebookShareViewModel notebookShareViewModel)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            if (!_notebookService.IsUserOwner(notebookShareViewModel.NotebookId, currentUser))
            {
                return Forbid();
            }

            if (ModelState.IsValid)
            {
                var notebookShare = _context.NotebookShare.Single(ns => ns.NotebookId == notebookShareViewModel.NotebookId && ns.User == notebookShareViewModel.User);

                notebookShare.CanEdit = notebookShareViewModel.CanEdit;

                _context.SaveChanges();

                return Ok(notebookShare);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // DELETE: api/ApiWithActions?notebookId=5&user=user
        [HttpDelete]
        public IActionResult Delete(int notebookId, string user)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            if (!_notebookService.IsUserOwner(notebookId, currentUser))
            {
                return Forbid();
            }

            var notebookShare = _context.NotebookShare.SingleOrDefault(ns => ns.User == user && ns.NotebookId == notebookId);

            if(notebookShare == null)
            {
                return NotFound();
            }
            else
            {
                _context.NotebookShare.Remove(notebookShare);
                _context.SaveChanges();

                return Ok();
            }
        }
    }
}
