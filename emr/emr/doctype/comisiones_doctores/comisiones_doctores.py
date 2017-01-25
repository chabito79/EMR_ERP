# -*- coding: utf-8 -*-
# Copyright (c) 2015, C0D1G0 B1NAR10 and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class ComisionesDoctores(Document):
	pass	
@frappe.whitelist()
def corte(docname):
	fecha = frappe.get_doc("Comisiones Doctores", docname)
	# fecha_final = fecha.fecha_final
	frappe.db.sql(""" update `tabActual` a, `tabTreatment Plan` tp set a.comision_pagada = 1, a.comision_date= (%s)
		where   tp.name = a.parent AND tp.paid = 1 AND a.status = "Finished" AND a.finished_date < (%s) AND tp.date_paid < (%s) AND a.comision_pagada = 0 """, (fecha.fecha_final, fecha.fecha_final, fecha.fecha_final))
	# frappe.db.sql(""" update `tabActual` a, `tabTreatment Plan` tp set a.comision_pagada = 1, a.comision_date= %(fecha_final)s
	# 	where   tp.name = a.parent AND tp.paid = 1 AND a.status = "Finished" AND a.finished_date <  %(fecha_final)s AND tp.date_paid <  %(fecha_final)s AND a.comision_pagada = 0 """)
	frappe.db.commit()
	frappe.db.sql(""" update `tabActual` a, `tabTreatment Plan` tp set a.comision_pagada = 1, a.comision_date= (%s)
		where   tp.name = a.parent AND a.warranty = 1 AND a.status = "Finished" AND a.finished_date < (%s)  AND a.comision_pagada = 0 """, (fecha.fecha_final, fecha.fecha_final))
	frappe.db.commit()
	frappe.msgprint("Nomina Cerrada")
	# cosa = frappe.db.sql(""" update tabActual set comision_pagada = 1, comision_date="2016-12-08" where
	# 	(select actual.parent,
	# 	tp.patient_name,
	# 	actual.status,
	# 	actual.finished_date
	# 	from `tabActual` actual, `tabTreatment Plan` tp
	# 	where tp.name = "TP00301")
	# 	""", as_dict=True)
	# frappe.msgprint(cosa)


# frappe.db.sql("""Update `tabItem` as item set default_bom = NULL where 
# 		not exists(select name from `tabBOM` as bom where item.default_bom = bom.name and bom.docstatus =1 )""")