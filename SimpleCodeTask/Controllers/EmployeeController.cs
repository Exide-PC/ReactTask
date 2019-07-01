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

#if DEBUG
            EnsureHasEntries();
#endif
        }

        void EnsureHasEntries()
        {
            // we want to see at least 3 pages full of entries for testing        {
            const int testCount = 3 * COUNT_ON_PAGE;

            // as soon as there are no records left, we insert 30 more
            if (_db.Employees.Count() == 0)
            {
                var testData = Enumerable.Range(1, testCount)
                .Select(n =>
                new Employee()
                {
                    Name = n.ToString(),
                    Salary = n * 1000,
                    Email = $"{n}@mail.ru",
                    Birth = DateTime.UtcNow
                })
                .ToList();

                // By default test records wont be inserted in the exact same order
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
        public JsonResult GetList(int pageNum)
        {
            var list = this._db.Employees.OrderBy(e => e.Id).ToList();

            // if we have nothing to show, then dont do anything
            if (list.Count == 0) return null;

            int pageCount = 
                (list.Count / COUNT_ON_PAGE) + (list.Count % COUNT_ON_PAGE != 0 ? 1 : 0);

            // page number adjustment in case it's out of bounds
            pageNum = pageNum > pageCount ? pageCount : pageNum;

            // calculating startIndex and record count to return
            int startIndex = (pageNum - 1) * COUNT_ON_PAGE;
            int countAfterStart = list.Count - startIndex;
            countAfterStart = countAfterStart < 0 ? 0 : countAfterStart;
            int targetCount = countAfterStart > COUNT_ON_PAGE ? COUNT_ON_PAGE : countAfterStart;

            // now we know exactly which records the frontend needs
            IEnumerable<Employee> employees = list.GetRange(startIndex, targetCount);

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
