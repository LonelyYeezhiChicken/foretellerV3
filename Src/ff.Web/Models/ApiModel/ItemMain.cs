namespace ff.Web.Models.ApiModel
{
    public class ItemMain
    {
        public ItemMain()
        {
            StoreId = "";
            UpdateTime = DateTime.Now;
            UpdateUserId = "";
        }

        public string Id { get; set; }
        public string StoreId { get; set; }
        public string Name { get; set; }
        public int CostAmount { get; set; }
        public int SaleAmount { get; set; }
        public int Count { get; set; }
        public int LowItem { get; set; }
        public string CarType { get; set; }
        public string Car { get; set; }
        public int ComBackLong { get; set; }
        public int ComBackTime { get; set; }
        public DateTime UpdateTime { get; set; }
        public string UpdateUserId { get; set; }
        public string Memo { get; set; }
    }
}
