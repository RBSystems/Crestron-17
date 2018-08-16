using NYPIProjectionAppDownload.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace NYPIProjectionAppDownload
{
    /// <summary>
    /// Summary description for WebService1
    /// A place to test database methods and insert apk file into database
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class WebService1 : System.Web.Services.WebService
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnStr"].ConnectionString);
        [WebMethod]
        public void InsertFile()
        {
            conn.Open();
            byte[] Androidfile;
            var Androidstream = new FileStream("C:/Users/160902S/Desktop/nypIprojectionApp-Signed.apk", FileMode.Open, FileAccess.Read);
            var Androidreader = new BinaryReader(Androidstream);
            Androidfile = Androidreader.ReadBytes((int)Androidstream.Length);
            string query = "Insert into tblAppDownload(ID, AndroidApp) values(@paraID, @paraAndroid)";
            SqlCommand InsertCom = new SqlCommand(query, conn);
            InsertCom.Parameters.AddWithValue("@paraID", 1);
            InsertCom.Parameters.AddWithValue("@paraAndroid", Androidfile);
            InsertCom.ExecuteNonQuery();
            conn.Close();

        }

        [WebMethod]
        public AppDownloadOBJ GetAppFiles()
        {
            conn.Open();
            AppDownloadOBJ obj = new AppDownloadOBJ();
            string query = "Select * from tblAppDownload where ID = '1'";
            SqlDataAdapter da = new SqlDataAdapter(query, conn);
            DataSet ds = new DataSet();
            da.Fill(ds, "tblAppDownload");
            int rec_count = ds.Tables["tblAppDownload"].Rows.Count;
            if (rec_count > 0)
            {
                DataRow row = ds.Tables["tblAppDownload"].Rows[0];
                obj.AndroidApp = (byte[])row["AndroidApp"];
            }
            else
            {
                obj = null;
            }
            conn.Close();

            return obj;
        }
    }
}
