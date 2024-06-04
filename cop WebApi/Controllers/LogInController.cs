using cop.Models;
using Microsoft.AspNetCore.Mvc;

namespace cop_WebApi.Controllers
{
    public class LogInController : Controller
    {
        CoPNewContext db = new CoPNewContext();

        [HttpGet]
        [Route("LogIn/{ID}/{password}")]
        public dynamic LogIn(string ID, string password)
        {
            List<User> users = db.Users.ToList();
            if (users == null)
            {
                return ("login faild");
            }
            for (int i = 0; i < users.Count(); i++)
            {
                if (users[i].UserId == ID && users[i].UserpPassword==password)
                {
                    return users[i].UserPrivetName;
                }
                
            }
            return BadRequest("login faild");
        }
    }
}
