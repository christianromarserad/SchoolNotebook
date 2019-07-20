using SchoolNotebook.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolNotebook.Services
{
    public class NotebookService
    {
        private SchoolNotebookContext _context;

        public NotebookService(SchoolNotebookContext context)
        {
            _context = context;
        }

        public bool IsUserOwner(int notebookId, string user)
        {
            return _context.Notebook.Any(n => n.Id == notebookId && n.User == user);
        }

        public bool CanUserView(int notebookId, string user)
        {
            if(IsUserOwner(notebookId, user))
            {
                return true;
            }
            else
            {
                if(_context.NotebookShare.Any(ns => ns.NotebookId == notebookId && ns.User == user))
                {
                    return true;
                }
                else
                {
                    return _context.Notebook.Single(n => n.Id == notebookId).Public;
                }
            }
        }

        public bool CanUserEdit(int notebookId, string user)
        {
            if (IsUserOwner(notebookId, user))
            {
                return true;
            }

            var notebookShare = _context.NotebookShare.SingleOrDefault(ns => ns.NotebookId == notebookId && ns.User == user);

            if(notebookShare == null)
            {
                return false;
            }
            else
            {
                return notebookShare.CanEdit;
            }
        }
    }
}
