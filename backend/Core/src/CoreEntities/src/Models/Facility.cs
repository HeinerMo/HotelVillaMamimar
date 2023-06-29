using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    [Table("tb_facility")]
    public class Facility
    {
        public int? Id { get; set; }
        public string? Description { get; set; }
        [NotMapped]
        public string? HexImageString { get; set; }
        public IEnumerable<FacilityImage>? FacilityImages { get; set; } 

    }
}
