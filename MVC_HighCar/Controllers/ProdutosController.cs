using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SiteMVC.Dal;
using MVC_HighCar.Models;
using System.Web.Http.Description;

namespace MVC_HighCar.Controllers
{
    public class ProdutosController : ApiController
    {
        Produto p = new Produto();
        

        [HttpGet]
        public List<Produto> ClientesProduto()
        {

            MeuContexto db = Singleton.GetContext();
            var listaProdutos = db.Produto.Include("Imagem").ToList();
            
            
            return listaProdutos;
        }

        [HttpPost]
        [ResponseType(typeof(Produto))]
        public IHttpActionResult Post(Produto produto)
        {
            p.Adicionar(produto);
            p.Commit();
            return Ok();
        }

        [HttpPut]
        [ResponseType(typeof(Produto))]
        public IHttpActionResult Put(Produto produto)
        {
            var produtoEdit = p.Procurar(produto.ID);

            produtoEdit.Nome = produto.Nome;
            produtoEdit.Preco = produto.Preco;
            produtoEdit.Imagem = produto.Imagem;
            produtoEdit.Detalhes = produto.Detalhes;
            produtoEdit.Ordem = produto.Ordem;

            p.Atualizar(produtoEdit);
            p.Commit();
            return Ok();
        }

        [HttpDelete]
        [ResponseType(typeof(Produto))]
        public IHttpActionResult Delete(Produto produto)
        {
            
            Imagem Img = new Imagem();

            if (produto.Imagem != null)
            {
                //Deletar no banco cada uma das imagens do produto
                foreach (var item in produto.Imagem)
                {
                    Img.Deletar(x => x.ID == item.ID);
                    //TO DO:

                    //Deletar na pasta do sistema ImagemProduto o arquivo fisico da imagem
                }              
            }

            Img.Commit();

            //Deletar produto
            p.Deletar(x => x.ID == produto.ID);
            p.Commit();
            return Ok();
        }




    }
}
