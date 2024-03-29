﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Db.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<float>(type: "REAL", nullable: false),
                    Weight = table.Column<float>(type: "REAL", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Storage = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false),
                    Cpf = table.Column<string>(type: "TEXT", nullable: false),
                    Access = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "Name", "Price", "Storage", "Weight" },
                values: new object[,]
                {
                    { 1, "produto um", "ProdutoUm", 1f, 1, 1f },
                    { 2, "produto dois", "ProdutoDois", 2f, 2, 2f },
                    { 3, "produto tres", "ProdutoTres", 3f, 3, 3f },
                    { 4, "produto exemplo", "Exepmlo1", 10f, 5, 4f },
                    { 5, "produto exemplo", "Exemplo2", 20f, 5, 5f },
                    { 6, "produto exemplo", "Exemplo3", 30f, 5, 6f }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Access", "Cpf", "Email", "Name", "Password" },
                values: new object[,]
                {
                    { 1, 0, "10010010010", "user@user.com.br", "User", "user" },
                    { 2, 1, "20020020020", "mod@mod.com.br", "Mod", "mod" },
                    { 3, 2, "30030030030", "admin@admin.com.br", "Admin", "admin" },
                    { 4, 0, "00100100101", "teste@teste.com.br", "Teste", "teste" },
                    { 5, 1, "00200200202", "exmpl@exmpl.com.br", "Exemplo", "exmpl" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
