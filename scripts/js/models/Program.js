define(["backbone", "underscore"], function(Backbone, _) {

    var dayText = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

    var Program = Backbone.Model.extend({
        urlRoot: "/api/program",

        formatTime: function(st) {
            var hours = String(st / 60);
            if (hours.length < 2) { hours = "0" + hours; }
            var minutes = String(st % 60);

            return hours+":"+minutes;
        },
        formatLongTime: function(intv) {
            var hours = intv / 60;
            var minutes = intv % 60;

            var out = hours + " hour";
            out += (hours == 1 ? "" : "s");
            out += minutes + " minute";
            out += (minutes == 1 ? "" : "s");

            return out;
        },

        getStartTime: function() {
            var st = this.get("st");
            return this.formatTime(st);
        },
        getStopTime: function() {
            var et = this.get("end");
            return this.formatTime(et);
        },

        formatInterval: function() {
            var intv = this.get("intv");
            return this.formatLongTime(intv);
        },

        formatDuration: function() {
            var intv = this.get("intv");
            return this.formatLongTime(intv);
        },

        description: function() {
            var type = this.get("type"),
                delay = this.get("delay"),
                frequency = this.get("frequency"),
                days = this.get("days"),
                limit = this.get("limit"),
                out;
            if (type == "interval") {
                out = "Every " + frequency + " days";
                if (delay) { 
                    out += " starting in " + delay;
                    out += (delay == 1 ? " day" : " days");
                }
            } else {
                // Convert the numeric day (0 = Monday, 7 = Sunday) to string (Mon - Sun)
                days = _.map(days, function(d) { return dayText[d]; });

                out = days.join(" ");
                if (limit == "odd") { out += " (Odd days only)"; }
                else if (limit == "even") { out += " (Even days only)"; }
            }
            return out;
        },

        isStationActive: function(ext, sNo) {
            return _.indexOf(this.get("stations")[ext], sNo) != -1;
        }
    });

    var Programs = Backbone.Collection.extend({
        model: Program,
        url: "/api/program"
    }, {
        fetchAll: function() {
            // Make an AJAX request to get all program objects
            var tmp = new this();
            // .fetch() returns a deferred object w/ the AJAX request; we want to return
            // the actual Programs collection, so we pipe the deferred object and return
            // the new collection instead
            return tmp.fetch().pipe(function() { return tmp; });
        }
    });

    return {
        model: Program,
        collection: Programs
    };
});
