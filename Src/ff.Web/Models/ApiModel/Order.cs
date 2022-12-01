namespace ff.Web.Models.ApiModel
{
    public class Order
    {
        public Order()
        {
            Detail = new();
            Id = "";
            StoreId = "";
            DiscountType = "";
            DiscountName = "";
            Discount = 0;
            IsNowTime =false;
        }

        public string Id { get; set; }
        public string StoreId { get; set; }
        public string CustomerId { get; set; }
        public int Long { get; set; }
        public DateTime OrderDate { get; set; }
        public int Amount { get; set; }
        public string DiscountType { get; set; }
        public string DiscountName { get; set; }
        public int Discount { get; set; }
        public int TotalAmount { get; set; }
        public bool IsNowTime { get; set; }
        public List<OrderDetail> Detail { get; set; }
    }


    public class OrderDetail
    {
        public string Id { get; set; }
        public string ItemCode { get; set; }
        public string ItemName { get; set; }
        public int Amount { get; set; }
        public int Count { get; set; }
        public string DiscountType { get; set; }
        public string DiscountName { get; set; }
        public int Discount { get; set; }
        public int TotalAmount { get; set; }
    }
}
