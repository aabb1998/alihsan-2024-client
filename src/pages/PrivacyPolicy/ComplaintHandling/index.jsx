import React, { useEffect } from "react";
import PageHead from "../../../components/PageHead";

const ComplaintHandlingComponent = () => {
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComplaintHandlingComponent;