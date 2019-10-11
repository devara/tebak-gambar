import SweetAlert from 'sweetalert2';

const modalConfirmation = SweetAlert.mixin({
	allowOutsideClick: false,
	buttonsStyling: false,
	focusConfirm: false,
	showCancelButton: true,
	confirmButtonText: 'GAAAAAS',
	cancelButtonText: 'RASIDO',
	confirmButtonClass: 'btn btn-sm btn-danger btn-animate mr-2',
	cancelButtonClass: 'btn btn-sm btn-dark btn-animate',
	type: 'warning'
});

export { modalConfirmation };
