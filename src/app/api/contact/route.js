import supabase from "@/lib/supabase";
import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request){
    try{
        const body = await request.json()
        const {name, phone, email, service, message} = body

        if(!name || !phone || !email){
            return Response.json(
                {error: 'Câmpurile obligatorii lipsesc.'},
                {status: 400}
            )
        }
        
        const {error: dbError} = await supabaseAdmin
            .from('leads')
            .insert([{name, phone, email, service, message}])

        if(dbError){
            console.error('Supabase error:', dbError)
            return Response.json(
                {error: 'Eroare la salvarea datelor.'},
                {status: 500}
            )
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return Response.json(
                {error: 'Email-ul nu este valid.'},
                {status: 500}
            )
        }

        await resend.emails.send({
            from: 'Biroul Contabil <onboarding@resend.dev>',
            to: process.env.CONTACT_EMAIL,
            subject: `Cerere nouă de la ${name}`,
            html:`        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="font-size: 24px; color: #1A1A18; margin-bottom: 24px;">
            Cerere nouă de ofertă
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDEA; color: #6A6A64; font-size: 13px; width: 120px;">Nume</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDEA; color: #1A1A18; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDEA; color: #6A6A64; font-size: 13px;">Telefon</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDEA; color: #1A1A18; font-size: 15px;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDEA; color: #6A6A64; font-size: 13px;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDEA; color: #1A1A18; font-size: 15px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDEA; color: #6A6A64; font-size: 13px;">Serviciu</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDEDEA; color: #1A1A18; font-size: 15px;">${service || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #6A6A64; font-size: 13px; vertical-align: top;">Mesaj</td>
              <td style="padding: 12px 0; color: #1A1A18; font-size: 15px;">${message || '—'}</td>
            </tr>
          </table>
          <div style="margin-top: 32px; padding: 16px; background: #F8F8F6; border-left: 3px solid #C8A96E;">
            <p style="margin: 0; font-size: 13px; color: #6A6A64;">
              Mesaj primit pe ${new Date().toLocaleDateString('ro-RO', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>`,
        })

        return Response.json(
            {success: true, message:'Mesaj trimis cu succes.'},
            {status: 200}
        )
    }
    catch(error){
        console.error('API error:', error)
        return Response.json(
            {error: 'Eroare internă de server.'},
            {status: 500}
        )
    }
} 