using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AppDbContext : DbContext
    {
        // we are now adding our constructor inside the AppDbContext
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        // This below will get our Student model from the models folder to see how the data will be used and we will add more
        public DbSet<Student> Students { get; set;}

    }
}