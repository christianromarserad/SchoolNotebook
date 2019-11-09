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
    /// This api controller is used to manage the reminder notes
    /// </summary>
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

        /// <summary>
        /// This method is used to get reminder notes of the current user
        /// </summary>
        /// <returns>The reminder notes of the user</returns>
        [HttpGet]
        public IActionResult Get()
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            return Ok(_context.ReminderNote.Where(rm => rm.User == currentUser).ToList());
        }

        /// <summary>
        /// This method is used to get a specific reminder note
        /// </summary>
        /// <param name="id">The id associated to that reminder note</param>
        /// <returns>The reminder note</returns>
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

        /// <summary>
        /// This method is used to create a reminder note
        /// </summary>
        /// <param name="reminderNoteViewModel">The view model that is used to create the reminder note</param>
        /// <returns>An error or an ok response</returns>
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

        /// <summary>
        /// This method is used to update a reminder note
        /// </summary>
        /// <param name="id">The id that is associated to that reminder note</param>
        /// <param name="reminderNoteViewModel">The view model that is used to update the values of the reminder note</param>
        /// <returns>An error or an ok response</returns>
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ReminderNoteViewModel reminderNoteViewModel)
        {
            if (ModelState.IsValid)
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
            else
            {
                return BadRequest(ModelState);
            }
        }

        /// <summary>
        /// This method is used to delete a reminder note
        /// </summary>
        /// <param name="id">The id that is associated to that reminder note</param>
        /// <returns>An error or an ok response</returns>
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
