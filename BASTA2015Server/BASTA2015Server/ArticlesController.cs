using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BASTA2015Server
{
    public class ArticlesController : ApiController
    {
        private static ConcurrentDictionary<int, Article> database;

        static ArticlesController()
        {
            database = new ConcurrentDictionary<int, Article>();
            database.TryAdd(1, new Article { Id = 1, Name = "Super lecker Pudding", Description = "Blaaa blaaa blubbb"});
            database.TryAdd(2, new Article { Id = 2, Name = "Mjamm-mjamm Gurken", Description = "Yadda yadda yad"});
            database.TryAdd(3, new Article { Id = 3, Name = "Mhhhh Salzstangen", Description = "Momm momm mom" });
        }

        [ActionName("ping")]
        [HttpGet]
        public string GetPing()
        {
            return "OK";
        }


        [ActionName("list")]
        [HttpGet]
        public IEnumerable<Article> ListArticles()
        {
            // TODO: Call to BL, DAL...

            return database.Values.Select(p => new Article { Id = p.Id, Name = p.Name });
        }

        [HttpGet]
        [ActionName("item")]
        public Article GetArticle(int id)
        {
            // TODO: Call to BL, DAL...

            Article a;
            database.TryGetValue(id, out a);

            return a;
        }
    }
}
