using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    public class Season
    {
        public int? Id { get; set; }
        public string? Name { get; set; } = string.Empty;
        public DateTime? startingDate { get; set; }
        public DateTime? endingDate { get; set; }
    }
}
