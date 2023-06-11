using CoreDataAccess.src.DataAccessObjects;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreBusiness.src.BusinessAccessObjects
{
    public class FeedbackBusiness
    {

        private readonly FeedbackDataAccess feedbackDataAccess;

        public FeedbackBusiness()
        {
            feedbackDataAccess = new FeedbackDataAccess();
        }

        public async Task<ActionResult<ResponseDTO<List<Feedback>>>> GetAllFeedbacks()
        {
            return await feedbackDataAccess.GetAllFeedbacks();
        }

        public async Task<ActionResult<ResponseDTO<Feedback>>> UpdateFeedback(Feedback feedback)
        {
            return await feedbackDataAccess.UpdateFeedback(feedback);
        }

        public async Task<ActionResult<ResponseDTO<List<Feedback>>>> CreateFeedback(Feedback feedback)
        {
            return await feedbackDataAccess.CreateFeedback(feedback);
        }

        public async Task<ActionResult<ResponseDTO<List<Feedback>>>> DeleteFeedback(Feedback feedback)
        {
            return await feedbackDataAccess.DeleteFeedback(feedback);
        }

    }
}
