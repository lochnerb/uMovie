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
        
        this.SignOnTpl = Handlebars.compile($("#SignOn-tpl").html());
        
        if ((myCK == "") || (myCK == "null") || (myCK == null))
            this.NavBarTpl = Handlebars.compile($("#MenuBar-tpl-No").html());
        else
            this.NavBarTpl = Handlebars.compile($("#MenuBar-tpl-Yes").html());
        
        var self = this;
        this.store = new MemoryStore(function()
        {
            self.renderSignOn();
        });
    }
};



app.initialize();