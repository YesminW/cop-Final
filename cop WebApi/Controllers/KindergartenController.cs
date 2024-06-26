﻿using cop.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Co_p_new__WebApi.Controllers
{
    [EnableCors]

    public class KindergartenController : Controller
    {
        CoPNewContext db = new CoPNewContext();

        [HttpGet]
        [Route("ShowKindergarten")]
        public dynamic GetTable()
        {
            IEnumerable<Kindergarten> kinder = db.Kindergartens.Select(x => new Kindergarten()
            {
                KindergartenNumber = x.KindergartenNumber,
                KindergartenName = x.KindergartenName,
                KindergartenAddress = x.KindergartenAddress
            });
            return Ok(kinder);
        }

        [HttpPost]
        [Route("AddKindergarten/{KindergartenName}/{KindergartenAddress}")]
        public dynamic AddKindergarten(string KindergartenName, string KindergartenAddress)
        {
            var kinder = db.Kindergartens;
            var number = kinder.Count();
            var nextkinder = number += 1;

            Kindergarten newk = new Kindergarten();
            newk.KindergartenNumber = nextkinder;
            newk.KindergartenName = KindergartenName;
            newk.KindergartenAddress = KindergartenAddress;
            if (newk == null)
            {
                return BadRequest("Kindergarten cannot be null.");
            }

            db.Kindergartens.Add(newk);
            db.SaveChanges();
            return Ok(newk);
        }
        [HttpPut]
        [Route("UpdateKindergarten")]
        public dynamic UpdateKindergarten(string Name, string address,string newName)
        {
            Kindergarten k = db.Kindergartens.Where(x => x.KindergartenName == Name).FirstOrDefault();
            if (k != null)
            {
                if (newName != null)
                {
                    k.KindergartenName = newName;
                }
                if (address != null)
                {
                    k.KindergartenAddress = address;
                }
               
            }
            else
            {
                return Name + " kindergarten not exist";
            }

            db.Kindergartens.Update(k);
            db.SaveChanges();

            return Name + " kindargarten updated";

        }

        [HttpDelete]
        [Route("DeleteKindergarten")]
        public dynamic DeletKindergarten(string name)
        {
            Kindergarten? k = db.Kindergartens.Where(x => x.KindergartenName == name).SingleOrDefault();

            if (k != null)
            {
                db.Kindergartens.Remove(k);
                db.SaveChanges();
                return Ok($"{name} deleted successfuly ");
            }
            else
            {
                return NotFound("Kindergarten not found");
            }
        }
    }
}