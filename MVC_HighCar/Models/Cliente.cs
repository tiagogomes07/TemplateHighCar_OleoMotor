using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using SiteMVC.Dal;


namespace MVC_HighCar.Models
{
    [Table("Cliente")]
    public class Cliente : Repositorio<Cliente>, IRepositorio<Cliente>
    {
        public int ID { get; set; }
        public string Nome { get; set; }
        public string RazaoSocial { get; set; }
        public long CNPJ { get; set; }
    }



}
