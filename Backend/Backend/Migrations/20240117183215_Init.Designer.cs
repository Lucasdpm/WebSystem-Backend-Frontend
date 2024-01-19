﻿// <auto-generated />
using Backend.Db.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20240117183215_Init")]
    partial class Init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.1");

            modelBuilder.Entity("Backend.Db.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Price")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Storage")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Weight")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Products");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "um",
                            Name = "Um",
                            Price = 1,
                            Storage = 1,
                            Weight = 1
                        },
                        new
                        {
                            Id = 2,
                            Description = "dois",
                            Name = "Dois",
                            Price = 2,
                            Storage = 2,
                            Weight = 2
                        },
                        new
                        {
                            Id = 3,
                            Description = "tres",
                            Name = "Tres",
                            Price = 3,
                            Storage = 3,
                            Weight = 3
                        });
                });

            modelBuilder.Entity("Backend.Db.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Access")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Cpf")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Access = 0,
                            Cpf = "10010010010",
                            Email = "user@user.com.br",
                            Name = "User",
                            Password = "user"
                        },
                        new
                        {
                            Id = 2,
                            Access = 1,
                            Cpf = "20020020020",
                            Email = "mod@mod.com.br",
                            Name = "Mod",
                            Password = "mod"
                        },
                        new
                        {
                            Id = 3,
                            Access = 2,
                            Cpf = "30030030030",
                            Email = "admin@admin.com.br",
                            Name = "Admin",
                            Password = "admin"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
