'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addClient(formData) {
  const supabase = await createClient()

  const company_name = formData.get('company_name')
  const cui = formData.get('cui')
  const contact_email = formData.get('contact_email')

  const { error } = await supabase
    .from('clients')
    .insert([{ company_name, cui, contact_email }])

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/dashboard')
  return { success: true }
}
