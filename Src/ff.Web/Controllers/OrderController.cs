using Microsoft.AspNetCore.Mvc;

namespace ff.Web.Controllers
{
    public class OrderController : Controller
    {
        private readonly ILogger<OrderController> _logger;

        public OrderController(ILogger<OrderController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            _logger.LogInformation("Go To Order ...");
            return View();
        }

        public IActionResult Create()
        {
            _logger.LogInformation("Go To Order Create ...");
            return View();
        }
    }
}
