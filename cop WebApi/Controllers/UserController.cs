using cop.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata;

namespace Co_p_new__WebApi.Controllers
{
    [EnableCors]

    public class UserController : Controller
    {
        CoPNewContext db = new CoPNewContext();


        [HttpGet]
        [Route("getAll")]
        public dynamic GetAllUsers()
        {
            var users = db.Users;
            return users;
        }


        [HttpPost]
        [Route("AddUser")]
        public dynamic AddUser(string ID, string privetName, string surName, DateTime Bdate, string phoneNumber, string password, int code)
        {
            User u = new User();
            u.UserId = ID;
            u.UserPrivetName = privetName;
            u.UserSurname = surName;
            u.UserBirthDate = Bdate;
            u.UserPhoneNumber = phoneNumber;
            u.UserpPassword = password;
            u.UserCode = code;

            db.Users.Add(u);
            db.SaveChanges();

            if (code == 222)
            {
                // Check if the user is already a parent
                if (!db.Parents.Any(p => p.UserId == ID))
                {
                    Parent p = new Parent();
                    p.UserId = ID;
                    db.Parents.Add(p);
                    db.SaveChanges();
                    return Ok(p);
                }
            }
            else if (code == 111 || code == 333)
            {
                // Check if the user is already a staff member
                if (!db.StaffMembers.Any(s => s.UserId == ID))
                {
                    StaffMember s = new StaffMember();
                    s.UserId = ID;
                    db.StaffMembers.Add(s);
                    db.SaveChanges();
                    return Ok(s);
                }
            }
            return Ok(u);
        }


        [HttpPut]
        [Route("updateUser")]
        public dynamic updateUser(string ID, string Email, string address, string password, string phonenum, string gender)
        {
            User? u = db.Users.Where(x => x.UserId == ID).FirstOrDefault();
            if (u != null)
            {
                if (Email != null)
                {
                    u.UserEmail = Email;
                }
                if (address != null)
                {
                    u.UserAddress = address;
                }
                if (password != null)
                {
                    u.UserpPassword = password;
                }
                if (phonenum != null)
                {
                    u.UserPhoneNumber = phonenum;
                }
                if (gender != null)
                {
                    u.UserGender = gender;
                }
                db.SaveChanges();
                return Ok(u);
            }
            else
            {
                return NotFound(new { message = "User not found" });
            }

        }

    }
}