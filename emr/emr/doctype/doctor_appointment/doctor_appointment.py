# -*- coding: utf-8 -*-
# Copyright (c) 2015, C0D1G0 B1NAR10 and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class DoctorAppointment(Document):
	pass

@frappe.whitelist()
def get_events(start, end, filters=None):
	"""Returns events for Gantt / Calendar view rendering.

	:param start: Start date-time.
	:param end: End date-time.
	:param filters: Filters (JSON).
	"""
	from frappe.desk.calendar import get_event_conditions
	conditions = get_event_conditions("Doctor Appointment", filters)

	data = frappe.db.sql("""
		select name,
		title,
		status,
		doctor_name,
		patient_name,
		start_date,
		end_date
		from `tabDoctor Appointment`
		where (ifnull(start_date, '0000-00-00')!= '0000-00-00') \
				and (start_date between %(start)s and %(end)s)
				{conditions}
		""".format(conditions=conditions), {
		"start": start,
		"end": end
	}, as_dict=True, update={"allDay": 0})
	return data