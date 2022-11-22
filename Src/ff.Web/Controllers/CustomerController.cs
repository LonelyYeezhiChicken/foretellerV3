using Microsoft.AspNetCore.Mvc;

namespace ff.Web.Controllers
{
    public class CustomerController : Controller
    {
        private readonly ILogger<CustomerController> _logger;

        public CustomerController(ILogger<CustomerController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            _logger.LogInformation("Go To Customer ...");
            return View();
        }
    }
}
