using CoreBusiness.src.BusinessAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
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

        [HttpPut]
        [Route("CreateReservation")]
        public async Task<ActionResult<ResponseDTO<int>>> CreateReservation(Reservation reservation)
        {
            return await reservationBusiness.CreateReservation(reservation);
        }
    }
}
