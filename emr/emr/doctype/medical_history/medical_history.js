// Copyright (c) 2016, C0D1G0 B1NAR10 and contributors
// For license information, please see license.txt

frappe.ui.form.on('Medical History', {
	refresh: function(frm) {
		cur_frm.add_fetch('series','image','image');
		$('[data-fieldname=photo]').attr("style","width: 200px;margin: 0px;");
		$('[data-fieldname=patient_name] label').show();
		$('[data-fieldname=clinic_name] label').show();
	},
	onload: function(frm) {
		cur_frm.disable_save();
		cur_frm.add_fetch('series','image','image');
		$('[data-fieldname=photo]').attr("style","width: 200px;margin: 0px;");
		$('[data-fieldname=patient_name] label').show();
		$('[data-fieldname=clinic_name] label').show();
	},
	image: function(frm) {
		//frappe.container.page.frm.save();
	},
	onload_post_render: function(frm) {
		 $('.btn[data-fieldname=save_and_finish]').addClass('btn-primary');
	},
	save_and_finish: function(frm) {
		frappe.container.page.frm.save()
		console.log('a');
		//cur_frm.save();
		msgprint("Your information has been saved. Please contact your host.");

	}
});
