var app = {
    RemoveMovie: function ()
    {
        //alert('Interesting - 45');
        
        var myCK = localStorage.ckSessionID;

        $.ajax(
        {
            type: "POST",
            url: "http://www.umovie.biz/wsMovies.asmx/RemoveMovieQueue",
            data: "{rmqUserID: '" + myCK + "', rmqMovieID: 132, rmListTypeID: 10}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: function (ex, a, b)
            {
               var myError = jQuery.parseJSON(ex);
               alert(ex + '--' + a + ': ' + b);
               //alert('Queue Remove myError: ' + myError);
            },
            success: function(msg)
            {
               //alert('movie removed');
                var Movies = jQuery.parseJSON(msg.d);
               
               window.location = "tYourQueue.html";
            }
        });
    },
    
    //tryme: function()
    //{
    //    alert('good stuff TryMe');
    //},
    
    renderSignOn: function()
    {
        var self = this;
        
        $('body').html(this.SignOnTpl());
        
        
        //$(".UserRemoveMovie").on("click",function()
        //{
        //
        //    alert('class');
        //});
        //$(".btnRemovMovie").on("click",function()
        //{
        //    alert('ID');
        //});
        //$(".RemoveMovie").on("click",function()
        //{
        //    alert('Top Button: ');
        //    self.RemoveMovie();
        //});
        
        $("#home").append (this.NavBarTpl());
    },
    
    NextLetter: function(s)
    {
        return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(a)
        {
            var c=a.charCodeAt(0);
            
            switch(c)
            {
                case 90: return 'A';
                case 122: return 'a';
                default: return string.fromCharCode(++c);
            }
        })
    },

    initialize: function()
    {
        $("#btn").bind ("click", function (event)
        {
            alert ("click");
        });
        
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
            self.renderSignOn();
        });
        
        $(document).ready(function()
        {
            if ((myCK == "") || (myCK == "null") || (myCK == null))
            {
                window.location = "tSignOn.html";
            }
             
            $("body").on( "click","button[id^=btnInit]",  function()
            {
                // `this` is reference to each button separately - function will be called many times as how many buttons are
                alert( this.id );
            })
                          
            //alert('myCK: ' + myCK);
                          
            if ((myCK == "") || (myCK == "null") || (myCK == null))
            {
                window.location = "tSignOn.html";
            }
            else
            {
                $.ajax(
                {
                    type: "POST",
                    url: "http://www.umovie.biz/wsMovies.asmx/ViewMovieQueue",
                    data: "{nmUserID: '" + myCK + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    error: function (ex, a, b)
                    {
                       var myError = jQuery.parseJSON(ex);
                       //alert(ex + '--' + a + ': ' + b);
                       //alert('View Queue myError: ' + myError);
                    },
                    success: function(msg)
                    {
                       var Movies = jQuery.parseJSON(msg.d);
                       var listItems = "";
                       
                       var listHDR = "<h3>Your Movie Queue</h3>";
                            listHDR += "<div id='Lvl_Header' class='ui-grid-a' style='width:100%;height:15px;'>";
                       
                                //listItems += "<div class='ui-block-a' style='width:75px; text-align:center; font-size:xx-small;height:10px;'>&nbsp;</div>";
                       
                                listHDR += "<div id='HDR' class='ui-block-a' style='width:44%; text-align:center; font-size:small;height:10px;'><b>Movie Title</b></div>";
                       
                                listHDR += "<div id='THX' class='ui-block-b' style='width:30%; text-align:center; font-size:small;height:10px;'><b>Theatre Release</b></div>";
                       
                                listHDR += "<div id='DVDR' class='ui-block-c' style='width:25%; text-align:center; font-size:small;height:10px;'><b>DVD Release</b></div>";
                       
                            listHDR += "</div>";
                       
                            var listBCK = "<div style='height:275px;background-color: #FFFFFF; overflow:scroll;-webkit-overflow-scrolling: touch;'>";
                   
                       var MovieID = "";
                       var MoveTitle = "";
                       var MoveTheaterRelease = "";
                       var MoveDVDRelease = ";"
                       var myGrid = "a";
                       var myBar = "a";
                       var GridTimes = 1;
                       var BarTimes = 1;
                   
                       $(Movies).each(function(i,val)
                        {
                            $.each(val, function(k,v)
                            {
                                if (k == "mvID")
                                   MovieID = v;
                               
                                if (k == "mvTitle")
                                {
                                   MoveTitle = v;
                                }
                               
                                if (k == "ReleaseDate")
                                {
                                   MoveDVDRelease = v;
                                }
                        
                                if (k == "AltReleaseDate")
                                {
                                   if (GridTimes == 0)
                                   {
                                        GridTimes += 1;
                                        myGrid = "f";
                                   }
                                   else if (GridTimes == 1)
                                   {
                                        GridTimes += 1;
                                        myGrid = "b";
                                   }
                                   else if (GridTimes == 2)
                                   {
                                        GridTimes += 1;
                                        myGrid = "c";
                                   }
                                   else if (GridTimes == 3)
                                   {
                                        GridTimes += 1;
                                        myGrid = "d";
                                   }
                                   else if (GridTimes == 4)
                                   {
                                        GridTimes += 1;
                                        myGrid = "e";
                                   }
                                   else if (GridTimes == 5)
                                   {
                                        GridTimes += 1;
                                        myGrid = "f";
                                   }
                               
                                   if (BarTimes == 0)
                                   {
                                        BarTimes += 1;
                                        myBar = "0";
                                   }
                                   else if (BarTimes == 1)
                                   {
                                        BarTimes = 0;
                                        myBar = "b";
                                   }

                                   MoveTheaterRelease = v;
                               
                                   listItems += "<div id='lvl1'  style='border-color:white;width:100%;height:20px;'>";
                                   
                                        //listItems += "<div class='ui-block-a ui-bar-" + myBar + "' style='width:75px; font-size:xx-small;border-color:white;border-wide:thin; border: 1px solid #FFF;height:25px;text-align:center;'>";
                                   
                                            //listItems += "<input class='RemoveMovie' id='btnRemovMovie' type='button' Value='Remove' onclick=\"onclickCallback( event );\" ontouchstart=\"ontouchstartCallback( event );\" ontouchend=\"ontouchendCallback( event );\"' />";
                                   
                                        //listItems += "</div>";
                                        if (MoveTitle == "")
                                        {
                                            MoveTitle = "&nbsp;"
                                        }
                                        if (MoveTheaterRelease == "")
                                        {
                                            MoveTheaterRelease = "&nbsp;"
                                        }
                                        if (MoveDVDRelease == "")
                                        {
                                            MoveDVDRelease = "&nbsp;"
                                        }
                                   
                                        listItems += "<div id='Title' class='ui-block-a ui-bar-" + myBar + "' style='width:44%; font-size:xx-small;border-color:white;border-wide:thin; border: 1px solid #FFF;height:20px;text-align:center;'>" + MoveTitle + "</div>";
                                   
                                        listItems += "<div id='M_THX' class='ui-block-b ui-bar-" + myBar + "' style='width:30%; font-size:xx-small;border-color:white;border-wide:thin; border: 1px solid #FFF;height:20px;text-align:center;'>" + MoveTheaterRelease + "</div>";
                                
                                        listItems += "<div id='DVDR' class='ui-block-c ui-bar-" + myBar + "' style='width:24.5%; font-size:xx-small;border-color:white;border-wide:thin; border: 1px solid #FFF;height:20px;text-align:center;'>" + MoveDVDRelease + "</div>";
                                   listItems += "</div>";
                                   
                                   MoveTitle = "";
                                   MoveTheaterRelease = "";
                                   MoveDVDRelease = "";
                                }
                            });
                        });
                       
                       if (listItems == "")
                       {
                            var listBCK = "<div style='height:150px;background-color: #FFFFFF; overflow:scroll;-webkit-overflow-scrolling: touch;'>";
                            listBCK += "No Movies Have Been Added To Your Queue."
                       
                       }
                       
                       listItems = listHDR + listBCK + listItems;
                       listItems += "</div>";
                       
                       //alert(listItems);
                       
                        $("#MovieQueue").html(listItems);
                       
                       //var myCK = localStorage.ckSessionID;
                       
                       //var html = "";
                       //html += "<a id=btn href=# data-role=button data-icon=check data-iconpos=right>";
                       //html +=     "<input id='btnRemove53' class='RemoveMovie' type='button' Value='53 Movie'/>";
                       //html += "</a>";
                       
                       //html += "<script>";
                        //html += "$('#btn').bind ('click', function (event)";
                        //html += "{";
                            //html += "alert('start');";
                            //html += "var method_name = 'tryme'; ";
                            //html += "alert('Method Try');";
                            //html += "var method_prefix = ''; ";
                            //html += "var callback_function = new Function(alert('try me')); ";
                                // Call function:
                                //html += "callback_function(); ";
                            //html += "$.ajax({ ";
                                //html += "type: 'POST',";
                                //html += "url: 'http://www.umovie.biz/wsMovies.asmx/RemoveMovieQueue', ";
                                //html += "data: '{rmqUserID: '2342-234234-234234', rmqMovieID: 132, rmListTypeID: 10}', ";
                                //html += "data: '{rmqUserID: '" + myCK + "', rmqMovieID: 132, rmListTypeID: 10}', ";
                       
                       
                                //html += "contentType: 'application/json; charset=utf-8', ";
                                //html += "dataType: 'json', ";
                                //html += "error: function (ex, a, b) ";
                                //html += "{ ";
                                    //html += "var myError = jQuery.parseJSON(ex); ";
                                    //html += "alert(ex + '--' + a + ': ' + b); ";
                                    //html += "alert('Queue Remove myError: ' + myError); ";
                                //html += "}, ";
                                //html += "success: function(msg) ";
                                //html += "{ ";
                                    //html += "alert('movie removed'); ";
                                    //html += "var Movies = jQuery.parseJSON(msg.d); ";
                                    //html += "window.location = 'tYourQueue.html'; ";
                                //html += "} ";
                            //html += "})];\"; ";
                       
                       //html += "alert('end');";
                       //html += "});";
                       
                       //html += "</script>";
                       
                       
                       //$("#MovieQueue").html(html);
                    }
                });
            }
        });
    }
};

app.initialize()