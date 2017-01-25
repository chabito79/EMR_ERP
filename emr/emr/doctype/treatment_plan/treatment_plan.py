# -*- coding: utf-8 -*-
# Copyright (c) 2015, C0D1G0 B1NAR10 and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.mapper import get_mapped_doc


class TreatmentPlan(Document):

	def after_insert(self):
		# esto lo hago para imprimir el numero de TP en el DP
		frappe.db.set_value("Diagnostic Plan", self.diagnostic_plan, "treatment_plan", self.name)
		# esto lo hago para imprimir el numero de TP en el APP
		frappe.db.set_value("Medical Appointment", self.appointment, "treatment_plan", self.name)
		# esto lo hago para cambiar el status a Intreatment
		frappe.db.set_value("Medical Appointment", self.appointment, "status", "In Treatment")

	def onload(self):
		"""Load treatment plan's lab orders for quick view"""
		if self.get("orders"):
			self.orders = []

		for order in self.get_orders():
			self.append("orders", {
				"lab_order": order.name,
				"eta": order.eta,
				"technician": order.technician,
				"status": order.status,
				"notes": order.notes,
				"rejection_cause": order.rejection_cause,
				"quantity": order.quantity,
				"color": order.color,
				"treatment_plan": order.treatment_plan,
				"item": order.item

			})

	def __setup__(self):
		self.onload()

	def get_orders(self):
		return frappe.get_all("Lab Order", "*", {"treatment_plan": self.name}, order_by="status")

		# return frappe.get_all("Lab Order", "*", {"treatment_plan": "TP00038"}, order_by="status")

@frappe.whitelist()
def make_invoice(source_name, target_doc=None):
	# def postprocess(source, doc):
		# doc.material_request_type = "Purchase"

	def set_missing_values(source, target):
		# target.personal_email = frappe.db.get_value("Job Applicant", source.job_applicant, "email_id")
		# target.description = frappe.db.get_value("Item", source.item_code, "description")
		target.run_method("set_missing_values")

	doc = get_mapped_doc("Treatment Plan", source_name, {
		"Treatment Plan": {
			"doctype": "Sales Invoice",
			"field_map": {
				"name": "treatment_plan",

			}
			# "validation": {
			# 	"docstatus": ["=", 1]
			# }
		},
		"Actual": {
			"doctype": "Sales Invoice Item",
			"field_map": {

			}
			# "condition": lambda doc: not frappe.db.exists('Product Bundle', doc.item_code)
		}
	# }, target_doc, postprocess)
	}, target_doc, set_missing_values)

	return doc
	doc.save()
