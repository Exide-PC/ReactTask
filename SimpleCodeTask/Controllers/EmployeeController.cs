using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SimpleCodeTask.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        static List<Employee> list = Enumerable.Range(1, 30)
            .Select(n =>
            new Employee()
            {
                Id = n,
                Name = n.ToString(),
                Salary = n * 1000,
                Email = $"{n}@mail.ru",
                Birth = DateTime.UtcNow
            })
            .ToList();

        const int COUNT_ON_PAGE = 10;

        [HttpGet("getpage/{pageNum}")]
        public ActionResult GetList(int pageNum)
        {
            int startIndex = (pageNum - 1) * COUNT_ON_PAGE;
            int countAfterStart = list.Count - startIndex;
            countAfterStart = countAfterStart < 0 ? 0 : countAfterStart;
            int targetCount = countAfterStart > COUNT_ON_PAGE ? COUNT_ON_PAGE : countAfterStart;

            IEnumerable<Employee> employees = targetCount > 0
                ? list.GetRange(startIndex, targetCount)
                : null;

            int pageCount = list.Count() / COUNT_ON_PAGE;
            pageCount += list.Count() % COUNT_ON_PAGE != 0 ? 1 : 0;

            var data = new
            {
                pageCount,
                pageNum,
                employees = employees
            };

            return Json(data);
        }

        [HttpPost("add")]
        public ActionResult InsertEmployee()
        {
            Employee employee = new Employee()
            {
                Id = list.Max(e => e.Id) + 1,
                Name = Request.Form["name"],
                Email = Request.Form["email"],
                Salary = int.Parse(Request.Form["salary"]),
                Birth = DateTime.Parse(Request.Form["birth"])
            };

            list.Add(employee);

            return Ok();
        }

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

            for (int i = 0; i < list.Count; i++)
            {
                Employee currentEmployee = list[i];
                if (currentEmployee.Id == updatedEmployee.Id)
                {
                    list[i] = updatedEmployee;
                    return Ok();
                }
            }

            return BadRequest();
        }

        [HttpDelete("delete/{id}")]
        public ActionResult Delete(int id)
        {
            list = list.Where(e => e.Id != id).ToList();
            return Ok();
        }

        [HttpGet("getbyid/{id}")]
        public Employee GetById(int id)
        {
            return list.First(e => e.Id == id);
        }

        public class Employee
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public int Salary { get; set; }
            public string Email { get; set; }
            public DateTime Birth { get; set; }
        }

    }
}
