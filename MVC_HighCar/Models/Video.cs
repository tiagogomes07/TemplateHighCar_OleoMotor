using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SiteMVC.Dal;

namespace MVC_HighCar.Models
{
    [Table("Video")]
    public class Video : Repositorio<Video>, IRepositorio<Video>
    {
        public int ID { get; set; }
        public string Titulo { get; set; }
        public string urlVideo { get; set; }
        public virtual Cliente Cliente { get; set; }
    }
}
