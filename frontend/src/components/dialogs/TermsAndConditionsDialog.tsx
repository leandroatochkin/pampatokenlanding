import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material'

interface DialogProps{
    open: boolean
    close: ()=> void
}

const TermsAndConditionsDialog: React.FC<DialogProps> = ({open, close}) => {
  return (
    <Dialog
    open={open}
    onClose={close}
    aria-label="Diálogo de términos y condiciones"
    >
        <DialogTitle
        sx={{
            fontWeight: 'bold'
        }}
        >
            Términos y condiciones
        </DialogTitle>
        <DialogContent
        sx={{
            scrollbarWidth: 'none'
        }}
        >
            <Typography>
  <strong>TÉRMINOS Y CONDICIONES</strong><br />
  Fideicomiso Agropecuario Tokenizado<br />
  Última actualización: 28/05/2025<br /><br />

  <strong>1. ACEPTACIÓN DE LOS TÉRMINOS</strong><br />
  Al acceder, registrarse o invertir a través de nuestra plataforma, usted acepta quedar legalmente vinculado por estos Términos y Condiciones. Si no está de acuerdo, no debe utilizar nuestros servicios.<br /><br />

  <strong>2. DEFINICIONES</strong><br />
  <strong>Fideicomiso Agropecuario:</strong> Instrumento jurídico mediante el cual un fiduciario administra fondos e inversiones con destino a la producción agropecuaria.<br />
  <strong>Token:</strong> Representación digital de un derecho económico vinculado a la producción y/o rentabilidad del fideicomiso.<br />
  <strong>Inversionista:</strong> Persona humana o jurídica que adquiere tokens emitidos por el fideicomiso.<br />
  <strong>Plataforma:</strong> Sitio web o aplicación donde se realiza la oferta, adquisición y gestión de los tokens.<br />
  <strong>Fiduciario / Administrador:</strong> WORLDWIDE BLOCKCHAIN CONSULTING S. A., CUIT Nº 30-71794490-5, con domicilio en Vuelta de Obligado 2368, Piso 3, Dpto 7, C.P. 1428, Ciudad Autónoma de Buenos Aires.<br /><br />

  <strong>3. OBJETO DEL FIDEICOMISO</strong><br />
  El fideicomiso tiene como objeto financiar actividades agropecuarias (cultivo, cosecha, comercialización, etc.) mediante la captación de fondos a través de la emisión de tokens representativos de una porción de la producción esperada o de los ingresos generados.<br /><br />

  <strong>4. NATURALEZA DEL TOKEN</strong><br />
  Cada token representa una fracción de participación en los resultados económicos del fideicomiso, de acuerdo con los términos específicos de la emisión.<br />
  <strong>Importante:</strong> Los tokens no representan acciones, deuda, ni propiedad sobre bienes del fideicomiso. La tenencia de tokens otorga únicamente derechos económicos según lo estipulado en el contrato fiduciario.<br /><br />

  <strong>5. RIESGOS DE INVERSIÓN</strong><br />
  El Inversionista reconoce y acepta que:<br />
  - Las inversiones agropecuarias están sujetas a riesgos climáticos, de mercado, sanitarios y regulatorios.<br />
  - Los retornos pueden variar y no están garantizados.<br />
  - La tokenización no elimina los riesgos inherentes al negocio agropecuario.<br />
  - Existen riesgos tecnológicos asociados al uso de plataformas digitales y a la custodia de tokens.<br /><br />

  <strong>6. PROCESO DE INVERSIÓN</strong><br />
  Para adquirir tokens, el Inversionista debe:<br />
  1. Crear una cuenta en la plataforma.<br />
  2. Aceptar estos Términos y Condiciones.<br />
  3. Completar los procesos de verificación (KYC/AML).<br />
  4. Transferir fondos según las condiciones de la oferta.<br />
  5. Recibir los tokens acreditados en su billetera digital.<br /><br />

  <strong>7. DISTRIBUCIÓN DE BENEFICIOS</strong><br />
  Los beneficios generados serán distribuidos proporcionalmente entre los tenedores de tokens conforme a los términos del fideicomiso. Las fechas, forma y condiciones de pago serán especificadas en cada oferta.<br /><br />

  <strong>8. RESPONSABILIDADES DEL INVERSOR</strong><br />
  - Conservar adecuadamente sus credenciales de acceso y claves privadas.<br />
  - Asegurarse de comprender la naturaleza del producto financiero.<br />
  - Consultar asesoramiento profesional antes de invertir.<br /><br />

  <strong>9. LIMITACIÓN DE RESPONSABILIDAD</strong><br />
  Ni WORLDWIDE BLOCKCHAIN CONSULTING S. A. ni la plataforma serán responsables por:<br />
  - Pérdidas derivadas de eventos climáticos, plagas, o fluctuaciones de precios.<br />
  - Interrupciones tecnológicas o hackeos que afecten la disponibilidad de la plataforma.<br />
  - Errores derivados de la custodia personal de los tokens por parte del Inversionista.<br /><br />

  <strong>10. CUMPLIMIENTO NORMATIVO</strong><br />
  El fideicomiso y la plataforma operan de acuerdo con la normativa vigente en la República Argentina, incluyendo, pero no limitándose a, leyes financieras, de protección al consumidor, y de activos digitales.<br /><br />

  <strong>11. MODIFICACIONES</strong><br />
  WORLDWIDE BLOCKCHAIN CONSULTING S. A. se reserva el derecho a modificar estos Términos y Condiciones en cualquier momento. Las modificaciones serán notificadas a través de la plataforma.<br /><br />

  <strong>12. JURISDICCIÓN Y LEY APLICABLE</strong><br />
  Estos Términos y Condiciones se regirán por las leyes de la República Argentina. Cualquier conflicto será dirimido por los tribunales ordinarios de la Ciudad Autónoma de Buenos Aires, con renuncia expresa a cualquier otro fuero.
</Typography>

        </DialogContent>

    </Dialog>
  )
}

export default TermsAndConditionsDialog