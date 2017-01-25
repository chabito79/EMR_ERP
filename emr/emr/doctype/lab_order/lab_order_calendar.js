// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.views.calendar["Lab Order"] = {
	field_map: {
		"start": "eta",
		"end": "end_date",
		"id": "name",
		"title": "patient_name",
		"status": "status",
		"allDay": "allDay"
	},
	 gantt: true,
	filters: [
		{
			"fieldtype": "Link",
			"fieldname": "patient_file",
			"options": "Lead",
			"label": __("Patient")
		},
	],
	get_events_method: "emr.emr.doctype.lab_order.lab_order.get_events",
	get_css_class: function(data) {
		if(data.status=="In Work") {
			return "primary";
		} if(data.status=="Accepted") {
			return "success";
		} if(data.status=="Returned") {
			return "warning";

		} else if(data.status=="") {
			return "";
		}
	}
}
