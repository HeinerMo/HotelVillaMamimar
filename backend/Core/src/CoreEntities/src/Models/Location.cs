using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{

    [Table("tb_location")]
    public class Location
    {
        public int? Id { get; set; }
        public float? Latitude { get; set; }
        public float? Logitude { get; set; }
        public string? ExtraDetails { get; set; } = String.Empty;
    }
}
