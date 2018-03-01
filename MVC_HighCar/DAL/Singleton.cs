
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SiteMVC.Dal
{
    public class Singleton
    {
        private static MeuContexto Context;

        public static MeuContexto GetContext()
        {
         
            if (Context == null)
            {
                Context = new MeuContexto();
            }
            return Context;
            
        }

    }
}