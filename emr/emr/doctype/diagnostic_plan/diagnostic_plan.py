# -*- coding: utf-8 -*-
# Copyright (c) 2015, C0D1G0 B1NAR10 and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.mapper import get_mapped_doc

class DiagnosticPlan(Document):
	def after_insert(self):
			# esto lo hago para imprimir el numero de DP en el APP
			frappe.db.set_value("Medical Appointment", self.appointment, "diagnostic_plan", self.name)

@frappe.whitelist()
def make_dental_work(source_name, target_doc=None):
	def postprocess(source, doc):
		doc.status = "In Process"
		doc.run_method("set_missing_values")



	doc = get_mapped_doc("Diagnostic Plan", source_name, {
		"Diagnostic Plan": {
			"doctype": "Treatment Plan",
			"field_map": {
				"name": "diagnostic_plan",
				# "assistant": 'EMP/0006',
				"status": "in_process"
			}
			# "validation": {
			# 	"docstatus": ["=", 1]
			# }
		},
		"Prelim Plan": {
			"doctype": "Actual",
			"field_map": {
				"parent": "diagnostic_plan"
			}
			# "condition": lambda doc: not frappe.db.exists('Product Bundle', doc.item_code)
		}
	}, target_doc, postprocess)

	return doc
	doc.save()


	# def execute():
	# 	frappe.db.sql(""" update `tabDiagnostic Plan` set treatment_plan = doc.name where name = "DP00017" """)
	# 	frappe.db.commit()


