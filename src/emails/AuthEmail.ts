import { transporter } from "../config/nodemailer" 

interface IEmail {
    email: string
    name: string
    token: string

}

export class AuthEmail{
    static sendConfirmationEmail = async (user: IEmail) =>{
       const info = await transporter.sendMail({
            from:'Uptask <admin@uptask.com>',
            to: user.email,
            subject:'Uptask - Confirma tu cuenta',
            text:'Uptask - Confirma tu cuenta',
            html: `<p>hola: ${user.name}, has creado tu cuenta en Uptask, ya casi esta todo listo solo debes confirmar tu cuenta</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
            <p>E ingresa el codigo: <b>${user.token}</b></p>
            <p>Este token expira en 10 minutos`

        })
        console.log('Mensaje enviado', info.messageId);
        
    }
    static sendPasswordResetToken = async (user: IEmail) =>{
       const info = await transporter.sendMail({
            from:'Uptask <admin@uptask.com>',
            to: user.email,
            subject:'Uptask - Restablece tu password',
            text:'Uptask - Restablece tu password',
            html: `<p>hola: ${user.name}, has solicitado restablecer tu password.</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/new-password">Restablecer Password</a>
            <p>E ingresa el codigo: <b>${user.token}</b></p>
            <p>Este token expira en 10 minutos`

        })
        console.log('Mensaje enviado', info.messageId);
        
    }
}