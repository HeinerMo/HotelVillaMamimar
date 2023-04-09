using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    public class Facility
    {
        public int? Id { get; set; }
        public string? Description { get; set; }

        public IEnumerable<FacilityImage>? FacilityImages { get; set; } 

    }
}
