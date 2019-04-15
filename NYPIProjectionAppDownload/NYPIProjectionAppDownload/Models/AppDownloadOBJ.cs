using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NYPIProjectionAppDownload.Models
{
    public class AppDownloadOBJ
    {
        public byte[] AndroidApp { get; set; }
        public string IOSApp { get; set; }
        public string PWALink { get; set; }
    }
}