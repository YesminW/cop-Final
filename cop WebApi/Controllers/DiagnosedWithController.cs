using Co_p_new__WebApi.DTO;
using cop.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Co_p_new_WebApi.Controllers
{
    [EnableCors]
    public class DiagnosedWithController : Controller
    {

        CoPNewContext db = new CoPNewContext();

        [HttpGet]
        [Route("GetAllDiagnosed")]
        public IActionResult GetChildrenWithHealthProblems()
        {
            var childrenWithHealthProblems = db.DiagnosedWiths
                .Select(dw => new ChildHealthProblemDTO()
                {
                    ChildId = dw.ChildId,
                    ChildName = dw.Child.ChildFirstName + " " + dw.Child.ChildSurname,
                    KindergartenName = dw.KindergartenName,
                    HealthProblemName = dw.HealthProblemsNumberNavigation.HealthProblemName,
                    Severity = dw.Severity,
                    Care = dw.Care
                })
                .ToList();

            return Ok(childrenWithHealthProblems);
        }

        [HttpGet]
        [Route("GetChildHealthProblemsbyKindergarten")]
        public IActionResult GetByKindergartenName(string kindergartenName, int year)
        {
            var diagnosedChildren = db.RegisterdTos
                .Where(r => r.KindergartenNumberNavigation.KindergartenName == kindergartenName && r.CurrentAcademicYear == year)
                .SelectMany(r => r.Child.DiagnosedWiths.Select(dw => new ChildHealthProblemDTO
                {
                    ChildId = dw.ChildId,
                    ChildName = dw.Child.ChildFirstName + " " + dw.Child.ChildSurname,
                    HealthProblemName = dw.HealthProblem.HealthProblemName,
                    Severity = dw.Severity,
                    Care = dw.Care
                }))
                .ToList();

            return Ok(diagnosedChildren);
        }

        [HttpPost]
        [Route("AddHealthProblemToChild")]
        public bool AddHealthProblemToChild(string parentId, int healthProblemsNumber, int severity, string care)
        {
            var childId = db.Children
                .Where(c => c.Parent1 == parentId || c.Parent2 == parentId)
                .Select(c => c.ChildId)
                .FirstOrDefault();

            if (childId == null)
            {
                return false;
            }

                var diagnosedWith = new DiagnosedWith
                {
                    ChildId = childId,
                    HealthProblemsNumber = healthProblemsNumber,
                    Severity = severity,
                    Care = care
                };

                db.DiagnosedWiths.Add(diagnosedWith);
                db.SaveChanges();

                return true;
             
        }
    }
}