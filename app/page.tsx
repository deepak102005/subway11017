import LandingScreen from '@/components/LandingScreen';

/**
 * Root route — always renders the Landing Page.
 * Navigation to /scratch or /reward is handled inside LandingScreen
 * based on persisted state, preventing any blank or "Untitled" page.
 */
export default function Home() {
  return <LandingScreen />;
}
