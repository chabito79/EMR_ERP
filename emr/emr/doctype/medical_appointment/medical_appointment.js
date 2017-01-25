// Copyright (c) 2016, C0D1G0 B1NAR10 and contributors
// For license information, please see license.txt

frappe.ui.form.on('Medical Appointment', {
	refresh: function(frm) {
		//frm.set_value("med_history", frm.doc.patient );
		//cur_frm.add_fetch('med_history','image','image');
		$('[data-fieldname=photo]').attr("style","height: 100px; width: 100px;margin: 0px;");
		$('[data-fieldname=patient_name] label').hide();
		$('[data-fieldname=clinic_name] label').hide();
		$('[data-fieldname=x_ray_exams] .control-input-wrapper').hide()
		$('[data-fieldname=x_ray_previews] .control-input-wrapper').hide()
		//para convertir los checkin times a read only despues de salvarlo.
		frm.set_df_property("info_check_in", "read_only", frm.doc.__islocal ? 0 : 1);
		frm.set_df_property("info_check_out", "read_only", frm.doc.__islocal ? 0 : 1);
		frm.set_df_property("imaging_check_in", "read_only", frm.doc.__islocal ? 0 : 1);
		frm.set_df_property("imaging_check_out", "read_only", frm.doc.__islocal ? 0 : 1);

		cur_frm.set_query("diagnostics_doctor", function() {
        	return {
				"filters": { "designation": "Doctor / Diagnosticador",
							 "Status": "Active"
				}
        	};
		});
	},
	onload: function(frm) {
		// cur_frm.save();


	},
	start_diag_button: function(frm) {
		cur_frm.save();
		frappe.route_options = {
			"patient_file": frm.doc.patient,
			"appointment": frm.doc.name,
			"appo": frm.doc.name,
			"diagnostics_doctor": frm.doc.diagnostics_doctor,
			"physical_file": frm.doc.physical_file,
			"image": frm.doc.image
		};

		new_doc("Diagnostic Plan");
	},
	schedule_doctor_appointment: function(frm) {
		cur_frm.save();
		frappe.route_options = {
			"appointment": frm.doc.name
		};

		new_doc("Doctor Appointment");
	},
	arrivedbutton: function(frm) {
		cur_frm.save();
		frappe.route_options = {
			"patient": frm.doc.patient,
			"series": frm.doc.name,
			"clinic": frm.doc.clinic,
			"appointment": frm.doc.name,
			"image": frm.doc.image
		};

		new_doc("Medical History");
	},
	view_calendar: function(frm) {
		window.open("/desk#Calendar/Medical Appointment", '_blank');
	},
	check_in_button: function(frm) {
		//frm.set_value("info_check_in", date.now_datetime);
		frm.set_value("info_check_in", moment());
		frm.set_value("status","Info Office");
		cur_frm.save();
	},
	check_out_button: function(frm) {
		frm.set_value("info_check_out", moment());
	   frm.set_value("status","X Rays");
	   cur_frm.save();
	},
	imaging_check_out_btn: function(frm) {
		frm.set_value("imaging_check_out", moment());
	   frm.set_value("status","Pre Diagnostics");
	   cur_frm.save();
	},
	imaging_check_in_btn: function(frm) {
		frm.set_value("imaging_check_in", moment());
		 cur_frm.save();
	},
	onload_post_render: function(frm) {
		 $('.btn[data-fieldname=view_calendar]').addClass('btn-link');
		 $('.btn[data-fieldname=arrivedbutton]').addClass('btn-primary');
		$('.btn[data-fieldname=start_diag_button]').addClass('btn-success');
		 $('.btn[data-fieldname=check_in_button]').addClass('btn-info');
		 $('.btn[data-fieldname=check_out_button]').addClass('btn-warning');
		 $('.btn[data-fieldname=imaging_check_in_btn]').addClass('btn-info');
		 $('.btn[data-fieldname=imaging_check_out_btn]').addClass('btn-warning');
		 $('.btn[data-fieldname=release_check_in_btn]').addClass('btn-info');
		 $('.btn[data-fieldname=release_check_out_btn]').addClass('btn-warning');
	},
	start_date: function(frm) {
     	cur_frm.set_value('end_date',moment(cur_frm.doc.start_date).add(-390, 'm'));
	}
});
