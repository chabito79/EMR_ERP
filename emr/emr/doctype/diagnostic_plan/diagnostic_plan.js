// Copyright (c) 2016, C0D1G0 B1NAR10 and contributors
// For license information, please see license.txt

//me estoy trayendo el precio...Necesita haber precio definido, si no va a dar un error!
frappe.ui.form.on("Prelim Plan", "doctor", function(frm, cdt, cdn) {
	localStorage.doctor = $('[data-fieldname=doctor]input').val();
});

frappe.ui.form.on("Prelim Plan", "warranty", function(frm, cdt, cdn) {
	row = locals[cdt][cdn];
	frappe.model.set_value(cdt, cdn, "amount",0);
});


frappe.ui.form.on("Prelim Plan", "item_code", function(frm, cdt, cdn) {
	row = locals[cdt][cdn];
	// frm.set_value("notes",frm.fields_dict.plan.grid.grid_rows[0].doc.doctor);
	// frappe.model.set_value(cdt, cdn, "doctor",frm.fields_dict.plan.grid.grid_rows[0].doc.doctor);
	frappe.model.set_value(cdt, cdn, "doctor",localStorage.doctor);
	// frappe.model.set_value(cdt, cdn, "doctor_name",localStorage.doctor_name);
	frappe.call({
		method: "frappe.client.get",
		args: {
			doctype: "Employee",
			filters: {
			"employee": localStorage.doctor
			}
		},
		callback: function (data) {
			frappe.model.set_value(cdt, cdn, "doctor_name", data.message.employee_name);
			}
		}),
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


frappe.ui.form.on("Prelim Plan", "form_render", function(frm, cdt, cdn) {
	$('[data-fieldname=view_availability] a').attr("style","color: blue;");
	
	
});


frappe.ui.form.on('Diagnostic Plan', {

	refresh: function (frm, doctype, name) {
		
		cur_frm.add_fetch('appo','image','image');
		$('[data-fieldname=photo]').attr("style","width: 100px;margin: 0px;");
		$('[data-fieldname=view_availability] a').attr("style","color: blue;");
		$('.btn[data-fieldname=make_dental_work]').addClass('btn-warning').removeClass('btn-xs');
		$('.btn[data-fieldname=schedule_doctor_appointment]').addClass('btn-warning').removeClass('btn-xs');
		//var row = locals[doctype][name];
		//row.dental_piece = '01';
		$('[data-fieldname=patient_name] label').show();
		

			//para sacar totales de amount y descuentos. Aqui genero el valor de amount de c/linea
		$(cur_frm.doc.plan).each(function(){
			if (this.warranty === 0) {
			 this.amount = this.qty * this.price_list_rate;
			}
		})
			//sumo todos los amounts de las lineas (solo 1st Visit)
		var amt = 0;
		$(cur_frm.doc.plan).each(function(){
			if (this.status == '1st Visit' && this.warranty === 0) {
				amt += this.amount;
				}
		})
		cur_frm.set_value("subtotal", parseFloat(amt));
		cur_frm.set_value("total", parseFloat(amt));
			
			// para sacar los totales de todo el diagnistico sin importar si es This Visit o Next Visit
		var totalamt = 0;
		$(cur_frm.doc.plan).each(function(){
			if (this.warranty === 0) {
				totalamt += this.amount;
			}
		})
		cur_frm.set_value("total_diagnostic", parseFloat(totalamt));

			// para filtrar solo los asistentes
		cur_frm.set_query("medical_assistant", function() {
        	return {
				"filters": { "designation": "Asistente Dental" }
        	};
		});

		// para cargar medical assistant de local storage
		cur_frm.set_value("medical_assistant",localStorage.medical_assistant);
		// frappe.call({
		// 	method: "frappe.client.get",
		// 	args: {
		// 		doctype: "Employee",
		// 		filters: {
		// 		"employee": localStorage.medical_assistant
		// 		}
		// 	},
		// 	callback: function (data) {
		// 		cur_frm.set_value("medical_assistant",localStorage.medical_assistant);
		// 		}
		// 	});


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
		},
	//asi se filtra en los child tables
	onload: function(frm) {
	
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
	},
	discount_amount: function(frm) {
		cur_frm.set_value("total", cur_frm.doc.subtotal - cur_frm.doc.discount_amount);
	},
	medical_assistant: function(frm) {
		localStorage.medical_assistant = $('[data-fieldname=medical_assistant]input').val();
	},
	additional_discount_percentage: function(frm) {
		cur_frm.set_value("discount_amount", cur_frm.doc.additional_discount_percentage * .01 * cur_frm.doc.subtotal);
	},
	view_logged_doctors: function(frm) {
		//reemplazar por algo bien
		window.open("/desk#messages", '_blank');
	},
	make_dental_work: function() {
		// cur_frm.save();
		frappe.model.open_mapped_doc({
			method: "emr.emr.doctype.diagnostic_plan.diagnostic_plan.make_dental_work",
			frm: cur_frm
		});
	},
	treatment_consent: function(frm) {
     	cur_frm.save();
     },
	reload_odonto: function(frm) {
     	cur_frm.save();
     	location.reload();
	},
	medical_history: function(frm) {
 		window.open("/desk#Form/Medical%20History/" + cur_frm.doc.patient_file, '_blank');
	},
	plan_on_form_rendered: function(doc, cdt, cdn){
		$(':checkbox[data-fieldname="q1"]').click (function () {
			$(':checkbox[data-fieldname="d1"]').trigger( "click" );
			$(':checkbox[data-fieldname="d2"]').trigger( "click" );
			$(':checkbox[data-fieldname="d3"]').trigger( "click" );
			$(':checkbox[data-fieldname="d4"]').trigger( "click" );
			$(':checkbox[data-fieldname="d5"]').trigger( "click" );
			$(':checkbox[data-fieldname="d6"]').trigger( "click" );
			$(':checkbox[data-fieldname="d7"]').trigger( "click" );
			$(':checkbox[data-fieldname="d8"]').trigger( "click" );
		});
		$(':checkbox[data-fieldname="q2"]').click (function () {
			$(':checkbox[data-fieldname="d9"]').trigger( "click" );
			$(':checkbox[data-fieldname="d10"]').trigger( "click" );
			$(':checkbox[data-fieldname="d11"]').trigger( "click" );
			$(':checkbox[data-fieldname="d12"]').trigger( "click" );
			$(':checkbox[data-fieldname="d13"]').trigger( "click" );
			$(':checkbox[data-fieldname="d14"]').trigger( "click" );
			$(':checkbox[data-fieldname="d15"]').trigger( "click" );
			$(':checkbox[data-fieldname="d16"]').trigger( "click" );
		});
		$(':checkbox[data-fieldname="q3"]').click (function () {
			$(':checkbox[data-fieldname="d17"]').trigger( "click" );
			$(':checkbox[data-fieldname="d18"]').trigger( "click" );
			$(':checkbox[data-fieldname="d19"]').trigger( "click" );
			$(':checkbox[data-fieldname="d20"]').trigger( "click" );
			$(':checkbox[data-fieldname="d21"]').trigger( "click" );
			$(':checkbox[data-fieldname="d22"]').trigger( "click" );
			$(':checkbox[data-fieldname="d23"]').trigger( "click" );
			$(':checkbox[data-fieldname="d24"]').trigger( "click" );
		});
		$(':checkbox[data-fieldname="q4"]').click (function () {
			$(':checkbox[data-fieldname="d25"]').trigger( "click" );
			$(':checkbox[data-fieldname="d26"]').trigger( "click" );
			$(':checkbox[data-fieldname="d27"]').trigger( "click" );
			$(':checkbox[data-fieldname="d28"]').trigger( "click" );
			$(':checkbox[data-fieldname="d29"]').trigger( "click" );
			$(':checkbox[data-fieldname="d30"]').trigger( "click" );
			$(':checkbox[data-fieldname="d31"]').trigger( "click" );
			$(':checkbox[data-fieldname="d32"]').trigger( "click" );
		});
		$(':checkbox[data-fieldname="fm"]').click (function () {
			$(':checkbox[data-fieldname="q1"]').trigger( "click" );
			$(':checkbox[data-fieldname="q2"]').trigger( "click" );
			$(':checkbox[data-fieldname="q3"]').trigger( "click" );
			$(':checkbox[data-fieldname="q4"]').trigger( "click" );
		});
    },
	onload_post_render: function () {
		 $(".btn[data-fieldname=reload_odonto]").addClass('btn-info');
		 $('.btn[data-fieldname=make_dental_work]').addClass('btn-warning').removeClass('btn-xs');
		 // $(".grid-body [data-fieldname=dental_piece]").each(function(){
		 // 	piece = "#d" + $(this).text();
		 // 	$(piece).addClass("selected-tooth");
		 // 	console.log(piece);
		 // 	});

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



