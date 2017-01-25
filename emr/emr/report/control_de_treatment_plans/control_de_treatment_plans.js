// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.query_reports["Control de Treatment Plans"] = {
	"filters": [
		
		{
			"fieldtype": "Date",
			"fieldname": "desde",
			"default": frappe.datetime.nowdate(),
			"label": __("Desde")
		},
		{
			"fieldtype": "Date",
			"fieldname": "hasta",
			"default": frappe.datetime.nowdate(),
			"label": __("Hasta")
		}
		// {
		// 	"fieldname":"paid",
		// 	"label": __("Treatment Plan Pagado"),
		// 	"fieldtype": "Check",
		// 	"default": 1
		// }
	]
}
