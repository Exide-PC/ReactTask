using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleCodeTask.Db;
using SimpleCodeTask.Models;
using SimpleCodeTask.Services;


namespace SimpleCodeTask.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        const int COUNT_ON_PAGE = 10;

        readonly IAuthService _authService;
        readonly EmployeeContext _db;

        public EmployeeController(IAuthService authService, EmployeeContext db)
        {
            this._authService = authService;
            this._db = db;

            EnsureHasEntries();
        }

        void EnsureHasEntries()
        {
            // we want to see at least 10 entries for testing
            if (_db.Employees.Count() < 10)
            {
                var testData = Enumerable.Range(1, 30)
                .Select(n =>
                new Employee()
                {
                    Name = n.ToString(),
                    Salary = n * 1000,
                    Email = $"{n}@mail.ru",
                    Birth = DateTime.UtcNow
                })
                .ToList();

                // By default records wont be inserted in the exact same order
                // we added them to a collection, and we can't do anything 
                // about it unless we call SaveChanges() after every addition
                foreach (var employee in testData)
                {
                    this._db.Employees.Add(employee);
                    this._db.SaveChanges();
                }
            }
        }

        [Authorize]
        [HttpGet("getpage/{pageNum}")]
        public ActionResult GetList(int pageNum)
        {
            var list = this._db.Employees.OrderBy(e => e.Id).ToList();

            int startIndex = (pageNum - 1) * COUNT_ON_PAGE;
            int countAfterStart = list.Count - startIndex;
            countAfterStart = countAfterStart < 0 ? 0 : countAfterStart;
            int targetCount = countAfterStart > COUNT_ON_PAGE ? COUNT_ON_PAGE : countAfterStart;

            IEnumerable<Employee> employees = targetCount > 0
                ? list.GetRange(startIndex, targetCount)
                : null;

            int pageCount = list.Count / COUNT_ON_PAGE;
            pageCount += list.Count % COUNT_ON_PAGE != 0 ? 1 : 0;

            var data = new
            {
                pageCount,
                pageNum,
                employees
            };

            return Json(data);
        }

        [Authorize]
        [HttpPost("add")]
        public ActionResult InsertEmployee()
        {
            Employee employee = new Employee()
            {
                Name = Request.Form["name"],
                Email = Request.Form["email"],
                Salary = int.Parse(Request.Form["salary"]),
                Birth = DateTime.Parse(Request.Form["birth"])
            };

            this._db.Employees.Add(employee);
            this._db.SaveChanges();

            return Ok();
        }

        [Authorize]
        [HttpPut("update")]
        public ActionResult UpdateEmployee()
        {
            Employee updatedEmployee = new Employee()
            {
                Id = int.Parse(Request.Form["id"]),
                Name = Request.Form["name"],
                Email = Request.Form["email"],
                Salary = int.Parse(Request.Form["salary"]),
                Birth = DateTime.Parse(Request.Form["birth"])
            };

            this._db.Employees.Update(updatedEmployee);
            this._db.SaveChanges();
            return Ok();
        }
        
        [Authorize]
        [HttpDelete("delete/{id}")]
        public ActionResult Delete(int id)
        {
            Employee employee = this._db.Employees.FirstOrDefault(e => e.Id == id);

            this._db.Employees.Remove(employee);
            this._db.SaveChanges();

            return Ok();
        }

        [HttpGet("getbyid/{id}")]
        public Employee GetById(int id)
        {
            return this._db.Employees.FirstOrDefault(e => e.Id == id);
        }
    }
}
