using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.src.Models
{
    public class RoomTypeInsert
    {
        public decimal? Price { get; set; }
        public string? Name { get; set; } = String.Empty;
        public string? Description { get; set; } = String.Empty;

        public Boolean? IsDeleted { get; set; }
        public string? hexImageString { get; set; } = String.Empty;


    }
}
