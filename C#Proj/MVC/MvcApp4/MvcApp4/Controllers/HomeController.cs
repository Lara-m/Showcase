using MvcApp4.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApp4.Controllers
{
    public class HomeController : Controller
    {
        private DB1Entities1 db = new DB1Entities1();
        static MYUSER myuser = new MYUSER();
        public ActionResult Index() { return View(); }       
        public ActionResult ChangePass_ID(MYUSER user)
        {
            myuser = new MYUSER();
            System.Diagnostics.Debug.WriteLine("ID: " + user.UserID);
            ViewBag.Message = "";
            if (user.UserID != null)
            {
                myuser = db.MYUSERs.Find(user.UserID);
                user.SecQn = myuser.SecQn;
                return RedirectToAction("ChangePass_Question","Home",user);
            }
            else
            {
                return View(user);
            }
        }

        public ActionResult ChangePass_Question(MYUSER user)
        {
            System.Diagnostics.Debug.WriteLine("MQS: " + myuser.SecQn);
            System.Diagnostics.Debug.WriteLine("MAN: " + myuser.SecAns);
            String message;
            if (myuser.SecAns == user.SecAns)
            {
                System.Diagnostics.Debug.WriteLine("UAN: " + user.SecAns);
                Service1 ser = new Service1();
                myuser.Password = ser.Generate_random_String(6);
                System.Diagnostics.Debug.WriteLine("GPA: " + myuser.Password);
                if (ModelState.IsValid)
                {
                    db.Entry(myuser).State = EntityState.Modified;
                    try
                    {
                        db.SaveChanges();
                        message = "Password Successfully updated. Current Password:" + myuser.Password;
                    }
                    catch (DbEntityValidationException e)
                    {
                        message = "Password update failed.";
                        foreach (var eve in e.EntityValidationErrors)
                        {
                            System.Diagnostics.Debug.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                                eve.Entry.Entity.GetType().Name, eve.Entry.State);
                            foreach (var ve in eve.ValidationErrors)
                            {
                                System.Diagnostics.Debug.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                                    ve.PropertyName, ve.ErrorMessage);
                            }
                        }
                        throw;
                    }
                }
                else
                {
                    message = "Password update failed.";
                }
                System.Diagnostics.Debug.Write(message);
                ViewBag.Message = message;
            }
                return View();
        }
    }
}
