namespace ff.Web.Models.ApiModel
{
    public class JwtModel
    {
        public Token? token { get; set; }
    }

    public class Token
    {
        public string? result { get; set; }
    }
}
