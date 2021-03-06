﻿using System;
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
    /// <summary>
    /// This api controller is used to manage the share feature of the notebook
    /// </summary>
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

        /// <summary>
        /// This method is used to get the shared users that has access to the notebook
        /// </summary>
        /// <param name="notebookId">The notebook id that will be used to get the shared users which has access to it</param>
        /// <returns>The shared users</returns>
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

        /// <summary>
        /// This method is used to get the user permission information for the notebook
        /// </summary>
        /// <param name="notebookId">The notebook id that will used to get the user's permission information for the notebook</param>
        /// <returns>The permission information of the user</returns>
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

        /// <summary>
        /// This method is used to create a notebook share information for the user
        /// </summary>
        /// <param name="notebookShareViewModel">The view model that is used to create a notebook share for the user</param>
        /// <returns>An error or an ok response</returns>
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

            if(!_context.User.Any(u => u.Email == notebookShareViewModel.User))
            {
                return NotFound(new { message = "User does not exist" });
            }

            if (notebook.User == notebookShareViewModel.User)
            {
                return BadRequest(new { message = "You can't add the owner in the share list" });
            }

            if(_context.NotebookShare.Any(ns => ns.User == notebookShareViewModel.User && ns.NotebookId == notebookShareViewModel.NotebookId))
            {
                return BadRequest(new { message = "The user is already in the share list" });
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

        /// <summary>
        /// This method is used to update the notebook share of the user
        /// </summary>
        /// <param name="notebookShareViewModel">The view model that is used to update the value of the notebook share</param>
        /// <returns>An error or an ok response</returns>
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

        /// <summary>
        /// This is method is used to delete a notebook share for the user from the notebook
        /// </summary>
        /// <param name="notebookId">The notebook id that is associated to that notebook share</param>
        /// <param name="user">The user that is associated to that notebook share</param>
        /// <returns>An error or an ok response</returns>
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

                var notebookCollection = _context.NotebookCollection.SingleOrDefault(nc => nc.NotebookId == notebookId && nc.User == user);

                if(notebookCollection != null)
                {
                    _context.NotebookCollection.Remove(notebookCollection);
                }

                _context.SaveChanges();

                return Ok();
            }
        }
    }
}
