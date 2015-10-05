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
    
    renderSignOn: function()
    {
        var self = this;
        
        $('body').html(this.SignOnTpl());
    
        $(".UserSignOn").on("click",function()
        {
            alert('Sign-On');
        });
        
        $(".UserForgot").on("click",function()
        {
            self.ForgotPassword();
        });
        
        $("#home").append (this.NavBarTpl());
        
        
    },

    initialize: function()
    {
        var myCK = localStorage.ckSessionID;
        
        //alert('-->' + myCK + '<--');
        
        this.SignOnTpl = Handlebars.compile($("#SignOn-tpl").html());
        this.NavBarTpl = Handlebars.compile($("#MenuBar-tpl-No").html());

        $(document).ready(function()
        {
            if ((myCK == null) || (myCK == ""))
            {
                window.location = "tSignOn.html";
            }
                          
            $.ajax(
            {
                type: "POST",
                url: "http://www.umovie.biz/wsSessionService.asmx/UserLogOut",
                data: "{ulSessionID: '" + myCK + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(msg)
                {
                    //alert(msg.d);
                   localStorage.ckSessionID =  "";
                }
            });
        });

        var self = this;
        this.store = new MemoryStore(function()
        {
            self.renderSignOn();
        });
    }
};



app.initialize();