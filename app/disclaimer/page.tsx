import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Disclaimer</h1>
        <p className="text-blue-600 font-medium mb-8">All Yono Games</p>

        <div className="space-y-6">

          {/* Welcome */}
          <Section title="Welcome to AllYonoGames">
            <p>
              This extensive disclaimer applies to all users of the AllYonoGames website and the wide array of applications ("Apps") available on it. Our platform includes diverse apps such as Poker, Rummy, Ludo, fantasy sports, investment apps, and trading apps. By accessing AllYonoGames, you acknowledge and agree to the terms outlined in this disclaimer.
            </p>
          </Section>

          {/* Scope */}
          <Section title="Understanding the Scope of Our Platform">
            <p>
              AllYonoGames serves as a digital distribution platform for various third-party applications. Our role is limited to providing access to these apps. We do not develop, modify, or have any control over the content and functionality of these apps.
            </p>
          </Section>

          {/* Financial Risk */}
          <Section title="User Responsibility and Financial Risk">
            <ul className="space-y-3">
              <Li title="Risk of Financial Activities">
                The Apps, particularly those involving financial transactions like betting games or investment platforms, may carry inherent risks including the potential for significant financial loss. You are solely responsible for any financial outcomes resulting from your use of these Apps.
              </Li>
              <Li title="Informed Decision-Making">
                We strongly encourage you to thoroughly research and understand each App, especially those involving financial risks, before participation. This includes seeking advice from financial experts or professionals as needed.
              </Li>
              <Li title="No Endorsement of Financial Strategies">
                Our platform does not endorse any specific financial strategies, nor do we guarantee their success. Decisions made based on any App&apos;s content are solely your responsibility.
              </Li>
            </ul>
          </Section>

          {/* Age */}
          <Section title="Legal Age and Compliance">
            <ul className="space-y-3">
              <Li title="Age Restrictions">
                Some Apps, particularly those involving gambling or financial investments, are designed for use by individuals above a certain age (usually 18 or 21 years). You must comply with these age restrictions.
              </Li>
              <Li title="Compliance with Local Laws">
                It is your responsibility to ensure that the use of any App complies with local laws and regulations. This includes understanding legal constraints related to gambling, investments, and other financial activities.
              </Li>
            </ul>
          </Section>

          {/* Critical Review */}
          <Section title="Critical Review of App-Specific Terms">
            <ul className="space-y-3">
              <Li title="User Due Diligence">
                Before signing up, registering, or engaging with any App on our platform, it is crucial that you thoroughly review and understand that App&apos;s specific Terms and Conditions, disclaimers, and privacy policies.
              </Li>
              <Li title="No Responsibility for Discrepancies">
                We are not responsible for any discrepancies or misunderstandings resulting from the App&apos;s terms, conditions, or policies.
              </Li>
            </ul>
          </Section>

          {/* No Liability */}
          <Section title="No Liability for Losses">
            <p>
              AllYonoGames shall not be liable for any direct, indirect, incidental, consequential, or punitive damages, including financial losses, resulting from the use or inability to use any App listed on our website. Your engagement with these Apps is entirely at your own risk and discretion.
            </p>
          </Section>

          {/* Addiction */}
          <Section title="Awareness of Addiction Risks">
            <ul className="space-y-3">
              <Li title="Risk of Addiction">
                Certain apps, especially games and those involving gambling or trading, can be addictive. We encourage responsible use of these apps and awareness of the potential for addictive behavior.
              </Li>
              <Li title="Seeking Help">
                If you or someone you know is struggling with addiction related to these apps, we advise seeking professional help.
              </Li>
            </ul>
          </Section>

          {/* Additional */}
          <Section title="Additional Disclaimers">
            <ul className="space-y-3">
              <Li title="Variability in App Functionality">
                The functionality and content of the Apps may change over time, and we do not guarantee their consistency or availability.
              </Li>
              <Li title="Non-Endorsement of App Content">
                Display of an App on our platform does not constitute an endorsement of its content or functionality.
              </Li>
              <Li title="No Financial or Legal Advice">
                AllYonoGames does not provide financial, legal, or investment advice. Any information obtained from our platform should not be treated as professional advice.
              </Li>
            </ul>
          </Section>

          {/* Changes */}
          <Section title="Changes and Amendments">
            <p>
              We reserve the right to modify this disclaimer at any time. Such changes will be effective immediately upon posting on our website. It is your responsibility to regularly review this disclaimer.
            </p>
          </Section>

          {/* Rummy */}
          <CategoryDisclaimer title="Disclaimer for Rummy Apps on AllYonoGames">
            <strong>General Notice:</strong> This is a brief and partial disclaimer. For full details, refer to the specific Rummy app&apos;s own disclaimer. Rummy games are intended for users aged 18+ and involve elements of skill and chance. Play at your own risk and ensure compliance with local gambling laws. Adding money to these games is done at the user&apos;s own risk.
          </CategoryDisclaimer>

          {/* Ludo */}
          <CategoryDisclaimer title="Disclaimer for Ludo Apps on AllYonoGames">
            <strong>General Notice:</strong> This disclaimer is concise and may not cover all aspects. Review the full disclaimer in the specific Ludo app. Ludo apps are for entertainment and suitable for users 18+. Play responsibly and at your own risk. Any financial transactions within the app are the responsibility of the user.
          </CategoryDisclaimer>

          {/* Investment */}
          <CategoryDisclaimer title="Disclaimer for Investment Apps on AllYonoGames">
            <strong>General Notice:</strong> This disclaimer is partial. For complete information, review the specific investment app&apos;s disclaimer. Investment apps are for users aged 18+ and involve financial risks, including potential loss of capital. Decisions should be made based on personal financial situations. Any investments are made at the user&apos;s own risk.
          </CategoryDisclaimer>

          {/* Fantasy */}
          <CategoryDisclaimer title="Disclaimer for Fantasy Sports Apps on AllYonoGames">
            <strong>General Notice:</strong> This is a summarized disclaimer. Refer to the full disclaimer in each Fantasy Sports app for comprehensive details. These apps are intended for users aged 18+ and involve an element of financial risk. There is no guarantee of winning, and losses incurred are the user&apos;s responsibility. Play and engage in financial transactions at your own risk.
          </CategoryDisclaimer>

          {/* Earning */}
          <CategoryDisclaimer title="Disclaimer for Other Earning Apps on AllYonoGames">
            <strong>General Notice:</strong> This is an abbreviated disclaimer. Consult the full disclaimer in each earning app for more details. These apps are suitable for users aged 18+ and may offer potential income opportunities with no guaranteed earnings. Any financial involvement or transactions within these apps are entirely at the user&apos;s risk.
          </CategoryDisclaimer>

          {/* Third-Party */}
          <Section title="General Disclaimer for Third-Party Apps on AllYonoGames">
            <div className="space-y-4">
              <p>
                <strong>Notice of Non-Affiliation and Disclaimer:</strong> AllYonoGames does not operate, control, or manage any of the applications (Apps) listed on our platform, including Rummy, Ludo, Fantasy Sports, Investment Apps, Trading Apps, and other earning apps. These Apps are developed, owned, and operated by independent third parties.
              </p>
              <p>
                <strong>Third-Party Apps:</strong> Each App available through AllYonoGames is the sole responsibility of the respective third-party developers or companies. AllYonoGames acts as a platform to provide access to these Apps but is not involved in their operation or management.
              </p>
              <p>
                <strong>User Discretion and Responsibility:</strong> Users are advised that any interaction, financial transaction, or participation in activities within these Apps is conducted at their own risk. AllYonoGames does not endorse or assume responsibility for the functionality, content, or any aspect of these third-party Apps.
              </p>
              <p>
                <strong>Age Restriction and Risk Acknowledgment:</strong> The Apps listed on our platform are intended for users aged 18+ and may involve various levels of risk, including financial risk. Users should play, invest, or engage in these Apps at their own discretion and risk.
              </p>
              <p>
                <strong>Independent App Disclaimers:</strong> We strongly recommend that users review and understand the full disclaimer, terms and conditions, and privacy policy of each App they intend to use. The brief disclaimers provided here on AllYonoGames are not exhaustive and may not encapsulate all the terms of use and risks associated with each App.
              </p>
              <p>
                <strong>No Liability:</strong> AllYonoGames assumes no liability for any losses, damages, or issues arising from the use of these third-party Apps. Our role is limited to providing a platform for accessing these Apps, and we are not responsible for their operation, content, or any outcomes from their use.
              </p>
              <p>
                <strong>Notice of Regional Legal Restrictions:</strong> Users are hereby informed that certain applications (Apps) available on AllYonoGames, such as Rummy, Poker, and Fantasy Sports, may be subject to legal restrictions in certain states within India.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-2">
                <p className="text-blue-800 text-sm">
                  By using AllYonoGames, users acknowledge and agree to this general disclaimer, affirming their understanding that the Apps are managed by respective third-party entities and that all interactions with these Apps are at their own risk and responsibility.
                </p>
              </div>
            </div>
          </Section>

        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6">
      <h2 className="text-slate-800 font-bold text-lg mb-3 pb-2 border-b border-blue-50">{title}</h2>
      <div className="text-slate-600 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function CategoryDisclaimer({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
      <h2 className="text-amber-800 font-bold text-base mb-2">{title}</h2>
      <p className="text-slate-600 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function Li({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
      <span>
        <strong className="text-slate-700">{title}:</strong>{" "}
        {children}
      </span>
    </li>
  );
}
