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
        [HttpGet("[action]")]
        public IEnumerable<Employee> GetList()
        {
            return new Employee[]
            {
                new Employee() { Name = "George", Salary = 10000 },
                new Employee() { Name = "Alex", Salary = 15000 },
                new Employee() { Name = "Andrew", Salary = 20000 }
            };
        }

        public class Employee
        {
            public string Name { get; set; }
            public int Salary { get; set; }
        }

    }
}
