
namespace MvcApp4.Models
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    
    public partial class MYUSER
    {

        private int UserID_length = 6;
        private int Name_length = 30;
        private int Password_length = 6;
        private int Email_length = 30;
        private int Tel_length = 10;
        private int Address_length = 30;
        private int SecQn_length = 60;
        private int SecAns_length = 60;


        private String _UserID;
        private String _Name;
        private String _Password;
        private String _Email;
        private String _Tel;
        private String _Address;
        private String _SecQn;
        private String _SecAns;

        public string UserID { 
            get 
            { 
                return this._UserID;
            }
            set 
            {
                if (value.Length > UserID_length) this._UserID = value.Substring(0, UserID_length);
                else
                    this._UserID = value;
            }
        }
        public string Name {
            get
            {
                return this._Name;
            }
            set 
            {
                if (value != null && value.Length > Name_length) this._Name = value.Substring(0, Name_length);
                else
                    this._Name = value;

            }
        }
        public string Password {
            get
            {
                return this._Password;
            }
            set
            {
                if (value != null && value.Length > Password_length) this._Password = value.Substring(0, Password_length);
                else
                    this._Password = value;
            }
        }
        public string Email {
            get
            {
                return this._Email;
            }
            set
            {
                if (value != null && value.Length > Email_length) this._Email = value.Substring(0, Email_length);
                else
                    this._Email = value;
            }
        }
        public string Tel {
            get
            {
                return this._Tel;
            }
            set
            {
                if (value != null && value.Length > Tel_length) this._Tel = value.Substring(0, Tel_length);
                else
                    this._Tel = value;
            }
        }
        public string Address {
            get
            {
                return this._Address;
            }
            set
            {
                if (value != null && value.Length > Address_length) this._Address = value.Substring(0, Address_length);
                else
                    this._Address = value;
            }
        }
        public string SecQn {
            get
            {
                return this._SecQn;
            }
            set
            {
                if (value != null && value.Length > SecQn_length) this._SecQn = value.Substring(0, SecQn_length);
                else
                    this._SecQn = value;
            }
        }
        public string SecAns
        {
            get
            {
                return this._SecAns;
            }
            set
            {
                if (value != null && value.Length > SecAns_length) this._SecAns = value.Substring(0, SecAns_length);
                else
                    this._SecAns = value;
            }
        }
    }
}
