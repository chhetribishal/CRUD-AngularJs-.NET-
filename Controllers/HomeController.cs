using CRUDoperationAPP.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRUDoperationAPP.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Product()
        {
            return View();
        }

        //Insert 
        [HttpPost]
        public string InsertProductRecord(tbl_ProductMaster pd)
        {
            
            using (ProductDBEntities db = new ProductDBEntities())
            {
                db.tbl_ProductMaster.Add(pd);
                db.SaveChanges();
                return "Student Added Successfully!";
            }
        }


        //Retrieve
        public JsonResult GetAllProduct()
        {
            ProductDBEntities db = new ProductDBEntities();
            var AllRecord = db.sp_GetAllProducts();
            return Json(AllRecord, JsonRequestBehavior.AllowGet);
        }


        //Update
        [HttpPost]
        public string UpdateProductRecord(tbl_ProductMaster pd)
        {
            

            using (ProductDBEntities db = new ProductDBEntities())
            {
                var record = db.tbl_ProductMaster.Where(x => x.ProductID == pd.ProductID).FirstOrDefault();
                record.ProductName = pd.ProductName;
                record.Price = pd.Price;
                record.Qty = pd.Qty;
                record.Remarks = pd.Remarks;
                
                
                db.SaveChanges();
                return "Product Updated Successfully!";
            }
        }


        //Delete
        [HttpPost]
        public string DeleteProduct(tbl_ProductMaster pd)
        {
            using (ProductDBEntities db = new ProductDBEntities())
            {
                var data = db.tbl_ProductMaster.Where(x => x.ProductID == pd.ProductID).FirstOrDefault();
                 db.tbl_ProductMaster.Remove(data);
                db.SaveChanges();
                return "Record Deleted Successfully";
            }
        }
    }
}