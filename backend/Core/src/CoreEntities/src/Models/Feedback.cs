using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{

    [Table("tb_feedback")]
    public class Feedback
    {
        public int? Id { get; set; }
        public string? Message { get; set; } = string.Empty;

    }
}
