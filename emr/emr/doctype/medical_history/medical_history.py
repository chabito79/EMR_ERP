# -*- coding: utf-8 -*-
# Copyright (c) 2015, C0D1G0 B1NAR10 and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class MedicalHistory(Document):
	def after_insert(self):
			# esto lo hago para imprimir el numero de MedHistory en el APP
			frappe.db.set_value("Medical Appointment", self.appointment, "med_history", self.name)
