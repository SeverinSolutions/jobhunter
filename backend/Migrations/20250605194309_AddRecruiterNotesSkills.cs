using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddRecruiterNotesSkills : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<List<string>>(
                name: "Notes",
                table: "Jobs",
                type: "jsonb",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "RecruiterEmail",
                table: "Jobs",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RecruiterName",
                table: "Jobs",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RecruiterPhone",
                table: "Jobs",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<List<string>>(
                name: "Skills",
                table: "Jobs",
                type: "jsonb",
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "RecruiterEmail",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "RecruiterName",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "RecruiterPhone",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Skills",
                table: "Jobs");
        }
    }
}
