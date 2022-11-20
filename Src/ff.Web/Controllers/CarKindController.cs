using Microsoft.AspNetCore.Mvc;

namespace ff.Web.Controllers
{
    public class CarKindController : Controller
    {
        private readonly ILogger<CarKindController> _logger;

        public CarKindController(ILogger<CarKindController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            _logger.LogInformation("Go To CarKind ...");
            return View();
        }
    }
}
