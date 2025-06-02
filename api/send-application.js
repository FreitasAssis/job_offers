import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const {
        to_email,
        from_name,
        from_email,
        job_title,
        company,
        message,
        curriculum,
        curriculum_name,
        curriculum_type
    } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        auth: {
            user: process.env.BREVO_SMTP_USER,
            pass: process.env.BREVO_SMTP_PASS,
        },
    });

    const mailOptions = {
        from: `"Portal de Vagas" <${process.env.BREVO_SMTP_USER}>`,
        replyTo: from_email,
        to: to_email,
        subject: `Nova Candidatura: ${job_title}`,
        text: `
            Nova Candidatura: ${job_title}

            Empresa: ${company}
            Nome do Candidato: ${from_name}
            Email do Candidato: ${from_email}
            
            Mensagem:
            ${message}
            
            Para responder diretamente ao candidato, utilize o email: ${from_email}
        `,
        attachments: curriculum
            ? [
                {
                    filename: curriculum_name,
                    content: Buffer.from(curriculum.split(',')[1], 'base64'),
                    contentType: curriculum_type,
                },
            ]
            : [],
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Candidatura enviada com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}