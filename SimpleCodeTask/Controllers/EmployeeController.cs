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
        static List<Employee> list = Enumerable.Range(1, 100)
            .Select(n => new Employee() { Name = n.ToString(), Salary = n * 1000 })
            .ToList();

        const int COUNT_ON_PAGE = 10;

        [HttpGet("[action]/{pageNum}")]
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

        public class Employee
        {
            public string Name { get; set; }
            public int Salary { get; set; }
        }

    }
}
