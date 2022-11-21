using Newtonsoft.Json;
using System.Text;

namespace ff.Web.Helper
{
    public interface IHttpApiHelper
    {
        /// <summary>
        /// GET Http Api
        /// </summary>
        /// <typeparam name="T">api 回傳結果資料結構</typeparam>
        /// <param name="func">網址方法</param>
        /// <param name="data">參數</param>
        /// <returns>資料模型 AS T</returns>
        Task<T> Get<T>(string func, string data = "", Dictionary<string, string> headers = null) where T : class;
        /// <summary>
        /// POST Http Api
        /// </summary>
        /// <typeparam name="T">api 回傳結果資料結構</typeparam>
        /// <param name="func">網址方法</param>
        /// <param name="jsonData">參數</param>
        /// <returns>資料模型 AS T</returns>
        Task<T> Post<T>(string func, object jsonData, Dictionary<string, string> headers = null) where T : class;

        /// <summary>
        /// PUT Http Api
        /// </summary>
        /// <typeparam name="T">api 回傳結果資料結構</typeparam>
        /// <param name="func">網址方法</param>
        /// <param name="jsonData">參數</param>
        /// <returns>資料模型 AS T</returns>
        Task<T> Put<T>(string func, object jsonData, Dictionary<string, string> headers = null) where T : class;

        /// <summary>
        /// DELETE Http Api
        /// </summary>
        /// <typeparam name="T">api 回傳結果資料結構</typeparam>
        /// <param name="func">網址方法</param>
        /// <param name="jsonData">參數</param>
        /// <returns>資料模型 AS T</returns>
        Task<T> Delete<T>(string func, object jsonData, Dictionary<string, string> headers = null) where T : class;
    }
    public class HttpApiHelper : IHttpApiHelper
    {
        /// <summary>
        /// api路徑
        /// </summary>
        private string Path { get; }

        public HttpApiHelper(string path)
        {
            Path = path;
        }

        /// <summary>
        /// 設定header
        /// </summary>
        /// <param name="client"></param>
        /// <param name="headers"></param>
        private void SetHeader(HttpClient client, Dictionary<string, string> headers)
        {
            foreach (var head in headers)
            {
                client.DefaultRequestHeaders.Add(head.Key, head.Value);
            }
        }

        /// <summary>
        /// GET Http Api
        /// </summary>
        /// <typeparam name="T">api 回傳結果資料結構</typeparam>
        /// <param name="func">網址方法</param>
        /// <param name="data">參數</param>
        /// <returns>資料模型 AS T</returns>
        public async Task<T> Get<T>(string func, string data = "", Dictionary<string, string> headers = null) where T : class
        {
            T obj = null;
            using (HttpClient client = new())
            {
                if (headers != null)
                    SetHeader(client, headers);

                HttpResponseMessage rep = await client.GetAsync(Path + func + data);
                rep.EnsureSuccessStatusCode();
                string res = await rep.Content.ReadAsStringAsync();

                obj = JsonConvert.DeserializeObject<T>(res);
            }
            return obj;
        }
        /// <summary>
        /// POST Http Api
        /// </summary>
        /// <typeparam name="T">api 回傳結果資料結構</typeparam>
        /// <param name="func">網址方法</param>
        /// <param name="jsonData">參數</param>
        /// <returns>資料模型 AS T</returns>
        public async Task<T> Post<T>(string func, object jsonData, Dictionary<string, string> headers = null) where T : class
        {
            string data = JsonConvert.SerializeObject(jsonData);
            T obj = null;
            using (HttpClient client = new())
            {
                if (headers != null)
                    SetHeader(client, headers);

                var stringContent = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage rep = await client.PostAsync(Path + func, stringContent);
                rep.EnsureSuccessStatusCode();
                string res = await rep.Content.ReadAsStringAsync();

                obj = JsonConvert.DeserializeObject<T>(res);
            }
            return obj;
        }

        /// <summary>
        /// PUT Http Api
        /// </summary>
        /// <typeparam name="T">api 回傳結果資料結構</typeparam>
        /// <param name="func">網址方法</param>
        /// <param name="jsonData">參數</param>
        /// <returns>資料模型 AS T</returns>
        public async Task<T> Put<T>(string func, object jsonData, Dictionary<string, string> headers = null) where T : class
        {
            string data = JsonConvert.SerializeObject(jsonData);
            T obj = null;
            using (HttpClient client = new())
            {
                if (headers != null)
                    SetHeader(client, headers);

                var stringContent = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage rep = await client.PutAsync(Path + func, stringContent);
                rep.EnsureSuccessStatusCode();
                string res = await rep.Content.ReadAsStringAsync();

                obj = JsonConvert.DeserializeObject<T>(res);
            }
            return obj;
        }

        /// <summary>
        /// DELETE Http Api
        /// </summary>
        /// <typeparam name="T">api 回傳結果資料結構</typeparam>
        /// <param name="func">網址方法</param>
        /// <param name="jsonData">參數</param>
        /// <returns>資料模型 AS T</returns>
        public async Task<T> Delete<T>(string func, object jsonData, Dictionary<string, string> headers = null) where T : class
        {
            string data = JsonConvert.SerializeObject(jsonData);
            T obj = null;
            using (HttpClient client = new())
            {
                if (headers != null)
                    SetHeader(client, headers);

                var stringContent = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage rep = await client.DeleteAsync(Path + func + data);
                rep.EnsureSuccessStatusCode();
                string res = await rep.Content.ReadAsStringAsync();

                obj = JsonConvert.DeserializeObject<T>(res);
            }
            return obj;
        }
    }
}
