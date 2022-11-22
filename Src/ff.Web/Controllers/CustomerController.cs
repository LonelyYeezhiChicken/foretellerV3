using Microsoft.AspNetCore.Mvc;

namespace ff.Web.Controllers
{
    public class CustomerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
