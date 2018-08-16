using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace NYPIProjectionAppDownload.Models
{
    public class AppDownloadOBJDAO
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnStr"].ConnectionString);
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
                obj.IOSApp = row["IOSApp"].ToString();
                obj.PWALink = row["PWALink"].ToString();
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