using NYPIProjectionAppDownload.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace NYPIProjectionAppDownload.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult downloadAndroidFile()
        {
            string file = "~/apkdownload/app-release.apk";
            string contentType = "application/apk";
            return File(file, contentType, Path.GetFileName(file));
        }


        [HttpGet]
        public void downloadIOSFile()
        {
            AppDownloadOBJDAO dao = new AppDownloadOBJDAO();
            AppDownloadOBJ obj = new AppDownloadOBJ();
            obj = dao.GetAppFiles();
            Response.Redirect(obj.IOSApp);
            //itms-services://?action=download-manifest&url=https://crestron.sit.nyp.edu.sg/nypIprojectionIOSDownload/manifest.xml
            //This is the url to download IOS App
        }

        [HttpPost]
        public ActionResult OpenPWALink()
        {
            AppDownloadOBJDAO dao = new AppDownloadOBJDAO();
            AppDownloadOBJ obj = new AppDownloadOBJ();
            obj = dao.GetAppFiles();
            return Redirect(obj.PWALink);
            //https://crestron.sit.nyp.edu.sg/nypiprojection/
            //This is the url for the pwa
        }
    }
}