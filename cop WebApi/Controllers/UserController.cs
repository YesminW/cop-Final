﻿using cop.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Diagnostics;
using System.Reflection.Metadata;

namespace Co_p_new__WebApi.Controllers
{
    [EnableCors]

    public class UserController : Controller
    {
        CoPNewContext db = new CoPNewContext();


        [HttpGet]
        [Route("getAllUsers")]
        public dynamic GetAllUsers()
        {
            IEnumerable<User> users = db.Users.Select(x => new User()
            {
                UserId = x.UserId,
                UserPrivetName = x.UserPrivetName,
                UserSurname = x.UserSurname,
                UserBirthDate = x.UserBirthDate,
                UserAddress = x.UserAddress,
                UserPhoneNumber = x.UserPhoneNumber,
                UserGender = x.UserGender,
                UserEmail = x.UserEmail,
                UserpPassword = x.UserpPassword,
                UserCode = x.UserCode,

            });
            return users;

        }
        [HttpGet]
        [Route("GetOneUser/{ID}")]
        public dynamic GetOneUser(string ID)
        {
            User? u = db.Users.Where(x => x.UserId == ID).FirstOrDefault();
            return u;
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
            db.Users.Add(u);
            db.SaveChanges();
            return Ok(u);
        }

        [HttpPost]
        [Route("AddUserByExcel")]
        public async Task<IActionResult> UploadUserExcel(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Please upload a valid Excel file.");
            }

            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial; // Set the license context

            var users = new List<User>();
           

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                using (var package = new ExcelPackage(stream))
                {
                    var worksheet = package.Workbook.Worksheets.First();
                    if (worksheet.Dimension == null)
                    {
                        return BadRequest("The Excel file is empty.");
                    }
                    var rowCount = worksheet.Dimension.Rows;
                    Console.WriteLine($"Row count: {rowCount}");

                    for (int row = 2; row <= rowCount; row++) // Assuming the first row is the header
                    {
                        try
                        {
                            var userId = worksheet.Cells[row, 1].Text;
                            var userPrivetName = worksheet.Cells[row, 2].Text; // Change from int to string
                            var userSurname = worksheet.Cells[row, 3].Text;  // Change from int to string
                            var userBirthDate = DateTime.Parse(worksheet.Cells[row, 4].Text); // Parse DateTime
                            var userAddress = worksheet.Cells[row, 5].Text;
                            var userPhoneNumber = worksheet.Cells[row, 6].Text;
                            var userGender = worksheet.Cells[row, 7].Text;
                            var userEmail = worksheet.Cells[row, 8].Text;
                            var userpPassword = worksheet.Cells[row, 9].Text;
                            var userCode = int.Parse(worksheet.Cells[row, 10].Text);
                            
                            var user = db.Users.FirstOrDefault(u => u.UserId == userId);
                            if (user == null)
                            {
                                var newUser = new User
                                {
                                    UserId = userId,
                                    UserPrivetName = userPrivetName,
                                    UserSurname = userSurname,
                                    UserBirthDate = userBirthDate,
                                    UserAddress = userAddress,
                                    UserPhoneNumber = userPhoneNumber,
                                    UserGender = userGender,
                                    UserEmail = userEmail,
                                    UserpPassword = userpPassword,
                                    UserCode = userCode,
                                };
                                users.Add(newUser);
                               
                            }
                        }
                        catch (FormatException ex)
                        {
                            Console.WriteLine($"Row {row} has invalid data: {ex.Message}");
                            return BadRequest($"Row {row} has invalid data: {ex.Message}");
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Row {row} encountered an error: {ex.Message}");
                            return BadRequest($"Row {row} encountered an error: {ex.Message}");
                        }
                    }
                }
            }

            db.Users.AddRange(users);
            
            await db.SaveChangesAsync();

            ParentOrStaff(file);

            return Ok(new { Message = "Data imported successfully." });
        }

        [HttpPut]
        [Route("parentOrStaff")]
        public dynamic ParentOrStaff(IFormFile file)
        {

            var parent = new List<Parent>();
            var staff = new List<StaffMember>();
            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                using (var package = new ExcelPackage(stream))
                {
                    var worksheet = package.Workbook.Worksheets.First();
                    if (worksheet.Dimension == null)
                    {
                        return BadRequest("The Excel file is empty.");
                    }
                    var rowCount = worksheet.Dimension.Rows;
                    Console.WriteLine($"Row count: {rowCount}");

                    for (int row = 2; row <= rowCount; row++) // Assuming the first row is the header
                    {
                        var userId = worksheet.Cells[row, 1].Text;
                        var userPrivetName = worksheet.Cells[row, 2].Text; // Change from int to string
                        var userSurname = worksheet.Cells[row, 3].Text;  // Change from int to string
                        var userBirthDate = DateTime.Parse(worksheet.Cells[row, 4].Text); // Parse DateTime
                        var userAddress = worksheet.Cells[row, 5].Text;
                        var userPhoneNumber = worksheet.Cells[row, 6].Text;
                        var userGender = worksheet.Cells[row, 7].Text;
                        var userEmail = worksheet.Cells[row, 8].Text;
                        var userpPassword = worksheet.Cells[row, 9].Text;
                        var userCode = int.Parse(worksheet.Cells[row, 10].Text);
                        var currentAcademicYear = int.Parse(worksheet.Cells[row, 11].Text);
                        var kindergartenNumber = int.Parse(worksheet.Cells[row, 12].Text);

                        // Retrieve or create the KindergartenYear entity
                        var ky = db.KindergartenYears.FirstOrDefault(ky => ky.KindergartenNumber == kindergartenNumber && ky.CurrentAcademicYear == currentAcademicYear);

                        if (ky == null)
                        {
                            ky = new KindergartenYear
                            {
                                KindergartenNumber = kindergartenNumber,
                                CurrentAcademicYear = currentAcademicYear
                            };
                            db.KindergartenYears.Add(ky);
                            await db.SaveChangesAsync();
                        }

                        // Retrieve or create related entities as needed

                        if (userCode == 222)
                        {
                            var newParent = new Parent
                            {
                                UserId = userId,
                                KindergartenNumber = kindergartenNumber,
                                CurrentAcademicYear = currentAcademicYear,

                            };
                            parent.Add(newParent);
                        }
                        else if (userCode == 111 || userCode == 333)
                        {
                            var newStaffMember = new StaffMember
                            {
                                UserId = userId,
                                KindergartenNumber = kindergartenNumber,
                                CurrentAcademicYear = currentAcademicYear,

                            };
                            staff.Add(newStaffMember);
                        }



                    }
                }
            }

            db.Parents.AddRange(parent);
            db.SaveChanges();
            db.StaffMembers.AddRange(staff);
            db.SaveChanges();

            return ("Data imported successfully");
        }


        //[HttpPost]
        //[Route("AddUserByExcel")]
        //public async Task<IActionResult> UploadUserExcel(IFormFile file)
        //{
        //    if (file == null || file.Length == 0)
        //    {
        //        return BadRequest("Please upload a valid Excel file.");
        //    }

        //    ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial; // Set the license context

        //    var users = new List<User>();
        //    var parents = new List<Parent>();
        //    var staffm = new List<StaffMember>();

        //    using (var stream = new MemoryStream())
        //    {
        //        await file.CopyToAsync(stream);
        //        using (var package = new ExcelPackage(stream))
        //        {
        //            var worksheet = package.Workbook.Worksheets.First();
        //            if (worksheet.Dimension == null)
        //            {
        //                return BadRequest("The Excel file is empty.");
        //            }
        //            var rowCount = worksheet.Dimension.Rows;
        //            Console.WriteLine($"Row count: {rowCount}");

        //            for (int row = 2; row <= rowCount; row++) // Assuming the first row is the header
        //            {
        //                var UserID = worksheet.Cells[row, 1].Text;
        //                var UserPrivetName = worksheet.Cells[row, 2].Text; // Change from int to string
        //                var UserSurname = worksheet.Cells[row, 3].Text;  // Change from int to string
        //                var UserBirthDate = DateTime.Parse(worksheet.Cells[row, 4].Text); // Parse DateTime
        //                var UserAddress = worksheet.Cells[row, 5].Text;
        //                var UserPhoneNumber = worksheet.Cells[row, 6].Text;
        //                var UserGender = worksheet.Cells[row, 7].Text;
        //                var UserEmail = worksheet.Cells[row, 8].Text;
        //                var UserpPassword = worksheet.Cells[row, 9].Text;
        //                var UserCode = int.Parse(worksheet.Cells[row, 10].Text);
        //                var CurrentAcademicYear = int.Parse(worksheet.Cells[row, 11].Text);
        //                var KindergartenNumber = int.Parse(worksheet.Cells[row, 12].Text);


        //                // Retrieve or create related entities as needed
        //                var user = db.Users.FirstOrDefault(u => u.UserId == UserID);
        //                if (user == null)
        //                {
        //                    var newUser = new User
        //                    {
        //                        UserId = UserID,
        //                        UserPrivetName = UserPrivetName,
        //                        UserSurname = UserSurname,
        //                        UserBirthDate = UserBirthDate,
        //                        UserAddress = UserAddress,
        //                        UserPhoneNumber = UserPhoneNumber,
        //                        UserGender = UserGender,
        //                        UserEmail = UserEmail,
        //                        UserpPassword = UserpPassword,
        //                        UserCode = UserCode,

        //                    };
        //                    users.Add(newUser);
        //                    if (UserCode == 222 )
        //                    {
        //                        var newParent = new Parent
        //                        {
        //                            UserId = UserID,
        //                            KindergartenNumber = KindergartenNumber,
        //                            CurrentAcademicYear = CurrentAcademicYear,

        //                        };
        //                        parents.Add(newParent);
        //                    }
        //                    else if (UserCode == 111 || UserCode == 333)
        //                    {
        //                        var newStaffMember = new StaffMember
        //                        {
        //                            UserId = UserID,
        //                            KindergartenNumber = KindergartenNumber,
        //                            CurrentAcademicYear = CurrentAcademicYear,
        //                        };
        //                        staffm.Add(newStaffMember);
        //                    }
        //                }
        //            }
        //        }
        //    }

        //    db.Users.AddRange(users);
        //    db.Parents.AddRange(parents);
        //    db.StaffMembers.AddRange(staffm);
        //    await db.SaveChangesAsync();

        //    return Ok(new { Message = "Data imported successfully." });
        //}




        [HttpPost]
        [Route("ManagerRegisterion")]
        public dynamic ManagerRegisterion([FromBody] User obj)
        {
            var manager = db.Users.FirstOrDefault(u => u.UserId == obj.UserId);
            if (manager == null)
            {
                var newManager = new User
                {
                    UserId = obj.UserId,
                    UserPrivetName = obj.UserPrivetName,
                    UserSurname = obj.UserSurname,
                    UserBirthDate = obj.UserBirthDate,
                    UserAddress = obj.UserAddress,
                    UserPhoneNumber = obj.UserPhoneNumber,
                    UserGender = obj.UserGender,
                    UserEmail = obj.UserEmail,
                    UserpPassword = obj.UserpPassword,
                    UserCode = 444
                };
                db.Users.Add(newManager);
                db.SaveChanges();
                return Ok(new { Message = "The manager Is registered" });

            }
            return BadRequest(new { Message = "Manager already registerd" });
        }

        [HttpPut]
        [Route("updateUser/{ID}")]
        public dynamic updateUser(string ID, [FromBody] User obj)
        {
            User? u = db.Users.Where(x => x.UserId == ID).FirstOrDefault();
            if (u != null)
            {
                if (obj.UserEmail != null)
                {
                    u.UserEmail = obj.UserEmail;
                }
                if (obj.UserAddress != null)
                {
                    u.UserAddress = obj.UserAddress;
                }
                if (obj.UserpPassword != null)
                {
                    u.UserpPassword = obj.UserpPassword;
                }
                if (obj.UserPhoneNumber != null)
                {
                    u.UserPhoneNumber = obj.UserPhoneNumber;
                }
                if (obj.UserGender != null)
                {
                    u.UserGender = obj.UserGender;
                }
                db.SaveChanges();
                return Ok(u);
            }
            else
            {
                return NotFound(new { message = "User not found" });
            }

        }

        [HttpDelete]
        [Route("DeleteUser")]
        public dynamic DeleteUser(string ID)
        {
            var us = db.Users.Where(u => u.UserId == ID).FirstOrDefault();
            if (us == null)
            {

                return ("User not found");
            }

            db.Users.Remove(us);
            db.SaveChanges();
            return (us.UserPrivetName + " " + us.UserSurname + "deleted");

        }

    }

}