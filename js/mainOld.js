var app = {

    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },

    initialize: function() {
        alert('start');
        var self = this;
        alert('2');
        this.store = new MemoryStore(function() {
                                     alert('3');
                                     $('.search-key').on('keyup', $.proxy(this.findByName, this));
                                     alert('6');
        $('.UserSignOn').on('click', alert('Press Me'));
                                     
        $(".UserSignOn").on("click",function(){
                                               alert("My Button Was Clicked.");
                                               });
                                     alert('8');
                                     });
        alert('7');
    }

};

app.initialize();