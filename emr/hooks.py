# -*- coding: utf-8 -*-
from __future__ import unicode_literals

app_name = "emr"
app_title = "EMR"
app_publisher = "C0D1G0 B1NAR10"
app_description = "Electronic Medical Record for Clinics"
app_icon = "octicon octicon-repo-forked"
app_color = "#2488ee"
app_email = "admin@codigo-binario.com"
app_version = "0.0.1"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
app_include_css = "assets/css/emr.css"
app_include_js = "assets/js/emr.min.js"

# include js, css files in header of web template
# web_include_css = "/assets/emr/css/emr.css"
# web_include_js = "/assets/emr/js/emr.js"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "emr.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "emr.install.before_install"
# after_install = "emr.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "emr.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"emr.tasks.all"
# 	],
# 	"daily": [
# 		"emr.tasks.daily"
# 	],
# 	"hourly": [
# 		"emr.tasks.hourly"
# 	],
# 	"weekly": [
# 		"emr.tasks.weekly"
# 	]
# 	"monthly": [
# 		"emr.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "emr.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "emr.event.get_events"
# }

def after_insert_of_sales_invoice(doc, method=None):
    # grabar la factura en el TP
    # como usar frappe.db.set_value("Target Doctype", source_field, "target linked field", source name)
	frappe.db.set_value("Treatment Plan", doc.treatment_plan, "invoice_number", doc.name)

def after_update_of_diagnostic_plan(doc, method=None):
    # grabar DP en Medical Appointment
	frappe.db.set_value("Medical Appointment", doc.diagnostic_plan, "appointment", doc.name)


# def after_insert(self):
#     # grabar la factura en el TP
#     frappe.db.set_value("Treatment Plan", self.treatment_plan, "invoice_number", self.name)

