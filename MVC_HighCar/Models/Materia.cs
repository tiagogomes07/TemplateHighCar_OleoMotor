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
    [Table("Materia")]
    public class Materia : Repositorio<Materia>, IRepositorio<Materia>
    {
        public int ID { get; set; }
        public int Ordem { get; set; }
        public string Titulo { get; set; }
        
        public string Texto { get; set; }
       
        public virtual Cliente Cliente { get; set; }
        public virtual List<Imagem> Imagem { get; set; }
    }
}
