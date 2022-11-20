using ff.Web.Helper;
using ff.Web.Models;
using ff.Web.Models.ApiModel;
using Microsoft.AspNetCore.Mvc;

namespace ff.Web.Controllers.WebApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountApiController : ControllerBase
    {
        private readonly IHttpApiHelper httpApiHelper;

        public AccountApiController()
        {
            httpApiHelper = new HttpApiHelper(@"https://localhost:7090/Account");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            try
            {
                var res = await httpApiHelper.Post<JwtModel>("", model);
                return Ok(res.token.result);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
