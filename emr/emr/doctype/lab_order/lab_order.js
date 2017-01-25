// Copyright (c) 2016, C0D1G0 B1NAR10 and contributors
// For license information, please see license.txt

frappe.ui.form.on('Lab Order', {
	refresh: function(frm) {
		cur_frm.set_query("requested_by", function() {
        	return {
				"filters": { "designation": "Doctor / Dentista" }
        	};
		});

		cur_frm.set_query("item", function() {
        	return {
				"filters": { "type": "Lab Item" }
        	};
		});
	},
	eta: function(frm) {
     	cur_frm.set_value('end_date',moment(cur_frm.doc.start_date).add(-390, 'm'));
	}
});
