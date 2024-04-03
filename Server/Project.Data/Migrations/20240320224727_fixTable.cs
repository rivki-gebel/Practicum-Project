using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project.Data.Migrations
{
    /// <inheritdoc />
    public partial class fixTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "jobs",
                table: "Employees");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "EmployeeJobs",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeJobs_EmployeeId",
                table: "EmployeeJobs",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeJobs_Employees_EmployeeId",
                table: "EmployeeJobs",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeJobs_Employees_EmployeeId",
                table: "EmployeeJobs");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeJobs_EmployeeId",
                table: "EmployeeJobs");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "EmployeeJobs");

            migrationBuilder.AddColumn<string>(
                name: "jobs",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
