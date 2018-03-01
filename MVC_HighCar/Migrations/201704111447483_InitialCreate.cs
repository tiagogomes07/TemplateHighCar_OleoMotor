namespace MVC_HighCar.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Cliente",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Nome = c.String(),
                        RazaoSocial = c.String(),
                        CNPJ = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Imagem",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        nomeImagem = c.String(),
                        urlImagem = c.String(),
                        Cliente_ID = c.Int(),
                        Materia_ID = c.Int(),
                        Produto_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Cliente", t => t.Cliente_ID)
                .ForeignKey("dbo.Materia", t => t.Materia_ID)
                .ForeignKey("dbo.Produto", t => t.Produto_ID)
                .Index(t => t.Cliente_ID)
                .Index(t => t.Materia_ID)
                .Index(t => t.Produto_ID);
            
            CreateTable(
                "dbo.Materia",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Titulo = c.String(),
                        Texto = c.String(),
                        Cliente_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Cliente", t => t.Cliente_ID)
                .Index(t => t.Cliente_ID);
            
            CreateTable(
                "dbo.Produto",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Nome = c.String(),
                        Detalhes = c.String(),
                        Preco = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Cliente_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Cliente", t => t.Cliente_ID)
                .Index(t => t.Cliente_ID);
            
            CreateTable(
                "dbo.User",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Nome = c.String(),
                        Login = c.String(),
                        Senha = c.String(),
                        Cliente_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Cliente", t => t.Cliente_ID)
                .Index(t => t.Cliente_ID);
            
            CreateTable(
                "dbo.Video",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Titulo = c.String(),
                        urlVideo = c.String(),
                        Cliente_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Cliente", t => t.Cliente_ID)
                .Index(t => t.Cliente_ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Video", "Cliente_ID", "dbo.Cliente");
            DropForeignKey("dbo.User", "Cliente_ID", "dbo.Cliente");
            DropForeignKey("dbo.Imagem", "Produto_ID", "dbo.Produto");
            DropForeignKey("dbo.Produto", "Cliente_ID", "dbo.Cliente");
            DropForeignKey("dbo.Imagem", "Materia_ID", "dbo.Materia");
            DropForeignKey("dbo.Materia", "Cliente_ID", "dbo.Cliente");
            DropForeignKey("dbo.Imagem", "Cliente_ID", "dbo.Cliente");
            DropIndex("dbo.Video", new[] { "Cliente_ID" });
            DropIndex("dbo.User", new[] { "Cliente_ID" });
            DropIndex("dbo.Produto", new[] { "Cliente_ID" });
            DropIndex("dbo.Materia", new[] { "Cliente_ID" });
            DropIndex("dbo.Imagem", new[] { "Produto_ID" });
            DropIndex("dbo.Imagem", new[] { "Materia_ID" });
            DropIndex("dbo.Imagem", new[] { "Cliente_ID" });
            DropTable("dbo.Video");
            DropTable("dbo.User");
            DropTable("dbo.Produto");
            DropTable("dbo.Materia");
            DropTable("dbo.Imagem");
            DropTable("dbo.Cliente");
        }
    }
}
