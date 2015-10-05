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
    
    AddUserMovie: function()
    {
        //alert('User Movie Adding');
        
        //jQuery.support.cors = true;
        
        var myCK = localStorage.ckSessionID;
        var myMVID = $( "#NewMovies option:selected" ).val();
        
        //alert('MyCK:' + myCK);
        //alert('myMVID: ' + myMVID);
        //alert('text:' + $( "#NewMovies option:selected" ).text());
        //alert('txt: ' + $("#NewMovies").txt());
        
        if ((myCK != "") || (myCK != "null") || (myCK != null))
        {
            //alert('cookie:' + myCK);
            
            $.ajax(
            {
                   type: "POST",
                   url: "http://www.umovie.biz/wsMovies.asmx/AddMovieQueue",
                   data: "{amUserID: '" + myCK + "', amMovieID: " + myMVID + ", amListTypeID: '17'}",
                   contentType: "application/json; charset=utf-8",
                   dataType: "json",
                   error: function (ex, a, b)
                   {
                        var myError = jQuery.parseJSON(ex);
                        //alert(ex + '--' + a + ': ' + b);
                        //alert('myError: ' + myError);
               
                        $(myError).each(function(i,val)
                        {
                            $.each(val, function(k,v)
                            {
                                alert("-->" + k + ":" + v);
                            });
                        });
                   },
                   success: function(msg)
                   {
                        //alert('success');
                        var NewItems = "";
                        var mvNewID;
                        var mvNewTitle;
                        var Movies = jQuery.parseJSON(msg.d);
               
                        $(Movies).each(function(i,val)
                        {
                            $.each(val, function(k,v)
                            {
                                if (k == "mvID")
                                   mvNewID = v;
                                     
                                if (k == "mvTitle")
                                {
                                   mvNewTitle = v;
                           
                                   //alert('ID:' + mvNewID + ': ' + mvNewTitle);
                                   NewItems += "<option value = '" + mvNewID + "'>" + mvNewTitle + "</option>";
                                }
                            });
                        });
               
                        $("#NewMovies").html(NewItems);
               
                        alert('Movie has been added to your queue.');
                    }
                });
                //alert('done');
            }
    },
    
    renderAddMovie: function()
    {
        var self = this;
        
        $('body').html(this.SignOnTpl());
    
        $(".UserAddMovie").on("click",function()
        {
            self.AddUserMovie();
        });
        
        $("#home").append (this.NavBarTpl());
        
        
    },

    initialize: function()
    {
        jQuery.support.cors = true;
        
        var myCK = localStorage.ckSessionID;
        
        if ((myCK == "") || (myCK == "null") || (myCK == null))
        {
            window.location = "tSignOn.html";
        }
        
        this.SignOnTpl = Handlebars.compile($("#SignOn-tpl").html());
        this.NavBarTpl = Handlebars.compile($("#MenuBar-tpl").html());
        
        var self = this;
        this.store = new MemoryStore(function()
        {
            self.renderAddMovie();
        });
        
        $(document).ready(function()
        {
            jQuery.support.cors = true;
            //alert('Myck' + myCK);
                          
            if ((myCK == "") || (myCK == "null") || (myCK == null))
            {
                //alert('bye bye');
                window.location = "tSignOn.html";
            }
            else
            {
                //alert('dude: ' + myCK);

                $.ajax(
                {
                    type: "POST",
                    url: "http://www.umovie.biz/wsMovies.asmx/NewMovies",
                    data: "{nmUserID: '" + myCK + "', nmListTypeID: '10'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    error: function (ex, a, b)
                    {
                       var myError = jQuery.parseJSON(ex);
                       //alert(ex + '--' + a + ': ' + b);
                       //alert('1myError: ' + myError);
                   
                       $(myError).each(function(i, val)
                        {
                            $.each(val, function(k,v)
                            {
                                   alert("-->" + k + ":" + v);
                            });
                        });
                    },
                    success: function(msg)
                    {
                       //alert('success');
                       var NewItems = "";
                       var mvNewID;
                       var mvNewTitle;
                       var Movies = jQuery.parseJSON(msg.d);
                                 
                       $(Movies).each(function(i,val)
                        {
                            $.each(val, function(k,v)
                            {
                                if (k == "mvID")
                                {
                                   mvNewID = v;
                               
                                   //alert(k + ' - ' + v);
                                }
                               
                                if (k == "mvTitle")
                                {
                                   mvNewTitle = v;
                               
                                   //alert('ID:' + mvNewID + ': ' + mvNewTitle);
                               
                                   NewItems += "<option value = '" + mvNewID + "'>" + mvNewTitle + "</option>";
                                }
                            });
                        });
                   
                        $("#NewMovies").html(NewItems);
                    }

                    //alert ('get New movies done');
                });
            }
        });
    }
};



app.initialize();