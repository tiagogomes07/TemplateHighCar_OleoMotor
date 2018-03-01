using MVC_HighCar.Models;
using SiteMVC.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace MVC_HighCar.Controllers
{
    public class MateriasController : ApiController
    {
        Materia M = new Materia();

        [HttpGet]
        public List<Materia> GetMaterias()
        {

            MeuContexto db = new MeuContexto();
            var listaMateria = db.Materia.ToList();
            return listaMateria;
        }

        [HttpPost]
        [ResponseType(typeof(Materia))]
        public IHttpActionResult Post(Materia materia)
        {
            try
            {
                M.Adicionar(materia);
                M.Commit();
            }
            catch (Exception EX)
            {

                throw;
            }

            return Ok();
        }

        [HttpPut]
        [ResponseType(typeof(Materia))]
        public IHttpActionResult Put(Materia materia)
        {
            var matEdit = M.Procurar(materia.ID);
            matEdit.Titulo = materia.Titulo;
            matEdit.Texto = materia.Texto;
            matEdit.Ordem = materia.Ordem;
            matEdit.Imagem = null;
            matEdit.Imagem = materia.Imagem;

            M.Atualizar(matEdit);
            M.Commit();
            return Ok();
        }

        [HttpDelete]
        [ResponseType(typeof(Materia))]
        public IHttpActionResult Delete(Materia materia)
        {

            Imagem Img = new Imagem();

            if (materia.Imagem.Count > 0)
            {
                //Deletar no banco cada uma das imagens do produto
                foreach (var item in materia.Imagem)
                {
                    Img.Deletar(x => x.ID == item.ID);
                    //TO DO:

                    //Deletar na pasta do sistema ImagemProduto o arquivo fisico da imagem
                }
                Img.Commit();
            }
            
            //Deletar produto
            M.Deletar(x => x.ID == materia.ID);
            M.Commit();
            return Ok();
        }



    }
}
