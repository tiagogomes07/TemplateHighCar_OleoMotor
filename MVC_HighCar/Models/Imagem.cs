using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using SiteMVC.Dal;

namespace MVC_HighCar.Models
{
    [Table("Imagem")]
    public class Imagem : Repositorio<Imagem>, IRepositorio<Imagem>
    {
        public int ID { get; set; }
        public string nomeImagem { get; set; }
        public string urlImagem { get; set; }
   
        public virtual Produto Produto { get; set; }
        public virtual Materia Materia { get; set; }
        public virtual Cliente Cliente{ get; set; }
    }
}
