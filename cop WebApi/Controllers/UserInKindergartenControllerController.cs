using Co_p_new__WebApi.DTO;
using cop.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Co_p_new__WebApi.Controllers
{
    [EnableCors]

    public class UserInKindergartenControllerController : Controller
    {
        CoPNewContext db = new CoPNewContext();


        [HttpGet]
        [Route("ShowStaffInKindergarten")]
        public dynamic GetStaffmember(KindergartenYearDTO obj)
        {
            var Stuff = db.UserInKindergartens.Where(x => x.User.UserCode == 111 && x.CurrentAcademicYear == obj.CurrentAcademicYear && x.KindergartenNumber == obj.KindergartenNumber).Select(u => new
            {
                FullName = u.User.UserPrivetName + " " + u.User.UserSurname,
                PhoneNumber = u.User.UserPhoneNumber
            });
            return Ok(Stuff);

        }

        [HttpGet]
        [Route("ShowPerentsInKindergarten")]
        public IActionResult GetParents(KindergartenYearDTO obj)
        {
            var parentsWithChildren = db.UserInKindergartens
                .Where(uik => uik.User.UserCode == 222 &&
                               uik.CurrentAcademicYear == obj.CurrentAcademicYear &&
                               uik.KindergartenNumber == obj.KindergartenNumber)
                .SelectMany(uik => uik.User.Parent.ChildParent1Navigations
                    .Select(child => new
                    {
                        ParentName = uik.User.UserPrivetName + " " + uik.User.UserSurname,
                        ParentPhoneNumber = uik.User.UserPhoneNumber,
                        ChildName = child.ChildFirstName + " " + child.ChildSurname
                    }))
                .Concat(db.UserInKindergartens
                    .Where(uik => uik.User.UserCode == 222 &&
                                   uik.CurrentAcademicYear == obj.CurrentAcademicYear &&
                                   uik.KindergartenNumber == obj.KindergartenNumber)
                    .SelectMany(uik => uik.User.Parent.ChildParent2Navigations
                        .Select(child => new
                        {
                            ParentName = uik.User.UserPrivetName + " " + uik.User.UserSurname,
                            ParentPhoneNumber = uik.User.UserPhoneNumber,
                            ChildName = child.ChildFirstName + " " + child.ChildSurname
                        })));

            return Ok(parentsWithChildren);
        }
    }
}