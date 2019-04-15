using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestAPI.Models
{
    public class CrestronUsageCheck
    {
        public string RoomNum { get; set; }
        public string CurrentUser { get; set; }
        public DateTime Duration { get; set; }
        public Boolean CurrentlyUsed { get; set; }
    }
}