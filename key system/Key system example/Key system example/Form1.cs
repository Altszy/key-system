using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Diagnostics;
using System.Net;

namespace Key_system_example
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        // This has been setup to be ran on localhost
        // If you want to host it u will need to configure it ur self

        private void button1_Click(object sender, EventArgs e)
        {
            string hwid = System.Security.Principal.WindowsIdentity.GetCurrent().User.Value;
            Process.Start($"http://localhost:3000/start?HWID={hwid}");
        }

        private void button2_Click(object sender, EventArgs e)
        {
            string hwid = System.Security.Principal.WindowsIdentity.GetCurrent().User.Value;
            string key = textBox1.Text;

            if(key == null || key == "")
            {
                // dumbass hasn't even entered a key smh
                MessageBox.Show("Please input a key!");
                return;
            }
            // check the key response
            WebClient wc = new WebClient();
            var response = wc.DownloadString($"http://localhost:3000/checkkey?hwid={hwid}&key={key}");

            if(response.Contains("invalid"))
            {
                // invalid key yes
                MessageBox.Show("Invalid Key!");
                return;
            } else
            {
                // here you could open the main exploit ui since the key is valid
                // you should probably save the key to a txt file aswell to prevent having to always get a new key
                // or you could create your own endpoint checking if the user has an existing key
                // you could check via hwid
                MessageBox.Show("Valid Key!");
                return;
            }
        }
    }
}
