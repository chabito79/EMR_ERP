// Copyright (c) 2016, C0D1G0 B1NAR10 and contributors
// For license information, please see license.txt desde ipad



frappe.ui.form.on("Actual", "form_render",

	

	//cdt es current doc type   , cdn current doc name
	function(frm, cdt, cdn){
		
		//aqui paso el [Actual objeto] y el [Actual doc name].... var d es una convencion tambien
		//debugger;
		var d = locals[cdt][cdn];
		//me aseguro que este grabado...el return esta haciendo un break
		if (d.__islocal) return;
		//filtro a la tabla de logs para verificar si existe la referencia a Actual
		var log_rows = frappe.utils.filter_dict(
			frm.doc.log, {
				"actual" : cdn
			}

		);
		if (log_rows.length > 0){
			var tmp = "<table class='table table-bordered'><thead><tr>{0}</tr></head><tbody>{1}</tbody></table>";
			var thead = ["Doctor", "Date", "Note"].map(function(t){
				return format("<th>{0}</td>", [t]);
			}).join("");
			var tbody = log_rows.map(function(row){
				return format("<tr><td>{0}</td><td>{1}</td><td>{2}</td></tr>",
				[row.user, date.str_to_user(row.stamp), row.log])
				//str_to_user es una fecha localizada
				});
			tmp = format(tmp, [thead, tbody]);

			//frm.set_df_property("log", "options", tmp, cdn, d.parentfield);
			frm.fields_dict.plan.grid.grid_rows_by_docname[cdn].fields_dict.log.$wrapper.empty().html(tmp);
		};

 //   if (frm.fields_dict.plan.grid.grid_rows_by_docname[cdn].doc.status == 'Finished') {
	// 	frappe.model.set_value(cdt, cdn, "finished_date", frappe.datetime.now_datetime());
		
	// }
		//Form Styling
		$(".btn[data-fieldname=add_log]").addClass('btn-primary');
		$('.btn[data-fieldname=schedule_appointment]').addClass('btn-warning');

		
});

frappe.ui.form.on("Actual", "status", function(frm, cdt, cdn) {
	if (frm.fields_dict.plan.grid.grid_rows_by_docname[cdn].doc.status == 'Finished') {
		frappe.model.set_value(cdt, cdn, "finished_date", frappe.datetime.now_datetime());	
	}
	else {
		frappe.model.set_value(cdt, cdn, "finished_date", 0);	
	}
});

frappe.ui.form.on("Actual", "item_code", function(frm, cdt, cdn) {
	row = locals[cdt][cdn];
	
	frappe.call({
		method: "frappe.client.get",
		args: {
			doctype: "Item Price",
			filters: {
			"item_code": row.item_code,
			"price_list": "Standard Selling"
			}
		},
		callback: function (data) {
			frappe.model.set_value(cdt, cdn, "price_list_rate", data.message.price_list_rate);
			}
		})
});



frappe.ui.form.on("Actual","add_log",
	function(frm,cdt,cdn) {
		var d = locals[cdt][cdn];
		if (d.__islocal) return;
		frappe.prompt([
			  {
			  "label": "Notes",
				"fieldname": "log",
				"fieldtype": "Small Text", // can be "Text Editor" too
				"reqd": 1
			 }], function(values){
					frm.add_child("log",
					{
					  "actual": cdn,
						"user": frappe.user.name,
					  "log": values.log,
					  "stamp": frappe.datetime.now_datetime(),
					});
					frm.script_manager.trigger("form_render", cdt, cdn);
			 },
			'Enter Medical Notes',
			'Add Note'
			);
});

frappe.ui.form.on("Actual","schedule_appointment",
	function(frm,cdt,cdn) {
		frappe.route_options = {
			"treatment_doctor": frm.fields_dict.plan.grid.grid_rows_by_docname[cdn].doc.doctor,
			"treatment_plan": frm.doc.name
		};

		new_doc("Doctor Appointment");
		// alert(frm.fields_dict.plan.grid.grid_rows_by_docname[cdn].doc.doctor);

});

frappe.ui.form.on("Actual","schedule_follow_up",
	function(frm,cdt,cdn) {
		//reemplazar por algo bien
		// window.open("/desk#Form/Doctor%20Appointment/New%20Doctor%20Appointment", '_blank');
		frappe.route_options = {
			"treatment_doctor": frm.fields_dict.plan.grid.grid_rows_by_docname[cdn].doc.doctor,
			"treatment_plan": frm.doc.name
		};

		new_doc("Doctor Appointment");
});


frappe.ui.form.on('Treatment Plan', {
	refresh: function(frm) {

		//console.log(cur_frm.doc.lista);
		$('[data-fieldname=photo]').attr("style","width: 100px;margin: 0px;");
		//pa borrar el boton de ADD LAB ORDERS
		$('[data-fieldname=orders] .grid-footer').hide();
		$('.btn[data-fieldname=schedule_doctor_appointment]').addClass('btn-warning');
		// cur_frm.set_value("discount_amount", cur_frm.doc.additional_discount_percentage * .01 * cur_frm.doc.subtotal);
		// cur_frm.set_value("total_diagnostic", cur_frm.doc.subtotal - cur_frm.doc.discount_amount);
		// cur_frm.set_value("outstanding_amount", cur_frm.doc.total_diagnostic - cur_frm.doc.total_payments);
		// if (cur_frm.doc.outstanding_amount <= 0 ){
		// 	cur_frm.set_value("paid", 1);
		// }
		// else {cur_frm.set_value("paid", 0);}



		//pa calcular el total de pagos	
		var pagos = 0;
		$(cur_frm.doc.payments).each(function(){
			pagos += this.cantidad;
		})
		cur_frm.set_value("total_payments", parseFloat(pagos));

		
	},
	additional_discount_percentage: function(frm) {
		cur_frm.set_value("discount_amount", cur_frm.doc.additional_discount_percentage * .01 * cur_frm.doc.subtotal);
		cur_frm.set_value("total_diagnostic", cur_frm.doc.subtotal - cur_frm.doc.discount_amount);
		cur_frm.set_value("outstanding_amount", cur_frm.doc.total_diagnostic - cur_frm.doc.total_payments);
		cur_frm.set_value("outstanding_first_visit", cur_frm.doc.total - cur_frm.doc.total_payments);
		if (cur_frm.doc.outstanding_first_visit <= 0 ){
			cur_frm.set_value("paid", 1);
			if (!cur_frm.doc.date_paid) {
				cur_frm.set_value('date_paid',frappe.datetime.now_datetime());
				cur_frm.save();
				}
		}
		else {
			cur_frm.set_value("paid", 0); 
			if (cur_frm.doc.date_paid) {
				cur_frm.set_value('date_paid',0);
				cur_frm.save();
				}
		}

	// para sacar los totales de todo el diagnistico sin importar si es This Visit o Next Visit
		var totalamt = 0;
		$(cur_frm.doc.plan).each(function(){
			if (this.warranty === 0) {
				totalamt += this.amount;
			}
		})
		cur_frm.set_value("subtotal", parseFloat(totalamt));
		
	},
	// discount_amount: function(frm) {
		
	// },
	make_invoice: function() {
		frappe.model.open_mapped_doc({
			method: "emr.emr.doctype.treatment_plan.treatment_plan.make_invoice",
			frm: cur_frm
		})
	},
	apply_payments: function() {
		cur_frm.save();
		location.reload();
	},
	create_lab_order: function(frm) {
		cur_frm.save();
		frappe.route_options = {
			"patient_file": frm.doc.patient_file,
			"treatment_plan": frm.doc.name,
			"requested_by": frm.doc.assistant
		};

		new_doc("Lab Order");
	},
	schedule_doctor_appointment: function(frm) {
		cur_frm.save();
		frappe.route_options = {
			"treatment_doctor": frm.fields_dict.plan.grid.grid_rows[0].doc.doctor,
			"treatment_plan": frm.doc.name
		};

		new_doc("Doctor Appointment");
	},
	medical_history: function(frm) {
 		window.open("/desk#Form/Medical%20History/" + cur_frm.doc.patient_file, '_blank');
	},
	reload_odonto: function(frm) {
 		cur_frm.save();
     	location.reload();
	},
	onload: function(frm) {
		
		// cur_frm.set_value("discount_amount", cur_frm.doc.additional_discount_percentage * .01 * cur_frm.doc.subtotal);
		// cur_frm.set_value("total_diagnostic", cur_frm.doc.subtotal - cur_frm.doc.discount_amount);
		// cur_frm.set_value("outstanding_amount", cur_frm.doc.total_diagnostic - cur_frm.doc.total_payments);
		// if (cur_frm.doc.outstanding_amount <= 0 ){
		// 	cur_frm.set_value("paid", 1);
		// }
		// else {cur_frm.set_value("paid", 0);}
		

		//para filtrar a los asistentes
		cur_frm.set_query("assistant", function() {
        	return {
				"filters": { "designation": "Asistente Dental" }
        	};
		});
		frm.fields_dict.plan.grid.get_field('doctor').get_query =
			function() {
				return {
					filters: {
						"designation": "Doctor / Dentista"
					}
				}
		},
		frm.fields_dict.plan.grid.get_field('item_code').get_query =
			function() {
				return {
					filters: {
						"item_group": "Dental Services"
					}
				}
			}

		// cur_frm.save();
	},
	onload_post_render: function() {

		$('.btn[data-fieldname=apply_payments]').addClass('btn-warning');
		//para sacar totales de amount y descuentos. Aqui genero el valor de amount de c/linea
		var amt = 0;
		$(cur_frm.doc.plan).each(function(){
			
			 this.amount = this.qty * this.price_list_rate;
			
		})
		//sumo todos los amounts de las lineas (solo 1st Visit)
		
		$(cur_frm.doc.plan).each(function(){
			if (this.warranty === 0 && this.status == '1st Visit' || this.status == 'Follow-Up' || this.status == 'Finished' ) {
				amt += this.amount;
				}
		})
		
		cur_frm.set_value("total", parseFloat(amt)  - cur_frm.doc.discount_amount);
			
		// para sacar los totales de todo el diagnistico sin importar si es This Visit o Next Visit
		var totalamt = 0;
		$(cur_frm.doc.plan).each(function(){
			if (this.warranty === 0) {
			totalamt += this.amount;
			}
		})
		cur_frm.set_value("subtotal", parseFloat(totalamt));
		// cur_frm.set_value("total_diagnostic", parseFloat(totalamt));

		//pa calcular el total de pagos	
		var pagos = 0;
		$(cur_frm.doc.payments).each(function(){
			pagos += this.cantidad;
		})
		cur_frm.set_value("total_payments", parseFloat(pagos));
		
		
		cur_frm.set_value("discount_amount", cur_frm.doc.additional_discount_percentage * .01 * cur_frm.doc.subtotal);
		cur_frm.set_value("total_diagnostic", cur_frm.doc.subtotal - cur_frm.doc.discount_amount);
		cur_frm.set_value("outstanding_amount", cur_frm.doc.total_diagnostic - cur_frm.doc.total_payments);
		cur_frm.set_value("outstanding_first_visit", cur_frm.doc.total - cur_frm.doc.total_payments);
		if (cur_frm.doc.outstanding_first_visit <= 0 ){
			cur_frm.set_value("paid", 1);
			if (!cur_frm.doc.date_paid) {
				cur_frm.set_value('date_paid',frappe.datetime.now_datetime());
				cur_frm.save();
				}
		}
		else {
			cur_frm.set_value("paid", 0); 
			if (cur_frm.doc.date_paid) {
				cur_frm.set_value('date_paid',0);
				cur_frm.save();
				}
		}

		$(".btn[data-fieldname=reload_odonto]").addClass('btn-info');
 		$('.btn[data-fieldname=make_invoice]').addClass('btn-success');

		//modo idiota
		var piece = '';
		$(cur_frm.doc.plan).each(function(){
			 piece += this.d1;
		  })
		algo = parseInt(piece);
		if (algo > 0) {
			$("#d01").addClass("selected-tooth");
		  }

		var piece = '';
		$(cur_frm.doc.plan).each(function(){
			 piece += this.d2;
		  })
		algo = parseInt(piece);
		if (algo > 0) {
			$("#d02").addClass("selected-tooth");
		  }

		var piece = '';
		 $(cur_frm.doc.plan).each(function(){
			 piece += this.d3;
		  })
		algo = parseInt(piece);
		if (algo > 0) {
			$("#d03").addClass("selected-tooth");
		  }

		var piece = '';
		 $(cur_frm.doc.plan).each(function(){
			 piece += this.d4;
		  })
		algo = parseInt(piece);
		if (algo > 0) {
			$("#d04").addClass("selected-tooth");
		  }

		 var piece = '';
		$(cur_frm.doc.plan).each(function(){
			 piece += this.d5;
		  })
		algo = parseInt(piece);
		if (algo > 0) {
			$("#d05").addClass("selected-tooth");
		  }

		var piece = '';
		$(cur_frm.doc.plan).each(function(){
			 piece += this.d6;
		  })
		algo = parseInt(piece);
		if (algo > 0) {
			$("#d06").addClass("selected-tooth");
		  }

		var piece = '';
		 $(cur_frm.doc.plan).each(function(){
			 piece += this.d7;
		  })
		algo = parseInt(piece);
		if (algo > 0) {
			$("#d07").addClass("selected-tooth");
		  }

var piece = '';$(cur_frm.doc.plan).each(function(){piece += this.d8;})
		algo = parseInt(piece);if (algo > 0) {$("#d08").addClass("selected-tooth");}

 var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d9;})
		algo = parseInt(piece); if (algo > 0) {$("#d09").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d10;})
		algo = parseInt(piece); if (algo > 0) {$("#d10").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d11;})
		algo = parseInt(piece); if (algo > 0) {$("#d11").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d12;})
		algo = parseInt(piece); if (algo > 0) {$("#d12").addClass("selected-tooth");}

var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d13;})
		algo = parseInt(piece); if (algo > 0) {$("#d13").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d14;})
		algo = parseInt(piece); if (algo > 0) {$("#d14").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d15;})
		algo = parseInt(piece); if (algo > 0) {$("#d15").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d16;})
		algo = parseInt(piece); if (algo > 0) {$("#d16").addClass("selected-tooth");}

var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d17;})
		algo = parseInt(piece); if (algo > 0) {$("#d17").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d18;})
		algo = parseInt(piece); if (algo > 0) {$("#d18").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d19;})
		algo = parseInt(piece); if (algo > 0) {$("#d19").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d20;})
		algo = parseInt(piece); if (algo > 0) {$("#d20").addClass("selected-tooth");}

var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d21;})
		algo = parseInt(piece); if (algo > 0) {$("#d21").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d22;})
		algo = parseInt(piece); if (algo > 0) {$("#d22").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d23;})
		algo = parseInt(piece); if (algo > 0) {$("#d23").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d24;})
		algo = parseInt(piece); if (algo > 0) {$("#d24").addClass("selected-tooth");}

var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d25;})
		algo = parseInt(piece); if (algo > 0) {$("#d25").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d26;})
		algo = parseInt(piece); if (algo > 0) {$("#d26").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d27;})
		algo = parseInt(piece); if (algo > 0) {$("#d27").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d28;})
		algo = parseInt(piece); if (algo > 0) {$("#d28").addClass("selected-tooth");}

var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d29;})
		algo = parseInt(piece); if (algo > 0) {$("#d29").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d30;})
		algo = parseInt(piece); if (algo > 0) {$("#d30").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d31;})
		algo = parseInt(piece); if (algo > 0) {$("#d31").addClass("selected-tooth");}
		var piece = ''; $(cur_frm.doc.plan).each(function(){piece += this.d32;})
		algo = parseInt(piece); if (algo > 0) {$("#d32").addClass("selected-tooth");}

	}
});


