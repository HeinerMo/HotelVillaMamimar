using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{

    [Table("tb_season")]
    public class Season
    {
        public int? Id { get; set; }
        public string? Name { get; set; } = string.Empty;
        public int? Porcentage { get; set; }
        public DateTime? StartingDate { get; set; }
        public DateTime? EndingDate { get; set; }
    }
}
