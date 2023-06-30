using CoreBusiness.src.BusinessAccessObjects;
using CoreDataAccess.src.DataAccessObjects;
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

        [HttpPost]
        [Route("CreateReservation")]
        public async Task<ActionResult<ResponseDTO<Reservation>>> CreateReservation(Reservation reservation)
        {
            return await reservationBusiness.CreateReservation(reservation);
        }

        [HttpGet]
        [Route("GetReservationsToList")]
        public async Task<ActionResult<ResponseDTO<List<Reservation>>>> GetReservationsToList()
        {
            return await reservationBusiness.GetReservationsToList();
        }

        [HttpDelete]
        [Route("DeleteReservation")]
        public async Task<ActionResult<ResponseDTO<List<Reservation>>>> DeleteReservation(int id)
        {
            return await reservationBusiness.DeleteReservation(id);
        }

    }
}
