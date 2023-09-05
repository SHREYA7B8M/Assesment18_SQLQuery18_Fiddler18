using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Assesment18_SQLQuery18_Fiddler18.Models;

namespace Assesment18_SQLQuery18_Fiddler18.Data
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext (DbContextOptions<MovieDbContext> options)
            : base(options)
        {
        }

        public DbSet<Assesment18_SQLQuery18_Fiddler18.Models.Movie> Movie { get; set; } = default!;
    }
}
