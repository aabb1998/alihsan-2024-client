import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PageHead from "../../components/PageHead";

export const PrivacyPolicyComponent = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <PageHead title={'All projects'}/>
      <div className="pb-7.5 sm:py-15">
        <section aria-label="Privacy Policy">
          <div className="mb-5 md:mb-10 banner-container">
            <div className="h-[160px] mb-5 overflow-hidden sm:h-64 md:h-[368px] md:mb-10 rounded-none sm:rounded-2xl md:rounded-4xl">
              <img
                src="/images/banner/privacy-policy.jpg"
                alt=""
                className="object-cover w-full h-full transition duration-500 hover:scale-110"
              />
            </div>
          </div>
          <div className="container">
            <h1 className="mb-3 md:mb-5 text-heading-6 md:text-heading-3 text-neutral-1000">
              Privacy Policy
            </h1>
            <p className="mb-8 text-sm font-medium md:mb-15 md:text-lg text-neutral-800">
              Al-Ihsan Foundation International Limited has always been
              committed to protecting your privacy. All information provided to
              us will remain confidential and protected in accordance to
              legislation. Personal information will be used as outlined below.
            </p>
            <h2 className="mb-3 md:mb-4 text-heading-6 md:text-heading-3 text-neutral-1000">
              What Information Do We Collect?
            </h2>
            <div className="mb-8 text-sm font-medium md:text-lg md:mb-15 text-neutral-800">
              <p>
                Al-Ihsan Foundation International Limited asks for information
                required for the stated purpose on our website and social
                medical platforms for the administration of that donation or
                subscription which you have nominated.
              </p>
              <p>
                Mandatory general information fields include full name, contact
                number Email Address and donation amount. Subscriptions would
                also ask and require the same standard personal information.We
                collect and store your bank account details strictly for the
                purpose of direct debit donations or donations via electronic
                fund transfers (EFT). Any other informationyou provide is by
                your discretion.Al -Ihsan Foundation International Limited does
                not store your card details. Card details are safeguarded by a
                secure connection with an encryption system and are not revealed
                for your protection. For the purpose of sponsoring an orphan we
                will require your information to conduct a National Police Check
                and a Working with Children Check. 
              </p>
            </div>

            <h2 className="mb-3 md:mb-4 text-heading-6 md:text-heading-3 text-neutral-1000">
              App & Third Party
            </h2>
            <p className="mb-8 text-sm font-medium md:text-lg text-neutral-800">
              This Privacy Policy explains how we collect, use, and disclose
              information about you when you use our mobile application (the
              “App”).
            </p>
            <h3 className="mb-2 md:mb-4 text-heading-7 md:text-heading-6 text-neutral-800">
              Information We Collect
            </h3>
            <p className="mb-6 text-sm font-medium md:text-lg text-neutral-800">
              We collect the information you provide directly to us when you use
              the App, such as your name, Email Address, and other contact
              information.In addition, we use Facebook and Google services to
              collect information about you. This includes:
            </p>
            <h4 className="mb-2 text-heading-7 md:text-heading-6 text-neutral-800">
              Facebook Login
            </h4>
            <p className="mb-6 text-sm font-medium md:text-lg text-neutral-800">
              If you choose to log in to our App using your Facebook account, we
              collect your public profile information, such as your name,
              profile picture, and Email Address.
            </p>
            <h4 className="mb-2 md:mb-4 text-heading-7 text-neutral-800">
              Facebook Analytics
            </h4>
            <p className="mb-6 text-sm font-medium md:text-lg text-neutral-800">
              We use Facebook Analytics to track how users interact with our
              App. This includes information about how long you use the App,
              which features you use, and how often you use them.
            </p>
            <h4 className="mb-2 md:mb-4 text-heading-7 md:text-heading-6 text-neutral-800">
              Google Analytics
            </h4>
            <p className="mb-6 text-sm font-medium md:text-lg text-neutral-800">
              We use Google Analytics to track the usage of our App. This
              includes information about how long you use the App, which
              features you use, and how often you use them. Our analytics
              process involves gathering application metrics such as crash
              reports and performance reports. It’s important to note that this
              information is completely anonymous and not associated with any
              particular user.
            </p>
            <h4 className="mb-2 md:mb-4 text-heading-7 md:text-heading-6 text-neutral-800">
              How We Use Your Information
            </h4>
            <p className="mb-2 text-sm font-medium md:mb-4 md:text-lg text-neutral-800">
              We use the information we collect to provide and improve the App,
              and to communicate with you about the App. We may also use the
              information we collect to:
            </p>
            <ul className="ml-4 list-disc text-button-md md:text-heading-7 text-neutral-700">
              <li>Personalize your experience with the App</li>
              <li>
                Send you promotional messages and other marketing communications
              </li>
              <li>Improve our products and services</li>
            </ul>
            <p className="mt-2 mb-6 text-sm font-medium md:text-lg text-neutral-800">
              We may share your information with our partners, including
              Facebook and Google, for the purposes described in this Privacy
              Policy.
            </p>
            <h4 className="mb-2 md:mb-4 text-heading-7 md:text-heading-6 text-neutral-800">
              Your Choices
            </h4>
            <p className="mb-6 text-sm font-medium md:text-lg text-neutral-800">
              You can choose not to provide us with certain information, but
              this may limit your ability to use certain features of the App. If
              you don’t want us to collect information from Facebook or Google,
              you can opt out of these services by adjusting your settings on
              their respective websites.
            </p>
            <h4 className="mb-2 text-heading-7 md:text-heading-6 md:mb-4 text-neutral-800">
              Data Deletion
            </h4>
            <p className="mb-6 text-sm font-medium md:text-lg text-neutral-800">
              You can request your data to be deleted by going to the following
              link.
            </p>
            <h4 className="mb-2 md:mb-4 text-heading-7 md:text-heading-6 text-neutral-800">
              Security
            </h4>
            <p className="mb-6 text-sm font-medium md:text-lg text-neutral-800">
              We take reasonable measures to protect your information from
              unauthorized access, use, or disclosure. However, no method of
              transmission over the internet or electronic storage is 100%
              secure, so we cannot guarantee its absolute security.
            </p>
            <h4 className="mb-2 md:mb-4 text-heading-7 md:text-heading-6 text-neutral-800">
              Changes To This Policy
            </h4>
            <p className="mb-6 text-sm font-medium md:mb-15 md:text-lg text-neutral-800">
              We may update this Privacy Policy from time to time. If we make
              significant changes to the policy, we will notify you by email or
              by posting a notice in the App.
            </p>
            <h3 className="mb-2 md:mb-4 text-heading-6 md:text-heading-3 text-neutral-800">
              How We Collect Your Information
            </h3>
            <p className="mb-4 text-sm font-medium md:text-lg text-neutral-800">
              Al-Ihsan Foundation International Limited needs your information
              in order to keep providing you with services, assistance and
              communications, and in order to achieve this, we need to collect
              information from you. Information requested and provided to us
              will be by means of:
            </p>
            <ul className="ml-4 list-disc text-button-md md:text-heading-7 text-neutral-700">
              <li>Phone call enquiries or donations</li>
              <li>Attending our office</li>
              <li>Contacting us through our website or social media</li>
              <li>Submitting an online donation form</li>
              <li>Fundraising events</li>
              <li>Making a pledge</li>
              <li>Subscriptions and authorizations</li>
              <li>
                Donation information submitted at an Al-Ihsan Foundation
                International Limited stall
              </li>
            </ul>
            <h3 className="mt-8 mb-2 md:mb-4 md:text-heading-3 text-heading-6 text-neutral-800">
              Why We Ask For Information
            </h3>
            <p className="mb-4 text-sm font-medium md:text-lg text-neutral-800">
              Al-Ihsan Foundation International Limited prefers to keep regular
              contact with its donors, build trust and relationships with donors
              and sponsors. Any information provided by you will also assist
              Al-Ihsan Foundation International Limited with maintaining and
              improving our relationship and communications with you, and to
              further develop our programs and campaigns.  If you give us your
              Email Address, or other personal information by subscribing to one
              of our mailing lists, or registering for information, it will be
              used to send you information only on the subject area you have
              chosen. For your privacy, we will not subscribe you to additional
              lists, nor give your address to any third party, without your
              approval. We may note your communications with us for training
              purposes or dispute resolution or to assist you in the most
              effective way. Information requested and provided is strictly for
              the purpose of assisting us with:
            </p>
            <ul className="ml-4 list-disc text-button-md md:text-heading-7 text-neutral-700">
              <li>Verifying your identity</li>
              <li>Updating your details</li>
              <li>
                Processing donations, sponsorships, pledges, subscriptions and
                fundraising
              </li>
              <li>
                Ensuring any donations and sponsorships are delivered in
                accordance to your nominations (if applicable) and our campaign
                procedures and policies
              </li>
              <li>Communications with sponsored persons.</li>
              <li>Any enquiries or contacting us</li>
              <li>Issuing receipts, statements and certificates</li>
              <li>National Police Check and Working with Children Check</li>
              <li>Maintaining accurate details of our supporters’ history</li>
              <li>Keeping our supporters informed and updated of our work</li>
              <li>
                Assist in the development of our marketing and promotional
                activities
              </li>
            </ul>
            <p className="mt-4 mb-8 text-sm font-medium md:text-lg text-neutral-800">
              You may at any time request to have your information preferences
              changed.
            </p>
            <h3 className="mb-3 md:mb-4 text-heading-6 md:text-heading-3 text-neutral-800">
              Using And Disclosing Your Personal Information Cross-Border
            </h3>
            <div className="mb-4 text-sm font-medium md:text-lg text-neutral-800">
              <p>
                Al-Ihsan Foundation International Limited has many programs,
                campaigns, partners and offices internationally. This correlates
                with our campaigns, donations and sponsorships. We shall firstly
                explain the process of service and obtain your written consent
                prior to any personal information required to be provided to an
                overseas recipient for the purpose of providing the service you
                have nominated. We may share part of your information with
                Al-Ihsan Foundation International Limited’s global offices and
                affiliates. Your name, nominated name of donor, you contact
                number (in some programs) and possibly your Email Address will
                be provided to the office managers or service providers in the
                country where you have donated, paid for a construction of a
                shallow water well / deep water well, paid for a construction of
                a Masjid, or where your sponsored orphan lives so that they can
                write to you.{" "}
              </p>
              <p>
                This information is sent to and accessed only by the manager or
                service provider of Al-Ihsan Foundation International Limited in
                the relevant country. This does not alter or affect our
                commitment to safeguarding your privacy. Al-Ihsan Foundation
                International Limited has to abide by legislation, policies and
                procedures, of which are provided to overseas affiliates and
                external service providers to be adequate in safeguarding your
                personal information. Our external service providers are
                required to handle your personal information lawfully,
                carefully, and in accordance with our policies. The countries
                and territories in which we use, disclose and/or store supporter
                data are:
              </p>
            </div>

            <ul className="ml-4 list-disc text-button-md md:text-heading-7 text-neutral-700">
              <li>Malaysia</li>
              <li>Indonesia</li>
              <li>Lebanon</li>
              <li>Niger</li>
              <li>Ethiopia</li>
              <li>Turkey</li>
              <li>Sri Lanka</li>
            </ul>
            <h3 className="mt-8 mb-3 md:mb-4 text-heading-6 md:text-heading-3 text-neutral-800">
              Information Safety
            </h3>
            <div className="mb-8 text-sm font-medium md:text-lg text-neutral-800">
              <p>
                In some areas of the website, links to other sites such as
                sponsors can be found. These sites are not controlled by
                Al-Ihsan Foundation and therefore we cannot take responsibility
                for their content, claims of offer or privacy practices. Our
                website has enabled secure response forms to keep your personal
                and payment card details safe.  Your browser shall advise you
                whether the information you are sending is encrypted or not
                secure by notifying you of a safety certificate for the website.
                Payment options for our online donations include PayPal, Stripe,
                Google Pay or Apple Pay.{" "}
              </p>
              <p>
                The information you supply will be linked to our website by your
                third-party payment option. However, no data from your
                third-party payment site will be stored on our website, and your
                card Payment Details are not revealed or stored on our
                website. Staff at Al-Ihsan Foundation International Limited are
                obliged and expected to keep personal and payment card
                information confidential and secure. Please note that whilst we
                endeavour to protect your privacy through legislation and
                policies, no data provided over the Internet can come with a
                guarantee to risk free or totally secure and therefore we cannot
                warrant the security of information you provide online to
                Al-Ihsan Foundation International Limited.
              </p>
            </div>

            <h3 className="mt-8 mb-3 md:mb-4 text-heading-6 md:text-heading-3 text-neutral-800">
              Protection Of Young People
            </h3>
            <p className="mb-8 text-sm font-medium md:text-lg text-neutral-800">
              Al-Ihsan Foundation International Limited is very keen and
              diligent in safeguarding young people. Generally, if you are 18 or
              over, we will usually assume that you can make your own privacy
              decisions. However, if you are under 18, or do not have the mental
              capacity fit for making your own decisions, we shall confirm your
              decision with a parent or legal guardian. We also expect you be
              cautious of and be delicate with the images of children from our
              website and other social media. Please respect and uphold the
              trust of the consent given by parents, guardians or community
              leaders by not copying, sharing or misusing these images. Please
              refer to our online Safeguarding Policy.
            </p>
            <h3 className="mb-3 md:mb-4 md:text-heading-3 text-heading-6 text-neutral-800">
              Policies & Legal Obligations
            </h3>
            <p className="mb-8 text-sm font-medium md:text-lg text-neutral-800">
              In viewing our website and social media or in participating in any
              donations or any programs associated with Al-Ihsan Foundation
              International Limited you have agreed to our Safeguarding Policy,
              Privacy Policy and Data Deletion Policy. Any policies which are
              published on our website are subject to change from time to time
              without notice. Al-Ihsan Foundation International Limited has, in
              the clause, provided you with sufficient notice of variation, and
              that you have accepted these terms. You understand that by giving
              us consent to disclose your information overseas, you may not be
              able to apply for reparation in the overseas jurisdiction if the
              overseas recipient handles information in breach of the Australian
              Privacy Principles and against our policies. This consent does not
              reduce our responsibilities and obligation to safeguard your
              privacy but it may waive our legal liability for any breaches of
              the Australian Privacy Principles by such overseas recipient.
              Whilst we have legislation, policies and procedures to safeguard
              your personal information, we cannot exclude disclosing your
              information only if and when served with a Court Order.
            </p>
            <h3 className="mb-3 text-heading-6 md:mb-4 md:text-heading-3 text-neutral-800">
              Data Deletion Policy
            </h3>
            <p className="mb-8 text-sm font-medium md:text-lg text-neutral-800">
              Al-Ihsan Foundation International Limited believes in respecting
              your right to remove your information from our online database.
              You have the option and may remove your information by submitting
              your details into our Data Deletion Policy request and your
              acceptance to the policies. You shall receive a confirmation of
              your identity email from Al-Ihsan Foundation International Limited
              to confirm your option to delete your online data.
            </p>
            <h3 className="mb-3 text-heading-6 md:mb-4 md:text-heading-3 text-neutral-800">
              Giving You Control
            </h3>
            <p className="mb-4 text-sm font-medium md:text-lg text-neutral-800">
              Al-Ihsan Foundation International Limited will provide you with
              the flexibility of viewing and accessing your partial information
              through your login on our website or Apple/ Android application.
              If you would like to know what information we hold about you or if
              you wish to correct or amend any personal information, please
              address our Complaints Officer at Al-Ihsan Foundation
              International Limited who will address your concerns promptly and
              rectify your concerns. When contacting us, please include the
              following information
            </p>

            <ul className="ml-4 list-disc text-button-md md:text-heading-7 text-neutral-700">
              <li>Full Name, Telephone Number, Address and Email Address</li>
            </ul>

            <p className="my-4 text-sm font-medium md:text-lg text-neutral-800">
              Al-Ihsan Foundation International Limited can be contacted by:
            </p>
            <ul className="text-sm md:text-lg text-neutral-800">
              <li>
                <Link to="tel:+61 (02) 8766 0214">
                  {" "}
                  Phone: +61 (02) 8766 0214
                </Link>
              </li>
              <li>
                <Link to="mailto:adannoun@alihsan.org.au">
                  Email: adannoun@alihsan.org.au
                </Link>
              </li>
              <li>
                <div className="text-sm md:text-lg text-neutral-800">
                  <p> Mail us at:</p>
                  <p>Al-Ihsan Foundation International Limited</p>
                  <p>PO Box 791</p>
                  <p>Chester Hill NSW 2162</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};
