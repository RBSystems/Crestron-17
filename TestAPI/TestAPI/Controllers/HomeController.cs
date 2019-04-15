using PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestAPI.Models;

namespace TestAPI.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Index(string txtRoomNum, int? page)
        {
            ProjectorDAO pDAO = new ProjectorDAO();
            CrestronUsageCheckDAO cDAO = new CrestronUsageCheckDAO();
            ViewModel viewModel = new ViewModel();
            try
            {
                viewModel.ProjectorActionLogList = pDAO.getLogbyRoomNum(txtRoomNum).ToPagedList(page ?? 1, 50);
            }
            catch (System.ArgumentNullException)
            {
                if (viewModel.ProjectorActionLogList == null && txtRoomNum != "" && txtRoomNum != null)
                {
                    ViewBag.message = "There is currently no event logs for room " + txtRoomNum + " or " + txtRoomNum + " is an invalid room";
                }
            }

            viewModel.CrestronUsageCheckList = cDAO.getAppUsage();
            viewModel.NumOfEventLogs = pDAO.getAllEventLog();
            viewModel.NumOfRoomsUsed = cDAO.getAllUsedRooms();
            return View(viewModel);
        }

        [HttpPost]
        public ActionResult Index()
        {
            ProjectorDAO pDAO = new ProjectorDAO();
            pDAO.deleteAllLog();
            return RedirectToAction("Index");
        }
    }
}
