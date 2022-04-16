// import Swal from 'sweetalert2/dist/sweetalert2.js';

export abstract class BaseComponent {

  viewName: string;

  // inProgress: boolean = false;

//   swal = Swal;

  alert: any;

  protected constructor() {
  }

  protected handleRejectionResponse(reason: any): void {

  }

  featureNotYetImplemented(): void {
    // this.swal.fire('Feature you are expecting is not yet implemented...');
  }

}
