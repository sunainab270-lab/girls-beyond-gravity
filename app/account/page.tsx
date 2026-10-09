import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {PageShell} from '@/components/PageShell';
import {AccountPanel} from '@/components/AccountPanel';
import {sessionUser} from '@/lib/auth/store';
export const dynamic='force-dynamic';
export default async function AccountPage(){const token=(await cookies()).get('gbg_session')?.value||'';const user=await sessionUser(token);if(!user)redirect('/sign-in');return <PageShell><div id="content" className="auth-layout"><AccountPanel name={user.display_name} email={user.email}/></div></PageShell>;}
