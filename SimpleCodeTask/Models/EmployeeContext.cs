
using Microsoft.EntityFrameworkCore;
using SimpleCodeTask.Models;
using System;

namespace SimpleCodeTask.Db
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
