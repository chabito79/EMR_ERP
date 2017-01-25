// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.query_reports["Comisiones por Doctor"] = {
	"filters": [
		{
			"fieldtype": "Link",
			"fieldname": "doctor",
			"options": "Employee",
			"filters": { "designation": "Doctor / Dentista" },
			"default": "EMP/0001",
			"label": __("Doctor")
		},
		{
			"fieldtype": "Date",
			"fieldname": "date",
			"default": frappe.datetime.nowdate(),
			"label": __("Fecha de Corte")
		}
		// {
		// 	"fieldname":"paid",
		// 	"label": __("Treatment Plan Pagado"),
		// 	"fieldtype": "Check",
		// 	"default": 1
		// }
	]
}
