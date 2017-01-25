// Copyright (c) 2016, C0D1G0 B1NAR10 and contributors
// For license information, please see license.txt

frappe.ui.form.on('Comisiones Doctores', {
	refresh: function(frm) {
		$(".btn[data-fieldname=recibos_de_pago]").addClass('btn-primary');
		$('.btn[data-fieldname=detalle_de_comisiones_dentista]').addClass('btn-warning');

	},
	onload: function(frm) {
		$(".btn[data-fieldname=recibos_de_pago]").addClass('btn-primary');
		$('.btn[data-fieldname=detalle_de_comisiones_dentista]').addClass('btn-warning');

	},
	procesar_comisiones: function(frm) {
	frappe.confirm(
	'Las comisiones seran marcadas como pagadas y se generaran los recibos de pago',
		function(){
			cur_frm.save();
			// method: "emr.emr.doctype.comisiones_doctores.comisiones_doctores.validate";
	   		window.close();
		},
	    function(){
	        show_alert('No se aplicaron los cambios.')
	    }
	)
	},
	corte: function(frm) {
		 frappe.call({
		      method: "emr.emr.doctype.comisiones_doctores.comisiones_doctores.corte",
		      args:{
					docname: frm.doc.name
				}
		      })
	},
	detalle_de_comisiones_dentista: function(frm) {
		msgprint("<b>Reportes de Comisiones</b>"
    + "<p>Los reportes estan listos para imprimirse <a> AQUI </a>.</p>", 
			'Operacion Exitosa')
	}
});
