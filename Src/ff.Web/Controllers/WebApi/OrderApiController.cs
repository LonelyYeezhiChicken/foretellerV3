using ff.Web.Helper;
using ff.Web.Models;
using ff.Web.Models.ApiModel;
using ff.Web.Models.Enum;
using Microsoft.AspNetCore.Mvc;

namespace ff.Web.Controllers.WebApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderApiController : ControllerBase
    {
        private const string carKind = "Order";
        private readonly IHttpApiHelper httpApiHelper;

        public OrderApiController()
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


        // 新增
        [HttpPost("Create")]
        public async Task<IActionResult> Create(OrderViewModel orderData)
        {
            try
            {
                var header = GetHeader();

                List<OrderDetail> detail = new();
                orderData.Detail.ForEach(data =>
                {
                    detail.Add(new OrderDetail()
                    {
                        Id = data.Id,
                        ItemCode = data.ItemCode,
                        ItemName = data.ItemName,
                        Amount = data.Amount,
                        Count = data.Count,
                        DiscountType = data.DiscountType,
                        DiscountName = data.DiscountName,
                        Discount = data.Discount,
                        TotalAmount = data.TotalAmount
                    });
                });

                var res = await httpApiHelper.Post<string>(carKind,
                    new Order()
                    {
                        CustomerId = orderData.CustomerId,
                        Long = orderData.Long,
                        OrderDate = orderData.OrderDate,
                        Amount = orderData.Detail.Sum(x => x.TotalAmount),
                        Detail = detail
                    }, header);
                return Ok("OK");
            }
            catch (Exception ex)
            {
                return GetException(ex);
            }
        }

        // 查詢
        [HttpGet("Load")]
        public async Task<IActionResult> Load([FromQuery] string customerId)
        {
            try
            {
                var header = GetHeader();
                var res = await httpApiHelper.Get<List<Order>>(carKind, $"?customerId={customerId}", header);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return GetException(ex);
            }
        }
    }
}
