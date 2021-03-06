﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolNotebook.Models;
using SchoolNotebook.Services;
using SchoolNotebook.ViewModels;

namespace SchoolNotebook.Controllers
{
    /// <summary>
    /// This api controller is used to manage the notebook from the database
    /// </summary>
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class NotebookController : ControllerBase
    {
        private SchoolNotebookContext _context;
        private NotebookService _notebookService;
        private readonly IHostingEnvironment _hostingEnvironment;

        public NotebookController(SchoolNotebookContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _notebookService = new NotebookService(_context);
            _hostingEnvironment = hostingEnvironment;
        }

        /// <summary>
        /// This method is used to get a notebook associated to the current user, which includes owned and shared notebooks
        /// </summary>
        /// <returns>The list of notebooks that is associated to the user</returns>
        [HttpGet]
        public IActionResult Get()
        {
            string webRootPath = _hostingEnvironment.WebRootPath;
            string contentRootPath = _hostingEnvironment.ContentRootPath;

            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;
            var notebooks = new List<Notebook>();

            var ownedNotebooks = _context.Notebook.Where(n => n.User == currentUser);
            var notebookCollectionIds = _context.NotebookCollection.Where(nc => nc.User == currentUser).Select(nc => nc.NotebookId);
            var notebookCollection = _context.Notebook.Where(n => notebookCollectionIds.Contains(n.Id));

            notebooks.AddRange(ownedNotebooks);
            notebooks.AddRange(notebookCollection);



            return Ok(notebooks.Distinct());
        }

        /// <summary>
        /// This method is used to get a specific notebook
        /// </summary>
        /// <param name="id">The id of the notebook that will returned</param>
        /// <returns>The notebook associated with the id parameter</returns>
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

        /// <summary>
        /// This method will search notebooks that they can access, which includes owned, shared, and public notebooks
        /// </summary>
        /// <param name="searchKey">The search key that is used to match the notebook</param>
        /// <returns>The accessible notebooks that matches the search key</returns>
        [HttpGet("Search/{searchKey}")]
        public IActionResult Get(string searchKey)
        {
            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

            var sharedNotebookIds = _context.NotebookShare.Where(ns => ns.User == currentUser).Select(ns => ns.NotebookId);

            var searchNotebookResults = _context.Notebook.Where(n => n.Name.Contains(searchKey) &&
                (n.User == currentUser ||
                n.Public ||
                sharedNotebookIds.Contains(n.Id))
            ).ToList();

            return Ok(searchNotebookResults.Distinct());
        }

        /// <summary>
        /// This method id used to create a notebook
        /// </summary>
        /// <param name="notebookViewModel">The view model that will be used to create a notebook</param>
        /// <returns>An error or an ok response</returns>
        [HttpPost]
        public IActionResult Post([FromForm] NotebookViewModel notebookViewModel)
        {
            if (ModelState.IsValid)
            {    
                var notebook = new Notebook();
                if(notebookViewModel.ImageFile != null)
                {
                    var fileName =  Guid.NewGuid() + notebookViewModel.ImageFile.FileName;
                    var imageFilesFolderPath = Path.Combine(_hostingEnvironment.WebRootPath, "Images");
                    var filePath = Path.Combine(imageFilesFolderPath, fileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        notebookViewModel.ImageFile.CopyTo(fileStream);
                    }

                    notebook.Image = Path.Combine("/Images/", fileName);
                    notebook.ImageName = notebookViewModel.ImageFile.FileName;
                }


                var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;
                notebook.Name = notebookViewModel.Name;
                notebook.Public = notebookViewModel.Public;
                notebook.User = currentUser;

                _context.Notebook.Add(notebook);

                _context.SaveChanges();

                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        /// <summary>
        /// This method is used to update a notebook
        /// </summary>
        /// <param name="id">The id of the notebook that will be updated</param>
        /// <param name="notebookViewModel">The view model that is used to update the value of the notebook</param>
        /// <returns>An error or an ok response</returns>
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromForm] NotebookViewModel notebookViewModel)
        {
            if (ModelState.IsValid)
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
                    if (notebookViewModel.ImageFile != null)
                    {
                        if(notebook.Image != null)
                        {
                            // Delete the old image file
                            var oldFilePath = _hostingEnvironment.WebRootPath + notebook.Image;
                            System.IO.File.Delete(oldFilePath);
                        }

                        var fileName = Guid.NewGuid() + notebookViewModel.ImageFile.FileName;
                        var imageFilesFolderPath = Path.Combine(_hostingEnvironment.WebRootPath, "Images");
                        var filePath = Path.Combine(imageFilesFolderPath, fileName);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            notebookViewModel.ImageFile.CopyTo(fileStream);
                        }

                        notebook.Image = Path.Combine("/Images/", fileName);
                        notebook.ImageName = notebookViewModel.ImageFile.FileName;
                    }

                    notebook.Name = notebookViewModel.Name;
                    notebook.Public = notebookViewModel.Public;

                    _context.SaveChanges();

                    return Ok(notebook);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        /// <summary>
        /// This method is used to delete a notebook
        /// </summary>
        /// <param name="id">The id of the notebook that will be deleted</param>
        /// <returns>An error or an ok response</returns>
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
                if (notebook.Image != null)
                {
                    // Delete the image file
                    var oldFilePath = _hostingEnvironment.WebRootPath + notebook.Image;
                    System.IO.File.Delete(oldFilePath);
                }

                // Remove the notebook pages associated to this notebook
                _context.NotebookPage.RemoveRange(_context.NotebookPage.Where(np => np.NotebookId == id));

                // Remove the rates associated to this notebook
                _context.NotebookRate.RemoveRange(_context.NotebookRate.Where(nr => nr.NotebookId == id));

                // Remove the notebook comments associated to this notebook
                _context.NotebookComment.RemoveRange(_context.NotebookComment.Where(nc => nc.NotebookId == id));

                // Remove the notebook shares associated to this notebook
                _context.NotebookShare.RemoveRange(_context.NotebookShare.Where(ns => ns.NotebookId == id));

                // Remove the notebook collections associated to this notebook
                _context.NotebookCollection.RemoveRange(_context.NotebookCollection.Where(nc => nc.NotebookId == id));

                _context.Notebook.Remove(notebook);
                _context.SaveChanges();
                return Ok();
            }
        }
    }
}
