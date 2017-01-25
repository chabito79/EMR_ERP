// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. andContributors
// License: GNU General Public License v3. See license.txt

frappe.views.calendar["Medical Appointment"] = {
	field_map: {
		"start": "start_date",
		"end": "end_date",
		"id": "name",
		"title": "patient_name",
		"status": "status",
		"allDay": "allDay"
	},
	 gantt: false,
	filters: [
		{
			"fieldtype": "Link",
			"fieldname": "patient",
			"options": "Lead",
			"label": __("Patient")
		},
		{
			"fieldtype": "Select",
			"fieldname": "status",
			"options": "Not Arrived\nArrived\nInfo Office\nX Rays\nPre Diagnostics\nDiagnostics\nIn Treatment\n",
			"label": __("Arrival Status")
		},
		{
			"fieldtype": "Link",
			"fieldname": "clinic",
			"options": "Clinic",
			"label": __("Clinic")
		},
		{
			"fieldtype": "Link",
			"fieldname": "diagnostics_doctor",
			"options": "Employee",
			"filters": { "designation": "Doctor / Diagnosticador" },
			"label": __("Diagnostics Doctor")
		},
	],
	get_events_method: "emr.emr.doctype.medical_appointment.medical_appointment.get_events",
	get_css_class: function(data) {
		if(data.status=="Not Arrived") {
			return "";
		} if(data.status=="Arrived") {
			return "success";
		} if(data.status=="In Office") {
			return "infooffice";
		} if(data.status=="X Rays") {
			return "info";
		} if(data.status=="Pre Diagnostics") {
			return "inverse";
		} if(data.status=="In Treatment") {
			return "danger";
		} if(data.status=="Diagnostics") {
			return "diagnostics";
		} else if(data.status=="") {
			return "";
		}
	}
}
