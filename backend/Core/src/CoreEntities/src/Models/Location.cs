using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    public class Location
    {
        public int? Id { get; set; }
        public float? Latitude { get; set; }
        public float? Logitude { get; set; }
        public string? ExtraDetails { get; set; } = String.Empty;
    }
}
