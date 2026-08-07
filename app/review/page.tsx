import { redirect } from 'next/navigation';

/**
 * /review is no longer a standalone page.
 * Review verification now happens automatically inside LandingScreen
 * when the user returns from Google Maps.
 * Any direct navigation here is redirected back to the root.
 */
export default function ReviewPage() {
  redirect('/');
}
