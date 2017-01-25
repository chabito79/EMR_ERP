from __future__ import unicode_literals
from frappe import _


def get_data():
    return [
        {
            "label": _("Medical Stages"),
            "items": [
                {
                    "type": "doctype",
                    "name": "Lead",
                    "label": "Lead",
                    "description": _("-")
                },
                {
                    "type": "doctype",
                    "name": "Medical Appointment",
					"label": "Appointment",
                    "description": _("-")
                },
                {
                    # aguebvo se tiene que llamar Event para que funcione
                    "type": "doctype",
                    "name": "Event",
                    "label": _("Appointments Calendar"),
                    "link": "Calendar/Medical Appointment",
                    "description": _("-")
                },
                {
                    "type": "doctype",
                    "name": "Medical History",
                    "label": "Medical History",
                    "description": _("-")
                },

                # {
                #     "type": "doctype",
                #     "name": "Imaging",
                #     "description": _("-")
                # },
                {
                    "type": "doctype",
                    "name": "Diagnostic Plan",
					"label": "Diagnostic Plans",
                    "description": _("-")
                },
                {
                    "type": "doctype",
                    "name": "Treatment Plan",
					"label": "Treatment Plans",
                    "description": _("-")
                },
                {
                    "type": "doctype",
                    "name": "Lab Order",
                    "label": "Lab Orders",
                    "description": _("-")
                },
                # {
                #     "type": "doctype",
                #     "name": "Doctor Appointment",
                #     "label": "Doctor Appointments",
                #     "description": _("-")
                # },
                {
                    "type": "report",
                    "route": "Calendar/Doctor Appointment",
                    "doctype": "Doctor Appointment",
                    "name": "Doctor Appointments"
                },
                # {
                #     "type": "doctype",
                #     "name": "Patient Release",
                #     "description": _("-")
                # },
                # {
                #     "type": "doctype",
                #     "name": "Event",
                #     "label": _("Doctor Appointments Calendar"),
                #     "link": "Calendar/Doctor Appointment",
                #     "description": _("Event and other calendars."),
                # },
            ]
        },
        {
            "label": _("Catalogs"),
            "items": [
                {
                    "type": "doctype",
                    "name": "Clinic",
                    "description": _("Add new medical clinics here")
                },
            ]
        },
        {
            "label": _("Help"),
            "icon": "icon-facetime-video",
            "items": [
                # {
                #     "type": "help",
                #     "label": _("Setting Up Appointments"),
                #     "youtube_id": "DyR-DST-PyA"
                # },
                # {
                #     "type": "help",
                #     "label": _("Adding Clinics"),
                #     "youtube_id": "kdgM20Q-q68"
                # },
                # {
                #     "type": "help",
                #     "label": _("Register New Patient"),
                #     "youtube_id": "nQ1zZdPgdaQ"
                # }
            ]
        }
    ]
