using cop.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;


namespace Co_p_new__WebApi.Controllers
{
    [EnableCors]

    public class DailyAttendanceController
    {
        CoPNewContext db = new CoPNewContext();

        [HttpGet]
        [Route("GetDailyAttendance")]
        public dynamic GetAttendance(DateTime date)
        {
            var attendace = db.DailyAttendances.Where(x => x.Date == date).Select(a => new
            {
                date = a.Date,
                ChildName = a.Child.ChildFirstName + " " + a.Child.ChildSurname,
                MorningPresence = a.MorningPresenceNavigation.AttendanceCodeName,
                AfternoonPresence = a.AfternoonPresenceNavigation.AttendanceCodeName

            });

            return attendace;
        }

        [HttpGet]
        [Route("CountAttendance")]
        public dynamic CountAttendance()
        {
            var kids = db.Children.Count();
            var Attendance = db.DailyAttendances.Where(x => x.Date == DateTime.Today && x.MorningPresence == 1 && x.AfternoonPresence == 0).Count();
            return ($"{Attendance} / {kids}");
        }


        [HttpPost]
        [Route("AddMorningPresence")]
        public dynamic addMorningPresence(string childID, int MorningP)
        {
            DailyAttendance DA = new DailyAttendance();
            DA.Date = DateTime.Now;
            DA.ChildId = childID;
            DA.MorningPresence = MorningP;

            db.DailyAttendances.Add(DA);
            db.SaveChanges();
            return DA;

        }

        [HttpPost]
        [Route("AddAfternoonPresence")]
        public dynamic addAfternoonPresence(string ID, int AfternoonP)
        {
            var dateNow = DateTime.Today;
            DailyAttendance? DA = db.DailyAttendances.Where(x => x.ChildId == ID && x.Date == dateNow).FirstOrDefault();

            DA.AfternoonPresence = AfternoonP;

            db.DailyAttendances.Update(DA);
            db.SaveChanges();
            return DA;

        }




    }
}