using ff.Web.Helper;
using ff.Web.Models.ApiModel;
using ff.Web.Models.Enum;
using Microsoft.AspNetCore.Mvc;

namespace ff.Web.Controllers.WebApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarKindApiController : ControllerBase
    {

        private readonly IHttpApiHelper httpApiHelper;

        public CarKindApiController()
        {
            httpApiHelper = new HttpApiHelper(ApiConfig.Url);
        }

        [HttpGet("Load")]
        public async Task<IActionResult> Load()
        {
            try
            {
                Request.Headers.TryGetValue("APP_TOKEN", out var token);
                Dictionary<string, string> header = new()
                {
                    {"Authorization",$"Bearer {token.First()}" } 
                };

                var res = await httpApiHelper.Get<List<CarKindModel>>("CarKind", "", header);
                return Ok(res);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Unauthorized"))
                    return Unauthorized();

                return BadRequest();
            }
        }
    }
}
