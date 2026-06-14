export class CustomerNotifier {

    // Encapsula el canal de notificacion para que el modulo de productos no lo implemente.
    notifyCustomer(email: string, message: string) {
        console.log(`[Mailer] Enviando correo a ${email}: ${message}`);
    }

}
