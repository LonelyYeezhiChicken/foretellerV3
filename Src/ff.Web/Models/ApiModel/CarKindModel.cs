namespace ff.Web.Models.ApiModel
{
    public class CarKindModel
    {
        public CarKindModel()
        {
            UpdateTime = DateTime.Now;
            StoreId = "";
            UpdateUserId = "";
        }
        public string Id { get; set; }
        public string StoreId { get; set; }
        public string Name { get; set; }
        public int Year { get; set; }
        public DateTime UpdateTime { get; set; }
        public string UpdateUserId { get; set; }
    }
}
