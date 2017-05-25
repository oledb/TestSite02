using Microsoft.EntityFrameworkCore.Migrations;

namespace CrudApp.Model.Migrations
{
    public partial class ChangeObjective : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ObjectiveId",
                table: "Objectives",
                newName: "Id");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Objectives",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Objectives");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Objectives",
                newName: "ObjectiveId");
        }
    }
}
