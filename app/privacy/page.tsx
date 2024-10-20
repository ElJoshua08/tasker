import { Separator } from '@/components/ui/separator';
import { ReactNode } from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex grow w-full flex-col items-start justify-start p-4">
      <h1 className="text-3xl font-bold">Tasker Privacy Policy</h1>
      <p className="text-base text-foreground/75">Last Updated: 20/10/2024</p>
      <Separator className="my-4" />
      <div className="flex flex-col items-start justify-start gap-4">
        <PolicyItem title="1. Introduction">
          At Tasker, we value your privacy and are committed to protecting your
          personal data. This Privacy Policy explains how we collect, use, and
          share your information when you use our platform.
        </PolicyItem>
        <PolicyItem title="2. Information We Collect">
          We may collect the following types of information: Personal
          identification information (name, email address). Technical data (IP
          address, browser type, device information). Usage data (interaction
          with the app, cookies, and usage analytics).
        </PolicyItem>
        <PolicyItem title="3. Use of Information">
          We use the information we collect to: Improve the functionality of our
          platform. Personalize your experience. Send relevant notifications or
          updates about our services.
        </PolicyItem>
        <PolicyItem title="4. Sharing of Information">
          We do not sell or share your personal information with third parties,
          except trusted service providers that help improve our platform (such
          as analytics providers).
        </PolicyItem>
        <PolicyItem title="5. Cookies">
          We use cookies to enhance your experience on the website. You may
          disable cookies through your browser settings, but this could affect
          the performance of certain features.
        </PolicyItem>
        <PolicyItem title="6. User Rights">
          As a resident of Spain, you have the right to access, correct, or
          delete your personal data under the General Data Protection Regulation
          (GDPR). To exercise these rights, please contact us at:{' '}
          <a
            className="hover:text-foreground transition-colors duration-100"
            href="mailto:taskerspacecontact@gmail.com"
          >
            taskerspacecontact@gmail.com
          </a>
        </PolicyItem>
        <PolicyItem title="7. Data Security">
          We implement reasonable measures to protect your personal information,
          including encryption and secure servers hosted on Vercel.
        </PolicyItem>
        <PolicyItem title="8. Data Retention">
          We retain your personal data only for as long as necessary for the
          purposes outlined in this policy, or as required by law.
        </PolicyItem>
        <PolicyItem title="9. Third-Party Links">
          Our platform may contain links to third-party websites. We are not
          responsible for the privacy practices of these external sites.
        </PolicyItem>
        <PolicyItem title="10. Changes to the Privacy Policy">
          {` We reserve the right to update this Privacy Policy at any time.
          Changes will be posted on this page, with an updated "Last Updated"
          date.`}
        </PolicyItem>
        <PolicyItem
          title="11. Contact Information"
          noSeparator
        >
          For any questions or requests regarding this policy, please contact us
          at:{' '}
          <a
            className="hover:text-foreground transition-colors duration-100"
            href="mailto:taskerspacecontact@gmail.com" target='_top'
          >
            taskerspacecontact@gmail.com
          </a>
        </PolicyItem>
      </div>
    </div>
  );
}

const PolicyItem = ({
  title,
  children,
  noSeparator,
}: {
  title: string;
  children: ReactNode;
  noSeparator?: boolean;
}) => {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <h2 className="text-2xl w-full font-semibold">{title}</h2>
      <p className="text-balance text-base text-foreground/80">{children}</p>
      {!noSeparator && <Separator className="my-4" />}
    </div>
  );
};
