using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
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
        private readonly IHostingEnvironment _hostingEnvironment;

        public NotebookController(SchoolNotebookContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _notebookService = new NotebookService(_context);
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: api/Notebook
        [HttpGet]
        public IActionResult Get()
        {
            string webRootPath = _hostingEnvironment.WebRootPath;
            string contentRootPath = _hostingEnvironment.ContentRootPath;

            var currentUser = User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;
            var notebooks = new List<Notebook>();

            var ownedNotebooks = _context.Notebook.Where(n => n.User == currentUser).ToList();
            var notebookCollectionIds = _context.NotebookCollection.Where(nc => nc.User == currentUser).Select(nc => nc.NotebookId);
            var notebookCollection = _context.Notebook.Where(n => notebookCollectionIds.Contains(n.Id)).ToList();

            notebooks.AddRange(ownedNotebooks);
            notebooks.AddRange(notebookCollection);

            return Ok(notebooks.Distinct());
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

        // GET: api/Notebook?searchKey=notebooktitle
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

        // POST: api/Notebook
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

        // PUT: api/Notebook/5
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
                if (notebook.Image != null)
                {
                    // Delete the image file
                    var oldFilePath = _hostingEnvironment.WebRootPath + notebook.Image;
                    System.IO.File.Delete(oldFilePath);
                }

                _context.Notebook.Remove(notebook);
                _context.SaveChanges();
                return Ok();
            }
        }
    }
}
