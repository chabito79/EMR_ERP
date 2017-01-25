// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt


frappe.views.calendar["Doctor Appointment"] = {
	field_map: {
		"start": "start_date",
		"end": "end_date",
		"id": "name",
		"title": 'title',
		"status": "status",
		"allDay": "allDay"
	},
	options: {
		header: {
			left: 'prev,next today',
			center: 'title',
			right:  'month,agendaWeek,agendaDay,listMonth'
		}
	},
	filters: [
		{
			"fieldtype": "Link",
			"fieldname": "treatment_doctor",
			"options": "Employee",
			"default": localStorage.treatment_doctor,
			"filters": { "designation": "Doctor / Dentista" },
			"label": __("Treatment Doctor")
		},
	],
	get_events_method: "emr.emr.doctype.doctor_appointment.doctor_appointment.get_events",
	get_css_class: function(data) {
		if(data.status=="Open") {
			return "primary";
		} if(data.status=="Out of the Office") {
			return "success";
		} if(data.status=="Busy") {
			return "warning";
		
		} else if(data.status=="") {
			return "";
		}
	}
}
