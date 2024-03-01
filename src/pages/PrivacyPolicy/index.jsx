import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PageHead from "../../components/PageHead";

const PrivacyPolicyComponent = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <PageHead title={"All projects"} />
      <div className="pb-7.5 sm:py-15 standard-details-page">
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

          {/* <div className="container">
            <h1 className="mb-3 md:mb-5 text-heading-6 md:text-heading-3 text-neutral-1000">
              Privacy Policy
            </h1>
            <h2 className="mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">Complaints Handling Policy</h2>
            <table class="table-auto w-full max-w-xl shadow-lg bg-white border-collapse mb-4">
              <thead>
                <tr>
                  <th class="p-2 border align-top md:align-middle font-semibold">Policy number</th>
                  <th class="p-2 border align-top md:align-middle"></th>
                  <th class="p-2 border align-top md:align-middle font-semibold">Version</th>
                  <th class="p-2 border align-top md:align-middle font-normal">1.0</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-2 border align-top md:align-middle font-semibold">Drafted by</td>
                  <td class="p-2 border align-top md:align-middle">Birchgrove Legal under instructions</td>
                  <td class="p-2 border align-top md:align-middle font-semibold">Approved by Board on</td>
                  <td class="p-2 border align-top md:align-middle"></td>
                </tr>
                <tr class="hover:bg-blue-100">
                  <td class="p-2 border align-top md:align-middle font-semibold">Responsible person</td>
                  <td class="p-2 border align-top md:align-middle">Board of directors</td>
                  <td class="p-2 border align-top md:align-middle font-semibold">Scheduled review date</td>
                  <td class="p-2 border align-top md:align-middle"></td>
                </tr>
              </tbody>
            </table>


            <ol class="p-5 pb-0">
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">1. Introduction</h2>
                  <p className="mb-2">The Board of Al-Ihsan Foundation International Limited ACN 168 960 361 (Al-Ihsan Foundation) is committed to high standards of ethical conduct and accordingly places great care of ensuring complaints and feedback are handled fairly & effectively.</p>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">2. Purpose</h2>
                  <p className="mb-2">This policy has been developed to provide a framework for:</p>

                  <ul class="p-5 m-0">
                    <li>a. strong to be handled fairly, efficiently and effectively; and</li>
                    <li>b. staff and people who wish to make a complaint on the key principles and concepts of the complaint management system; and</li>
                    <li>c. the procedures to be clear for all stakeholders.</li>
                  </ul>
                  
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">3. Definitions</h2>
                  <p className="mb-2">In this policy, unless the context requires otherwise:</p>
                  <ol class="list-item p-5 m-0">
                    <li className="mb-2">a. <strong>“Complaint”</strong> is an expression of dissatisfaction made to or about us, our services, staff or the handling of a complaint where a response or resolution is explicitly or implicitly expected or legally required. (AS/NZ 10002:2014)</li>
                    <li className="mb-2">b. <strong> “Complaint handling/management system”</strong> refers to all policies, procedures, practices, staff, hardware and software used by us in the management of complaints.</li>
                    <li className="mb-2">c. <strong>“Dispute”</strong> is an unresolved complaint escalated either within or outside of our organisation.</li>
                    <li className="mb-2">d. <strong>“Feedback”</strong> refers to opinions, comments and expressions of interest or concern, made directly or indirectly, explicitly or implicitly, to or about us, about our services or complaint handling system where a response is not explicitly or implicitly expected or legally required.</li>
                    <li className="mb-2">e. <strong>“Grievance”</strong> is a clear, formal written statement by an individual staff member about another staff member or a work-related problem.</li>
                    <li className="mb-2">f. <strong>“Policy”</strong> is a statement of instruction that sets out how we should fulfil our vision, mission and goals.</li>
                    <li className="mb-2">g. <strong>“Procedure”</strong> refers to a statement or instruction that sets out how our policies will be implemented and by whom.</li>
                  </ol>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">4. Scope</h2>
                  <p>This policy applies to the handling of feedback and complaints from program partners and people we work with and for, including staff, partners, volunteers, people we work with and for or anybody directly involved in the delivery of our programs. This policy applies to all program activities whether implemented in Australia or internationally. The policy applies equally to programs directly implemented by Al-Ihsan Foundation or those implemented through our partners.</p>
                </li>
                <li>
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">5. Policy</h2>
                  <p className="mb-2">Our complaint handling policy is modelled on the principles of fairness, accessibility, responsiveness, efficiency and integration into organisational culture. The following articulates our complaints handling policy:</p>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">5.1 People focus</h2>
                  <p className="mb-2">We are committed to seeking and receiving feedback and complaints about our services, systems, practices, procedures, products and complaint handling. Any concerns raised in feedback or complaints will be dealt with within a reasonable time frame. People making complaints will be:</p>
                  <ol class="list-item p-5 m-0">
                    <li className="mb-2">a. provided with information about our complaint handling process and how to access it; and</li>
                    <li className="mb-2">b. listened to, treated with respect by staff and actively involved in the complaint process where possible and appropriate, and</li>
                    <li className="mb-2">c. provided with reasons for our decision/s and any options for redress or review.</li>
                  </ol>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">5.2 No detriment to people making complaints</h2>
                  <p>We will take all reasonable steps to ensure that people making complaints are not adversely affected because a complaint has been made by them or on their behalf.</p>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">5.3 Anonymous complaints</h2>
                  <p>We accept anonymous complaints if there is a compelling reason to do so, or we are required to by law, and will carry out a confidential investigation of the issues raised where there is enough information provided.</p>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">5.4 Accessibility</h2>
                  <p>We will ensure that information about how and where complaints may be made to or about us is well publicised, on our website (if available). We will ensure that our systems to manage complaints are easily understood and accessible to everyone, particularly people who may require assistance. If a person prefers or needs another person or organisation to assist or represent them in the making and/ or resolution of their complaint, we will communicate with them through their representative if this is their wish. Anyone may represent a person wishing to make a complaint with their consent.</p>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">5.5 Early resolution</h2>
                  <p>Where possible, complaints will be resolved at first contact with us. When appropriate we may offer an explanation or apology to the person making the complaint.</p>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">5.6 Responsiveness</h2>
                  <p>We will promptly acknowledge receipt of complaints. We will assess and prioritise complaints in accordance with the urgency and/or seriousness of the issues raised. If a matter concerns an immediate risk to safety or security the response will be immediate and will be escalated appropriately.</p>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">5.7 Objectivity and fairness</h2>
                  <p>We will address each complaint with integrity and in an equitable, objective and unbiased manner. We will ensure that the person handling a complaint is different from any staff member whose conduct or service is being complained about. Conflicts of interest, whether actual or perceived, will be managed responsibly. In particular, internal reviews of how a complaint was managed will be conducted by a person other than the original decision maker.</p>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">5.8 Responding flexibly</h2>
                  <p>Our staff are empowered to resolve complaints promptly and with as little formality as possible. We will adopt flexible approaches to service delivery and problem solving to enhance accessibility for people making complaints and/or their representatives. We will assess each complaint on its merits and involve people making complaints and/or their representative in the process as far as possible.</p>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">5.9 Confidentiality</h2>
                  <p>We will protect the identity of people making complaints where this is practical and appropriate. Personal information that identifies individuals will only be disclosed or used by us as permitted under the relevant privacy laws, secrecy provisions and any relevant confidentiality obligations.</p>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">5.10 Complaints involving contractors</h2>
                  <p>Where our services are contracted out, we expect contracted service providers to have an accessible and comprehensive complaint management system. We take complaints not only about the actions of our staff but also the actions of our service providers.</p>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">5.11 Empowerment of staff</h2>
                  <p>All staff managing complaints are empowered to implement our complaint management system as relevant to their role and responsibilities. Staff are encouraged to provide feedback on the effectiveness and efficiency of all aspects of our complaint management system.</p>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">5.12 Managing unreasonable conduct by people making complaints</h2>
                  <p className="mb-2">We are committed to being accessible and responsive to all people who approach us with feedback or complaints. At the same time our success depends on:</p>
                  <ol class="list-item p-5 m-0">
                    <li className="mb-2">a. our ability to do our work and perform our functions in the most effective and efficient way possible;</li>
                    <li className="mb-2">b. the health, safety and security of our staff, volunteers and beneficiaries; and</li>
                    <li className="mb-2">c. our ability to allocate our resources fairly across all the complaints we receive.</li>
                  </ol>
                  <p className="mb-2">When people behave unreasonably in their dealings with us, their conduct can significantly affect the progress and efficiency of our work. As a result, we will take proactive and decisive action to manage any conduct that negatively and unreasonably affects us and will support our staff to do the same in accordance with this policy.</p>
                </li>
                <li className="pb-4 mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">5.13 Commitment</h2>
                  <p className="mb-4">All staff managing complaints are empowered to implement our complaint management system as relevant to their role and responsibilities. Staff are encouraged to provide feedback on the effectiveness and efficiency of all aspects of our complaint management system.</p>
                  <table class="table-auto w-full shadow-lg bg-white border-collapse">
                    <thead>
                      <tr>
                        <th class="bg-neutral-800 text-white p-2">Who</th>
                        <th class="bg-neutral-800 text-white p-2">Commitment</th>
                        <th class="bg-neutral-800 text-white p-2">How</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="hover:bg-blue-100">
                        <td class="p-2 border align-top md:align-middle">CEO or chair of the governing body</td>
                        <td class="p-2 border align-top md:align-middle">Promote a culture that values complaints and their effective resolution</td>
                        <td class="p-2 border">
                          <ul className="ml-4 list-disc">
                            <li>Report to the governing body on our complaint handling.</li>
                            <li>Provide adequate support and direction to key staff responsible for handling complaints.</li>
                            <li>Regularly review reports about complaint trends and issues arising from complaints.</li>
                            <li>Encourage all staff to be alert to complaints and assist those responsible for handling complaints to resolve them promptly.</li>
                            <li>Encourage staff to make recommendations for system improvements.</li>
                            <li>Support recommendations for service, staff and complaint handling improvements arising from the analysis of complaint data.</li>
                          </ul>
                        </td>
                      </tr>
                      <tr class="hover:bg-blue-100">
                        <td class="p-2 border align-top md:align-middle">Staff whose duties include complaint handling (may include CEO or chair of the governing body)</td>
                        <td class="p-2 border align-top md:align-middle">Demonstrate exemplary complaint handling practices</td>
                        <td class="p-2 border">
                          <ul className="ml-4 list-disc">
                            <li>Treat all people with respect, including people who make complaints.</li>
                            <li>Assist people to make a complaint, if needed.</li>
                            <li>Comply with our policy and associated procedures.</li>
                            <li>Provide regular feedback to management and/or the governing body on issues arising from complaints.</li>
                            <li>Provide suggestions to management on ways to improve our complaints management system.</li>
                            <li>Implement changes arising from individual complaints and from the analysis of complaint data as directed by management.</li>
                          </ul>
                        </td>
                      </tr>
                      <tr class="hover:bg-blue-100">
                        <td class="p-2 border align-top md:align-middle">All staff and volunteers</td>
                        <td class="p-2 border align-top md:align-middle">Understand and comply with our complaint handling practices.</td>
                        <td class="p-2 border">
                          <ul className="ml-4 list-disc">
                            <li>Treat all people with respect, including people who make complaints.</li>
                            <li>Be aware of our complaint handling policies and procedures.</li>
                            <li>Assist people who wish to make complaints access our complaints process.</li>
                            <li>Be alert to complaints and assist staff handling complaints resolve matters promptly.</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
                <li className="mb-0">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">6. Responsibilities</h2>
                  <ol class="list-item p-5 m-0">
                    <li className="mb-2">a. The Compliance Officer is responsible for bringing this policy to the attention of prospective Board members and staff.</li>
                    <li className="mb-2">b. All Board members and staff are responsible for respecting this policy.</li>
                  </ol>
                </li>
            </ol>
            <h2 className="mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">Complaints Handling Policy</h2>
            <table class="table-auto w-full max-w-xl shadow-lg bg-white border-collapse mb-4">
              <thead>
                <tr>
                  <th class="p-2 border align-top md:align-middle font-semibold">Policy number</th>
                  <th class="p-2 border align-top md:align-middle"></th>
                  <th class="p-2 border align-top md:align-middle font-semibold">Version</th>
                  <th class="p-2 border align-top md:align-middle font-normal">1.0</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-2 border align-top md:align-middle font-semibold">Drafted by</td>
                  <td class="p-2 border align-top md:align-middle">Birchgrove Legal under instructions</td>
                  <td class="p-2 border align-top md:align-middle font-semibold">Approved by Board on</td>
                  <td class="p-2 border align-top md:align-middle"></td>
                </tr>
                <tr class="hover:bg-blue-100">
                  <td class="p-2 border align-top md:align-middle font-semibold">Responsible person</td>
                  <td class="p-2 border align-top md:align-middle">Board of directors</td>
                  <td class="p-2 border align-top md:align-middle font-semibold">Scheduled review date</td>
                  <td class="p-2 border align-top md:align-middle"></td>
                </tr>
              </tbody>
            </table>
            <p className="mb-4">It is the responsibility of the CEO or, if a CEO is not appointed or if the complaint relates to the CEO, the person delegated by the Board, to ensure that these procedures are followed.</p>
            <p>The CEO, or the person delegated by the Board, may refer the complaint to a complaint handling committee.</p>
            <ol class="p-5">
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">1. Receive</h2>
                  <p className="mb-2">Unless the complaint has been resolved at the outset, we will record the complaint and its supporting information. We will also assign a unique identifier/number to the complaint file. The record of the complaint will document:</p>
                  <ol class="list-item p-5 m-0">
                    <li className="mb-2">a. Contact information of the person making a complaint and the date received;</li>
                    <li className="mb-2">a. Issues raised by the person making a complaint and the outcome/s they want;</li>
                    <li className="mb-2">a. Any other relevant information, and</li>
                    <li className="mb-2">a. Any additional support the person making a complaint requires.</li>
                  </ol>
                  <p className="mb-4">Where complaints are made in writing, Al-Ihsan Foundation shall direct the complaint to be made to the CEO, or alternatively to a designated email address of the complaints committee at (complaints@alihsan.org.au).</p>
                  <p>Where complaints are made by phone, you may contact the office on +61 1300 998 444 or 0415 533 285.</p>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">2. Acknowledge</h2>
                  <p>We will acknowledge receipt of each complaint promptly, and preferably within 5 working days. When appropriate we may offer an explanation or apology. Consideration will be given to the most appropriate medium (e.g., email, letter) for communicating with the person making a complaint.</p>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">3. Assess and investigate</h2>
                  <p className="mb-4 underline">Initial assessment</p>
                  <p className="mb-4">After acknowledging receipt of the complaint, we will confirm whether the issues raised in the complaint is/are within our control. We will also consider the outcomes sought by the person making a complaint and, where there is more than one issue raised, determine whether each issue needs to be separately addressed. When determining how a complaint will be managed, we will consider:</p>
                  <ol class="list-item p-5 m-0">
                    <li className="mb-2">a. How serious, complicated or urgent the complaint is;</li>
                    <li className="mb-2">b. Whether the complaint raises concerns about people’s health and safety;</li>
                    <li className="mb-2">c. How the person making the complaint is being affected;</li>
                    <li className="mb-2">d. The risks involved if resolution of the complaint is delayed, and</li>
                    <li className="mb-2">e. Whether a resolution requires the involvement of other organisations or authorities.</li>
                  </ol>
                  <p className="mb-4 underline">Investigating the complaint</p>
                  <p className="mb-4 After assessing the complaint, we will consider how to manage it. We may:"></p>
                  <ol class="list-item p-5 m-0">
                    <li className="mb-2">a. Give the person making a complaint information or an explanation (or otherwise the responsible person or management (in the case of an orphan or child));</li>
                    <li className="mb-2">b. Gather information about the issue, person or area that the complaint is about; or</li>
                    <li className="mb-2">c. Investigate the claims made in the complaint.</li>
                  </ol>
                  <p className="mb-4">We will keep the person making the complaint updated on our progress, particularly if there are any delays. We will also communicate the outcome of the complaint using the most appropriate medium. Which actions we decide to take will be tailored to each case and take into account any statutory requirements.</p>
                  <p className="mb-4">The investigation procedure may be different where an anonymous complaint has been made and/or where discretion is required, such as in the case of child protection matters. Where Al-Ihsan Foundation is required by law to report matters to a Government department or third-party it shall do so. Investigation timeframes can vary depending on the type of complaint made.</p>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">4. Determine outcome and provide reasons for decision</h2>
                  <p className="mb-2">Following consideration of the complaint and any investigation into the issues raised, we will contact the person making the complaint and advise them:</p>
                  <ul class="p-5 m-0">
                    <li>a. The outcome of the complaint and any action we took;</li>
                    <li>b. The reason/s for our decision;</li>
                    <li>c. The remedy or resolution/s that we have proposed or put in place; and</li>
                    <li>d. Any options for review that may be available to the complainant, such as an internal review, external review or appeal.</li>
                  </ul>
                </li>
                <li className="mb-4">
                  <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">5. Close the complaint</h2>
                  <p>Document and analyse data.</p>
                </li>
            </ol>
          </div> */}
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyComponent;
