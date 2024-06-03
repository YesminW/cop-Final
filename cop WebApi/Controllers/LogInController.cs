using cop.Models;
using Microsoft.AspNetCore.Mvc;

namespace cop_WebApi.Controllers
{
    public class LogInController : Controller
    {
        CoPNewContext db = new CoPNewContext();

        [HttpGet]
        [Route("LogIn")]
        public dynamic LogIn(string ID)
        {
            List<User> users = db.Users.ToList();
            if (users == null)
            {
                return ("login faild");
            }
            for (int i = 0; i < users.Count(); i++)
            {
                if (users[i].UserId ==  ID)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            return ("login faild");
        }
    }
}
