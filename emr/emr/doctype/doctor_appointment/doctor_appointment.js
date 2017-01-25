// Copyright (c) 2016, C0D1G0 B1NAR10 and contributors
// For license information, please see license.txt

frappe.ui.form.on('Doctor Appointment', {
	
	view_calendar: function(frm) {
		//reemplazar por algo bien
		window.open("/desk#Calendar/Doctor%20Appointment/", '_blank');
	},
	
	start_date: function(frm) {
	     	cur_frm.set_value('end_date',moment(cur_frm.doc.start_date).add(60, 'm'));
	},
	refresh: function(frm) {
		

		// if (frm.doc.__islocal && frm.doc.doctor === frm.doc.treatment_doctor){ 
		// 	frm.set_value ("doctor", null);
		// 	// frm.set_value ("treatment_doctor", null);
		// }
		// if (frm.doc.__islocal && !frm.doc.doctor) {
		// 	frappe.call( { 
		// 			method: "frappe.client.get_value",
		// 			args: {
		// 				doctype: "Employee",
		// 				filters: {
		// 						user_id: frappe.user.name
		// 				},
		// 				fieldname: "name"
		// 			},
		// 			callback: function (res) {
		// 				if (!res.exc) {
		// 					frm.set_value ("doctor",res.message.name)
		// 				}
		// 			}
		// 	})
		// }

	},
	onload: function(frm) {
		cur_frm.set_query("treatment_doctor", function() {
        	return {
				"filters": { "designation": "Doctor / Dentista" }
        	};
		});
		cur_frm.set_value("treatment_doctor", localStorage.treatment_doctor_form);
	},
	treatment_doctor: function(frm) {
		localStorage.treatment_doctor_form = $('[data-fieldname=treatment_doctor]input').val();
	}
});
