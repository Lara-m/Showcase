using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcApp4.Models;

namespace MvcApp4.Controllers
{
    public class UserController : Controller
    {
        private DB1Entities1 db = new DB1Entities1();

        //
        // GET: /User/

        public ActionResult Index()
        {
            return View(db.MYUSERs.ToList());
        }

        //
        // GET: /User/Details/5

        public ActionResult Details(string id = null)
        {
            MYUSER myuser = db.MYUSERs.Find(id);
            if (myuser == null)
            {
                return HttpNotFound();
            }
            return View(myuser);
        }

        //
        // GET: /User/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /User/Create

        [HttpPost]
        public ActionResult Create(MYUSER myuser)
        {
            if (ModelState.IsValid)
            {
                db.MYUSERs.Add(myuser);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(myuser);
        }

        //
        // GET: /User/Edit/5

        public ActionResult Edit(string id = null)
        {
            MYUSER myuser = db.MYUSERs.Find(id);
            if (myuser == null)
            {
                return HttpNotFound();
            }
            return View(myuser);
        }

        //
        // POST: /User/Edit/5

        [HttpPost]
        public ActionResult Edit(MYUSER myuser)
        {
            if (ModelState.IsValid)
            {
                db.Entry(myuser).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(myuser);
        }

        //
        // GET: /User/Delete/5

        public ActionResult Delete(string id = null)
        {
            MYUSER myuser = db.MYUSERs.Find(id);
            if (myuser == null)
            {
                return HttpNotFound();
            }
            return View(myuser);
        }

        //
        // POST: /User/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(string id)
        {
            MYUSER myuser = db.MYUSERs.Find(id);
            db.MYUSERs.Remove(myuser);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}