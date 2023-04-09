using CoreBusiness.src.BusinessAccessObjects;
using Microsoft.AspNetCore.Mvc;

namespace CoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResevationController : ControllerBase
    {
        private readonly ReservationBusiness reservationBusiness;
        public ResevationController() { 
            this.reservationBusiness = new ReservationBusiness();
        }
    }
}
