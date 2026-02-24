import styles from './page.module.css';
import PreOnboardingForm from './PreOnboardingForm';
import Image from 'next/image';

export const metadata = {
  title: 'Client Pre-Onboarding | VentureMond',
  description: 'VentureMond client pre-onboarding form',
};

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.card}>
        <div className={styles.logoContainer}>
          <Image
            src="/logo.png"
            alt="VentureMond Logo"
            width={240}
            height={60}
            className={styles.logoImage}
            priority
          />
        </div>

        <h2 className={styles.cardTitle}>Client Pre Onboarding</h2>
        <p className={styles.cardSubtitle}>
          Welcome! Please fill out the form below to get started.
        </p>

        <PreOnboardingForm />
      </main>
    </div>
  );
}
