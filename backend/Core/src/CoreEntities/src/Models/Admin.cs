using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{

    [Table("tb_admin")]
    public class Admin
    {
        public int? Id { get; set; }
        public string? UserName { get; set; } = string.Empty;
        public string? Password { get; set; } = string.Empty;

    }
}
