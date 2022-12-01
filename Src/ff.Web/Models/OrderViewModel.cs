namespace ff.Web.Models
{
    public class OrderViewModel
    {
        public OrderViewModel()
        {
            Detail = new();
        }
        public string CustomerId { get; set; }
        public int Long { get; set; }
        public DateTime OrderDate { get; set; }
        public List<OrderDetailViewModel> Detail { get; set; }
    }

    public class OrderDetailViewModel
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
