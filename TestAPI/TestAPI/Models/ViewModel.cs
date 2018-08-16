using PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestAPI.Models
{
    public class ViewModel
    {
        public IPagedList<ProjectorActionLog> ProjectorActionLogList { get; set; }
        public List<CrestronUsageCheck> CrestronUsageCheckList { get; set; }
        public int NumOfEventLogs { get; set; }
        public int NumOfRoomsUsed { get; set; }
    }
}