// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.query_reports["Totales Comisiones Doctores"] = {
	"filters": [
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
