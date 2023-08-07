import Swal, { SweetAlertOptions } from "sweetalert2"

const Toast =
Swal.mixin({
  toast: true,
  showConfirmButton: false,
  position: 'top-right',
  timer: 4000,
  timerProgressBar: false,
  background: '#F90202',
  color: 'white'
})

const errorDialog =
Swal.mixin({
  toast: false,
  showConfirmButton: false,
  position: 'center',
  timer: 4000,
  timerProgressBar: false,
  icon: 'error'
})

const SuccessDialog =
Swal.mixin({
  toast: false,
  showConfirmButton: false,
  position: 'center',
  timer: 4000,
  timerProgressBar: false,
  icon: 'success'
})

const Confirmation =
Swal.mixin({
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
})

export function showConfirmationAlert(title: string, text: string, confirmButtonText: string): Promise<any> {
  const options: SweetAlertOptions = {
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
    focusCancel: true,
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-secondary',
    },
  };

  return Swal.fire(options);
}


export{errorDialog, Toast, SuccessDialog, Confirmation}