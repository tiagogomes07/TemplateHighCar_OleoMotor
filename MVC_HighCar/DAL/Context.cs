using System;
using System.Data.Entity;
using MVC_HighCar.Models;
using SiteMVC.Dal;

namespace SiteMVC.Dal
{
    public class MeuContexto : DbContext 
    {
        public MeuContexto() : base("name=MyConnection")
        {
           
        }

        public DbSet<Imagem> Imagem { get; set; }
        public DbSet<Materia> Materia { get; set; }
        public DbSet<Produto> Produto { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Video> Video { get; set; }
        public DbSet<Cliente> Cliente { get; set; }
    }

}
