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
    public class ReminderNoteController : ControllerBase
    {
        private SchoolNotebookContext _context;

        public ReminderNoteController(SchoolNotebookContext context)
        {
            _context = context;
        }

        // GET: api/ReminderNote
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.ReminderNote.ToList());
        }

        // GET: api/ReminderNote/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var reminderNote = _context.ReminderNote.SingleOrDefault(b => b.Id == id);

            if (reminderNote == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(reminderNote);
            }
        }

        // POST: api/ReminderNote
        [HttpPost]
        public IActionResult Post([FromBody] ReminderNoteViewModel reminderNoteViewModel)
        {
            if (ModelState.IsValid)
            {
                var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

                _context.ReminderNote.Add(new ReminderNote
                {
                    Notes = reminderNoteViewModel.Notes,
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

        // PUT: api/ReminderNote/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ReminderNoteViewModel reminderNoteViewModel)
        {
            var reminderNote = _context.ReminderNote.SingleOrDefault(b => b.Id == id);

            if (reminderNote == null)
            {
                return NotFound();
            }
            else
            {
                reminderNote.Notes = reminderNoteViewModel.Notes;

                _context.SaveChanges();

                return Ok();
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var reminderNote = _context.ReminderNote.SingleOrDefault(b => b.Id == id);

            if (reminderNote == null)
            {
                return NotFound();
            }
            else
            {
                _context.ReminderNote.Remove(reminderNote);
                _context.SaveChanges();
                return Ok();
            }
        }
    }
}
