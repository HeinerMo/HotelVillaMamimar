using CoreBusiness.src.BusinessAccessObjects;
using CoreDataAccess.src.DataAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;

namespace CoreAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {

        private readonly FeedbackBusiness feedbackBusiness;

        public FeedbackController() 
        { 
            this.feedbackBusiness = new FeedbackBusiness();
        }

        [HttpGet]
        [Route("GetAllFeedbacks")]
        public async Task<ActionResult<ResponseDTO<List<Feedback>>>> GetAllFeedbacks()
        {
            return await feedbackBusiness.GetAllFeedbacks();
        }

        [HttpPut]
        [Route("UpdateFeedback")]
        public async Task<ActionResult<ResponseDTO<Feedback>>> UpdateFeedback(Feedback feedback)
        {
            return await feedbackBusiness.UpdateFeedback(feedback);
        }

        [HttpPost]
        [Route("CreateFeedback")]
        public async Task<ActionResult<ResponseDTO<List<Feedback>>>> CreateFeedback(Feedback feedback)
        {
            return await feedbackBusiness.CreateFeedback(feedback);
        }

        [HttpDelete]
        [Route("DeleteFeedback")]
        public async Task<ActionResult<ResponseDTO<List<Feedback>>>> DeleteFeedback(Feedback feedback)
        {
            return await feedbackBusiness.DeleteFeedback(feedback);
        }
    }
}
