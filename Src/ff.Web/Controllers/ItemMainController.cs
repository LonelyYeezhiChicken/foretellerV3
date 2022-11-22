using Microsoft.AspNetCore.Mvc;

namespace ff.Web.Controllers
{
    public class ItemMainController : Controller
    {
        private readonly ILogger<ItemMainController> _logger;

        public ItemMainController(ILogger<ItemMainController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            _logger.LogInformation("Go To ItemMain ...");
            return View();
        }
    }
}
