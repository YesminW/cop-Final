using cop.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace cop_WebApi.Controllers
{
    public class DutyController : Controller
    {
        CoPNewContext db = new CoPNewContext();

        [HttpGet]
        [Route("setChildForDuty")]
        public dynamic SetDuty(int year, int month, int kindergartenNumber)
        {

            IEnumerable<Child> children = db.Children.Where(c => c.RegisterdTosNavigation.KindergartenNumber== kindergartenNumber).Select(x => new Child()
            {
                ChildFirstName = x.ChildFirstName,
                ChildSurname = x.ChildSurname,
            }).ToList();

            var dates = new List<DateTime>();
            for (var date = new DateTime(year, month, 1); date.Month == month; date = date.AddDays(1))
            {
                dates.Add(date);
            }
            Random random = new Random();
            List<Duty> duties = new List<Duty>();

            for (int i = 0; i < dates.Count(); i++)
            {
                for (int j = 0; j < children.Count(); j++)
                {
                    var RandomChild1 = children.ElementAt(random.Next(children.Count()));
                    var firstName1 = RandomChild1.ChildFirstName + " " + RandomChild1.ChildSurname;
                    List<Child> otherChildren = children.Where(c => c != RandomChild1).ToList();
                    var randomChild2 = otherChildren.ElementAt(random.Next(otherChildren.Count));
                    var firstName2 = randomChild2.ChildFirstName + " " + randomChild2.ChildSurname;

                    Duty d = new Duty
                    {
                        DutyDate = dates[i],
                        Child1 = firstName1,
                        Child2 = firstName2,
                        CurrentAcademicYear = dates[i].Year,
                        KindergartenNumber = kindergartenNumber
                    };
                    duties.Add(d);
                }
            }


            db.Duties.AddRange(duties);
            db.SaveChanges();
            return ("Duties is save");

        }


    }


}
