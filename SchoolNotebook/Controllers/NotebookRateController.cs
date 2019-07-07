using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolNotebook.Models;
using SchoolNotebook.ViewModels;

namespace SchoolNotebook.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class NotebookRateController : ControllerBase
    {
        private readonly SchoolNotebookContext _context;

        public NotebookRateController(SchoolNotebookContext context)
        {
            _context = context;
        }

        // GET: api/NotebookRate/5
        [HttpGet("{notebookId}")]
        public IActionResult Get(int notebookId)
        {
            return Ok(_context.NotebookRate.Where(nr => nr.NotebookId == notebookId));
        }

        // GET: api/NotebookRate/GetYourRate/5
        [HttpGet("[action]/{notebookId}")]
        public IActionResult GetCurrentUserRate(int notebookId)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            return Ok(_context.NotebookRate.SingleOrDefault(nr => nr.NotebookId == notebookId && nr.User == currentUser));
        }

        // PUT: api/NotebookRate
        [HttpPut]
        public IActionResult Put([FromBody] NotebookRateViewModel notebookRateViewModel)
        {
            if (ModelState.IsValid)
            {
                var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

                var notebookRate = _context.NotebookRate.SingleOrDefault(nr => nr.NotebookId == notebookRateViewModel.NotebookId && nr.User == currentUser);

                if (notebookRate == null)
                {
                    return NotFound();
                }
                else
                {
                    notebookRate.Rate = notebookRateViewModel.Rate;

                    _context.SaveChanges();

                    return Ok(notebookRate);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // POST: api/NotebookRate
        [HttpPost]
        public IActionResult Post(NotebookRateViewModel notebookRateViewModel)
        {
            if (ModelState.IsValid)
            {
                var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

                _context.NotebookRate.Add(new NotebookRate
                {
                    NotebookId = notebookRateViewModel.NotebookId,
                    User = currentUser,
                    Rate = notebookRateViewModel.Rate
                });

                _context.SaveChanges();

                var notebookRate = _context.NotebookRate.Single(nr => nr.NotebookId == notebookRateViewModel.NotebookId && nr.User == currentUser);

                return Ok(notebookRate);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
