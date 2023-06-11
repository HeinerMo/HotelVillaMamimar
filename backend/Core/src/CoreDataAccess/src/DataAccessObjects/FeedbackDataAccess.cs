using CoreDataAccess.src.Context;
using CoreEntities.DataTranferObjects;
using CoreEntities.src.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreDataAccess.src.DataAccessObjects
{
    public class FeedbackDataAccess
    {

        private readonly DataContext _context;

        public FeedbackDataAccess()
        {
            _context = new DataContext();
        }

        public async Task<ActionResult<ResponseDTO<List<Feedback>>>> GetAllFeedbacks()
        {
            var responseDTO = new ResponseDTO<List<Feedback>>();

            var dbFeedbacks = _context.feedbacks.ToList();

            if (dbFeedbacks == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "fatal error";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                responseDTO.Id = 1;
                responseDTO.Item = dbFeedbacks;
            }

            return await Task.FromResult(responseDTO);
        }

        public async Task<ActionResult<ResponseDTO<Feedback>>> UpdateFeedback(Feedback feedback)
        {
            var dbFeedback = _context.feedbacks.FirstOrDefault(s => s.Id == feedback.Id);

            var responseDTO = new ResponseDTO<Feedback>();
            if (dbFeedback == null)
            {
                responseDTO.Id = 0;
                responseDTO.Message = "update failed";
                return await Task.FromResult(responseDTO);
            }
            else
            {
                dbFeedback.Id = feedback.Id;
                dbFeedback.Message = feedback.Message;

                _context.SaveChanges();

                responseDTO.Id = 1;
                responseDTO.Message = "update success";
                responseDTO.Item = dbFeedback;
                return await Task.FromResult(responseDTO);
            }

        }

        public async Task<ActionResult<ResponseDTO<List<Feedback>>>> CreateFeedback(Feedback feedback)
        {
            var responseDTO = new ResponseDTO<List<Feedback>>();

            _context.feedbacks.Add(feedback);

            _context.SaveChanges();

            responseDTO.Id = 1;
            responseDTO.Message = "create success";
            responseDTO.Item = _context.feedbacks.ToList();
            return await Task.FromResult(responseDTO);
        }

        public async Task<ActionResult<ResponseDTO<List<Feedback>>>> DeleteFeedback(Feedback feedback)
        {
            var responseDTO = new ResponseDTO<List<Feedback>>();

            _context.feedbacks.Remove(feedback);

            _context.SaveChanges();

            responseDTO.Id = 1;
            responseDTO.Message = "delete success";
            responseDTO.Item = _context.feedbacks.ToList();
            return await Task.FromResult(responseDTO);
        }

    }
}
