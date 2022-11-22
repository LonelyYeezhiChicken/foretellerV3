namespace ff.Web.Models.ApiModel
{
    public class Customer
    {
        public string Id { get; set; }
        public string StoreId { get; set; }
        public string Name { get; set; }
        public string CarType { get; set; }
        public string Car { get; set; }
        public string CarNo { get; set; }
        public int Phone { get; set; }
        public string Memo { get; set; }
        public int LastLong { get; set; }
        public DateTime LastDate { get; set; }
        public DateTime UpdateTime { get; set; }
        public string UpdateUserId { get; set; }
    }
}
