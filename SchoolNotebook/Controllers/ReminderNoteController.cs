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
        public string Get(int id)
        {
            return "value";
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
