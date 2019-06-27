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
        static IEnumerable<Employee> list = Enumerable.Range(0, 101)
                .Select(n => new Employee() { Name = n.ToString(), Salary = n * 1000 });

        [HttpGet("{pageNum}")]
        public ActionResult GetList(int pageNum)
        {
            int pageCount = list.Count() / 10;
            pageCount += list.Count() % 10 != 0 ? 1 : 0;

            var data = new
            {
                pageCount = list.Count() / 10,
                employees = list
            };

            return Json(data);
        }

        public class Employee
        {
            public string Name { get; set; }
            public int Salary { get; set; }
        }

    }
}
