var app = {

    showAlert: function (message, title)
    {
        if (navigator.notification)
        {
            navigator.notification.alert(message, null, title, 'OK');
        }
        else
        {
            alert(title ? (title + ": " + message) : message);
            
        }
    },
    
    findByName: function()
    {
        var self = this;
        this.store.findByName($('.search-key').val(), function(employees)
        {
            $('.employee-list').html(self.employeeLiTpl(employees));
        });
    },
    
    setCookie: function (name,value)
    {
        window.localStorage.setItem("name", value);
    },
    
    getCookie: function (name)
    {
        var current = localStorage[name];
        var data = {};
        if (typeof current != "undefined") data = window.JSON.parse(current);
        return data;
    },
    
    ForgotPassword: function()
    {
        var self = this;

        var EmailAddress = $('.UserEmail').val();
        EmailAddress = $.trim(EmailAddress);

        if (EmailAddress != "")
        {
            self.showAlert('Per the email address being associated with a valid active account, an email to reset the password will be received.', 'Password Mailed');
            //self.showAlert('Emailaddress:' + EmailAddress,'EmailAddress');

            return true;
        }
        else
        {
            self.showAlert('Enter the email address to send reset links to.', 'Email Empty');


            return false;
        }
    },
    
    SignOnFun: function()
    {
        //alert('GetCookie: ' + localStorage.ckSessionID);

        if (($("#bxEmailAddress").val() != "") && ($("#bxPassword").val() != ""))
        {
            $.ajax(
            {
               type: "POST",
               url: "http://www.umovie.biz/wsSessionService.asmx/UserLogin",
               data: "{ulPassword: '" + $("#bxPassword").val() + "', ulEmailAddress: '" + $("#bxEmailAddress").val() + "'}",
               contentType: "application/json; charset=utf-8",
               dataType: "json",
               success: function(msg)
                {
                   //alert(msg.d);
                   
                   var UserProf = jQuery.parseJSON(msg.d);
                   var UserSessionID = "";
                   
                   $(UserProf).each(function(i,val)
                    {
                        $.each(val, function(k,v)
                        {
                            if (k == "SessionID")
                                UserSessionID = v;  
                        });
                    });
                   
                   if (UserSessionID == "")
                   {
                        $("#dvSignOnFail").css("visibility", "visible");
                   }
                   else
                   {
                        //alert('cookie bad');
                        $("#dvSignOnFail").css("visibility", "hidden");
                        $("#dvSignOnSuccess").css("visibility", "visible");
                        $("#dvbxEmail").css("visibility", "hidden");
                        $("#dvbxPassword").css("visibility", "hidden");
                        $("#btnSignOn").css("visibility", "hidden");
                        $("#btnForgot").css("visibility", "hidden");
                   
                        //alert('cookie score');
                   }
                   
                   //alert('UserSessionID: ' + UserSessionID);
                   
                   localStorage.ckSessionID =  UserSessionID;
                   
                   window.location = "tSignOn.html";
                   
                   //alert("cookie has been set");
                }
            });
        }
        
        if ($("#bxEmailAddress").val() == "")
            alert("Please, enter user's Emailaddress");
        if ($("#bxPassword").val() == "")
            alert("Please, enter user's Password");
        
    },
    
    renderSignOn: function()
    {
        var self = this;
        
        $('body').html(this.SignOnTpl());
    
        $(".UserSignOn").on("click",function()
        {
            self.SignOnFun();
        });
        
        $(".UserForgot").on("click",function()
        {
            self.ForgotPassword();
        });
        
        var myCK = localStorage.ckSessionID;
        
        if ((myCK != "") && (myCK != "null") && (myCK != null))
        {
            $("#dvSignOnFail").css("visibility", "hidden");
            $("#dvSignOnSuccess").css("visibility", "visible");
            $("#dvbxEmail").css("visibility", "hidden");
            $("#dvbxPassword").css("visibility", "hidden");
            $("#btnSignOn").css("visibility", "hidden");
            $("#btnForgot").css("visibility", "hidden");
        }
        else
        {
            $("#dvSignOnFail").css("visibility", "hidden");
            $("#dvSignOnSuccess").css("visibility", "hidden");
            $("#dvbxEmail").css("visibility", "visible");
            $("#dvbxPassword").css("visibility", "visible");
            $("#btnSignOn").css("visibility", "visible");
            $("#btnForgot").css("visibility", "visible");
        }
        
        $("#homeFooter").append (this.NavBarTpl());
        
        
    },

    initialize: function()
    {
        var myCK = localStorage.ckSessionID;

        this.SignOnTpl = Handlebars.compile($("#SignOn-tpl").html());
        
        if ((myCK == "") || (myCK == "null") || (myCK == null))
        {
            this.NavBarTpl = Handlebars.compile($("#MenuBar-tpl-No").html());
        }
        else
        {
            this.NavBarTpl = Handlebars.compile($("#MenuBar-tpl-Yes").html());
        }
        
        var self = this;
        this.store = new MemoryStore(function()
        {
            self.renderSignOn();
        });
        
        
        $(document).ready(function()
        {

        });
    }
};



app.initialize();