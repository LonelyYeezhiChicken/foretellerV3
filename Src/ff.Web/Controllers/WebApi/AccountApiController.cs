using ff.Web.Helper;
using ff.Web.Models;
using ff.Web.Models.ApiModel;
using ff.Web.Models.Enum;
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
            httpApiHelper = new HttpApiHelper(ApiConfig.Url);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            try
            {
                var res = await httpApiHelper.Post<JwtModel>("Account", model);
                return Ok(res.token.result);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
