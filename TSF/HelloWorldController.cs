using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using TSF.CSharp.Data;

namespace TSF
{
    public class HelloWorldController : ApiController
    {
        [HttpPost]
        public string helloWorld()
        {
            return "hello world";
        }
        [HttpPost]
        public string helloWorlDifferent([FromBody] string param)
        {
            return param;
        }

        [HttpPost,HttpGet]
        public List<Hashtable> tableTest(Query query)
        {
            List<Hashtable> ret = new List<Hashtable>();
            for(int i = 0;i < query.returnCount;i++)
            {
                Hashtable hash = new Hashtable();
                hash["col1"] = i + query.startRecord;
                hash["col2"] = "string : " + query.startRecord + i;
                hash["timestamp"] = DateTime.UtcNow;
                ret.Add(hash);
            }
            Thread.Sleep(1000);
            return ret;
        }
        [HttpPost, HttpGet]
        public List<Hashtable> tableTestNoPage(Query query)
        {
            var rnd = new Random();
            List<Hashtable> ret = new List<Hashtable>();
            for (int i = 0; i < 100; i++)
            {
                Hashtable hash = new Hashtable();
                hash["col1"] = i + query.startRecord;
                hash["col2"] = "string : " + query.startRecord + i;
                hash["timestamp"] = DateTime.UtcNow + new TimeSpan(i, 0, 0) ;
                int next = rnd.Next();
                if (next % 3 == 0)
                    hash["col3"] = false;
                else if(next %3 == 1)
                    hash["col3"] = true;
                ret.Add(hash);
            }
            Thread.Sleep(1000);
            return ret;
        }
        [HttpPost, HttpGet]
        public int tableTestCount(Query query)
        {
            return 10000;
        }
    }
}