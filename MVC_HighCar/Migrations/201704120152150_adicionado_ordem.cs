namespace MVC_HighCar.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class adicionado_ordem : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Produto", "Ordem", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Produto", "Ordem");
        }
    }
}
