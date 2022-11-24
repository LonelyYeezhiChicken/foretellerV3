using ff.Web.Helper;
using ff.Web.Models;
using ff.Web.Models.ApiModel;
using ff.Web.Models.Enum;
using Microsoft.AspNetCore.Mvc;

namespace ff.Web.Controllers.WebApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerApiController : ControllerBase
    {
        private const string itemMain = "Customer";
        private readonly IHttpApiHelper httpApiHelper;

        public CustomerApiController()
        {
            httpApiHelper = new HttpApiHelper(ApiConfig.Url);
        }

        /// <summary>
        /// 取得token
        /// </summary>
        /// <returns></returns>
        private Dictionary<string, string> GetHeader()
        {
            Request.Headers.TryGetValue("APP_TOKEN", out var token);
            return new Dictionary<string, string>()
            {
                {"Authorization",$"Bearer {token.First()}" }
            };
        }
        /// <summary>
        /// 檢查錯誤
        /// </summary>
        /// <param name="ex"></param>
        /// <returns></returns>
        private IActionResult GetException(Exception ex)
        {
            if (ex.Message.Contains("Unauthorized"))
                return Unauthorized();

            return BadRequest();
        }

        // 載入
        [HttpGet("Load")]
        public async Task<IActionResult> Load()
        {
            try
            {
                var header = GetHeader();

                var res = await httpApiHelper.Get<List<Customer>>(itemMain, "", header);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return GetException(ex);
            }
        }

        // 查詢
        [HttpGet("Find")]
        public async Task<IActionResult> Find(string kind)
        {
            try
            {
                var header = GetHeader();

                var res = await httpApiHelper.Get<Customer>(itemMain, kind, header);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return GetException(ex);
            }
        }

        // 新增
        [HttpPost("Create")]
        public async Task<IActionResult> Create(CustomerViewModel data)
        {
            try
            {
                var header = GetHeader();
                var res = await httpApiHelper.Post<string>(itemMain,
                    new Customer()
                    {
                        Id = data.Id,
                        Name = data.Name,
                        CarType = data.CarType,
                        Car = data.Car,
                        CarNo = data.CarNo,
                        Phone = data.Phone,
                        Memo = data.Memo,
                        LastLong = data.LastLong,
                        LastDate = data.LastDate
                    }, header);
                return Ok("OK");
            }
            catch (Exception ex)
            {
                return GetException(ex);
            }
        }

        // 修改
        [HttpPost("Edit")]
        public async Task<IActionResult> Edit(CustomerViewModel data)
        {
            try
            {
                var header = GetHeader();
                var res = await httpApiHelper.Put<string>(itemMain,
                    new Customer()
                    {
                        Id = data.Id,
                        Name = data.Name,
                        CarType = data.CarType,
                        Car = data.Car,
                        CarNo = data.CarNo,
                        Phone = data.Phone,
                        Memo = data.Memo,
                        LastLong = data.LastLong,
                        LastDate = data.LastDate
                    }, header);
                return Ok("OK");
            }
            catch (Exception ex)
            {
                return GetException(ex);
            }
        }

        // 刪除
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromQuery] string id)
        {
            try
            {
                var header = GetHeader();
                var res = await httpApiHelper.Delete<string>(itemMain, $"?id={id}", header);
                return Ok("OK");
            }
            catch (Exception ex)
            {
                return GetException(ex);
            }
        }

    }
}
