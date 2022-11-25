using Microsoft.AspNetCore.Mvc;

namespace ff.Web.Controllers
{
    public class ErrorController : Controller
    {
        private readonly ILogger<ErrorController> _logger;

        public ErrorController(ILogger<ErrorController> logger)
        {
            _logger = logger;
        }

        public IActionResult Build()
        {
            _logger.LogInformation("Go To Build ...");
            return View();
        }
    }
}
