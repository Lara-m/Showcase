using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WebApp5_2
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class Service1 : IService1, IDisposable
    {
        private DB1Entities db = new DB1Entities();

        public bool addToShoppingCard(PRODUCT product) {
            if (db.PRODUCTs.Any(p => p.ProductID == product.ProductID)) return false;
            db.PRODUCTs.Add(product);
            db.SaveChanges();
            return true;
        }

        public void modifyQuantity(String pid, int quantity) {
            if(db.PRODUCTs.Any(p => p.ProductID == pid)){
                PRODUCT p = db.PRODUCTs.Find(pid);
                p.Quantity = quantity;
                db.Entry(p).State = EntityState.Modified;
                db.SaveChanges();
            }
            else
                return;
        }

        public void removeItem(String pid) {
            PRODUCT p = db.PRODUCTs.Find(pid);
            if (p != null && p.ProductID == pid) {
                db.PRODUCTs.Remove(p);
                db.SaveChanges();
            }
        }

        public List<PRODUCT> displayAll() {
            return db.PRODUCTs.ToList();
        }

        public decimal totalAmount() {
            decimal total = 0;
            List<PRODUCT> list = db.PRODUCTs.ToList();
            for (int i = 0; i < list.Count; i++) {
                PRODUCT p = list.ElementAt(i);
                total += ((decimal) p.Quantity) 
                    * ((decimal) p.SellingPrice);
            }
            return total;
        }
        public void Dispose() { 
        }
    }
}
