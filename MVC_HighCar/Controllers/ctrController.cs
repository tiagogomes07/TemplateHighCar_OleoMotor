using SiteMVC.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace MVC_HighCar.Controllers
{
    public class ctrController : Controller
    {
        public ActionResult index()
        {

            MeuContexto db = Singleton.GetContext();
            var listaProdutos = db.Produto.Include("Imagem").ToList();

            return View(listaProdutos);
        }

    }





}
