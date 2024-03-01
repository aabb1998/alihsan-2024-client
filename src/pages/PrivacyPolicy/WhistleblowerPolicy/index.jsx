import React, { useEffect } from "react";
import PageHead from "../../../components/PageHead";
const WhistleblowerComponent = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <PageHead title={"All projects"} />
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
              Whistleblower Policy
            </h1>
            <table class="table-auto w-full max-w-xl shadow-lg bg-white border-collapse mb-4">
              <thead>
                <tr>
                  <th class="p-2 border align-top md:align-middle font-semibold">
                    Policy number
                  </th>
                  <th class="p-2 border align-top md:align-middle">
                    [insert number]
                  </th>
                  <th class="p-2 border align-top md:align-middle font-semibold">
                    Version
                  </th>
                  <th class="p-2 border align-top md:align-middle font-normal">
                    [insert number]
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-2 border align-top md:align-middle font-semibold">
                    Drafted by
                  </td>
                  <td class="p-2 border align-top md:align-middle">
                    Birchgrove Legal under instructions
                  </td>
                  <td class="p-2 border align-top md:align-middle font-semibold">
                    Approved by Board on
                  </td>
                  <td class="p-2 border align-top md:align-middle">
                    [insert date]
                  </td>
                </tr>
                <tr class="">
                  <td class="p-2 border align-top md:align-middle font-semibold">
                    Responsible person
                  </td>
                  <td class="p-2 border align-top md:align-middle">
                    Board of directors
                  </td>
                  <td class="p-2 border align-top md:align-middle font-semibold">
                    Scheduled review date
                  </td>
                  <td class="p-2 border align-top md:align-middle">
                    [insert date]
                  </td>
                </tr>
              </tbody>
            </table>
            <ol class="p-5 pb-0">
              <li className="mb-4">
                <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">
                  1. Policy Statement
                </h2>
                <p className="mb-2">
                  Al-Ihsan Foundation International Limited ACN 168 960 361{" "}
                  <strong>(Al-Ihsan Foundation)</strong> is committed to
                  ensuring the highest standards of integrity and promoting a
                  culture of honest and ethical behaviour, corporate compliance
                  and good corporate governance. As part of this commitment,
                  Al-Ihsan Foundation recognises the need to have robust
                  procedures in place to ensure people can report instances of
                  suspected unethical, illegal, fraudulent or undesirable
                  conduct by Al-Ihsan Foundation or its officers, employees or
                  agents, and to ensure that anyone who does report such
                  behaviour can do so without fear of reprisal, discrimination,
                  intimidation or victimisation.
                </p>
              </li>
              <li className="mb-4">
                <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">
                  2. About this Whistleblower Policy
                </h2>
                <ul class="p-5 m-0 list-roman">
                  <li>
                    The purpose of this whistleblower policy is to:
                    <ul class="p-5 m-0 list-decimal">
                      <li>deter corporate wrongdoing and misconduct;</li>
                      <li>
                        encourage disclosures of corporate wrongdoing and
                        misconduct;
                      </li>
                      <li>
                        set out how corporate wrongdoing or misconduct by
                        Al-Ihsan Foundation International and its officers can
                        be disclosed; and
                      </li>
                      <li>
                        describe the protections available where disclosures are
                        made in accordance with Part 9.4AAA of the Corporations
                        Act 2001 (Cth) (<strong>Corporations Law</strong>) or
                        Part IVD of the Taxation Administration Act 1953 (Cth) (
                        <strong>Tax Act</strong>).
                      </li>
                    </ul>
                  </li>
                  <li>
                    A person who makes a disclosure under this whistleblower
                    policy is referred to as a <strong>whistleblower</strong>.
                  </li>
                  <li>
                    This whistleblower policy does not form any part of any
                    employee's contract of employment, and Al-Ihsan Foundation
                    International may amend it at any time.
                  </li>
                </ul>
              </li>
              <li className="mb-4">
                <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">
                  3. Who can make a disclosure under this whistleblower policy,
                  and the effect of making a disclosure?
                </h2>
                <ol class="p-5 m-0 list-roman">
                  <li>
                    The following individuals can make a report of a Disclosable
                    Matter (as defined in paragraph 5) in accordance with this
                    whistleblower policy:
                    <ol class="p-5 m-0 list-decimal">
                      <li>
                        an <strong>eligible whistleblower</strong>, which
                        includes an individual who is, or has been, any of the
                        following in relation to Al-Ihsan Foundation:
                        <ol class="p-5 m-0 list-alpha">
                          <li>an officer, director or senior manager;</li>
                          <li>
                            a permanent, temporary, casual, part-time or
                            full-time employee;
                          </li>
                          <li>a trainee or apprentice;</li>
                          <li>
                            suppliers of services or goods to Al-Ihsan
                            Foundation, such as contractors and partners; or
                          </li>
                          <li>
                            a spouse, relative or dependant of an individual
                            referred to above.
                          </li>
                        </ol>
                      </li>
                      <li>
                        an eligible whistleblower will qualify for protections
                        available under the Corporations Law and the Tax Act if
                        they make a disclosure that qualifies for protection
                        under those statutes (see Schedule 1 for when a
                        disclosure qualifies for protection under the
                        Corporations Law and Tax Act).
                      </li>
                    </ol>
                  </li>
                  <li>
                    Issues, queries and concerns about the application of this
                    whistleblower policy, and the type of protections and
                    immunities available to whistleblowers, and other persons
                    (including persons who are the subject of a disclosure), can
                    be raised with:
                    <ol class="p-5 m-0 list-decimal">
                      <li>your line manager or supervisor;</li>
                      <li>the CEO;</li>
                      <li>
                        an independent lawyer should you seek legal advice on
                        the operation of the statutory whistleblower regimes
                        under the Corporations Law or Tax Act; and
                      </li>
                      <li>Al-Ihsan Foundation's Compliance Officer.</li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li className="mb-4">
                <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">
                  4. Roles and responsibilities
                </h2>
                <ol class="p-5 m-0 list-roman">
                  <li>
                    The Board of Directors has responsibility for:
                    <ol class="p-5 m-0 list-decimal">
                      <li>
                        this whistleblower policy, including approving the
                        whistleblower policy and any amendments; and
                      </li>
                      <li>
                        where relevant, determining how a matter reported under
                        this whistleblower policy will be managed, including
                        seeking legal advice on Al-Ihsan Foundation's statutory
                        or other legal obligations arising from a disclosure
                        made under this whistleblower policy.
                      </li>
                    </ol>
                  </li>
                  <li>
                    The <strong>CEO</strong>, if none,{" "}
                    <strong>the Compliance Manager</strong> has primary and
                    day-to-day responsibility for:
                    <ol class="p-5 m-0 list-decimal">
                      <li>implementing this whistleblower policy;</li>
                      <li>
                        assessing disclosures made under this whistleblower
                        policy;
                      </li>
                      <li>
                        subject to any permissions from the whistleblower,
                        ensuring a whistleblower's identity is kept
                        confidential;
                      </li>
                      <li>
                        notifying the Board of Directors where a disclosure is
                        sufficiently serious;
                      </li>
                      <li>
                        seeking legal advice on Al-Ihsan Foundation's statutory
                        or other legal obligations arising from a disclosure
                        made under this whistleblower policy;
                      </li>
                      <li>
                        assessing the risk of any detrimental conduct to a
                        whistleblower, or other person, due to a disclosure made
                        under this whistleblower policy, and ensuring the
                        implementation of appropriate safeguards;
                      </li>
                      <li>
                        determining whether a disclosure will be investigated,
                        and the scope and conduct of that investigation; and
                      </li>
                      <li>
                        notifying management, in circumstances where, if the
                        disclosure was proven, there could be disciplinary
                        consequences for an employee of Al-Ihsan Foundation.
                      </li>
                    </ol>
                  </li>
                  <li>
                    <strong>Designated disclosure officers</strong> (see
                    paragraph (a)), officers and senior managers of Al-Ihsan
                    Foundation, secretaries, and employees and officers with
                    functions or duties that relate to the tax affairs of
                    Al-Ihsan Foundation are responsible for:
                    <ol class="p-5 m-0 list-decimal">
                      <li>
                        receiving disclosures under this whistleblower policy;
                      </li>
                      <li>
                        subject to any permissions from the whistleblower,
                        ensuring a whistleblower's identity is kept
                        confidential; and
                      </li>
                      <li>
                        ensuring a whistleblower has access to this
                        whistleblower policy.
                      </li>
                    </ol>
                  </li>
                  <li>
                    Al-Ihsan Foundation's <strong>legal representative</strong>{" "}
                    is, where requested by the Board of Directors or CEO,
                    responsible for the provision of legal advice to Al-Ihsan
                    Foundation in respect of a disclosure under this
                    whistleblower policy, or the application of this
                    whistleblower policy.
                  </li>
                  <li>
                    An <strong>Investigator</strong>, appointed by the Board of
                    Directors, CEO, General Counsel or Al-Ihsan Foundation's
                    legal representative, will have responsibility for:
                    <ol class="p-5 m-0 list-decimal">
                      <li>
                        subject to any permissions from the whistleblower,
                        ensuring a whistleblower's identity is kept
                        confidential; and
                      </li>
                      <li>
                        conducting a:
                        <ol class="p-5 m-0 list-alpha">
                          <li>
                            confidential and privileged factual investigation of
                            the disclosure for the purpose of providing Al-Ihsan
                            Foundation with legal advice; or
                          </li>
                          <li>
                            conducting a confidential factual investigation of
                            the disclosure, including gathering evidence,
                            interviewing witnesses, communicating with the
                            whistleblower where they have consented to providing
                            their identity to the Investigator, seeking
                            assistance from internal and external consultants,
                            and providing an investigation report with the
                            Investigator's findings to the Board of Directors or
                            the CEO.
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                  <li>
                    The <strong>Board</strong> has overall responsibility for
                    any disciplinary process that is triggered by a disclosure
                    under this whistleblower policy that, if established, leads
                    to an allegation of misconduct or serious misconduct against
                    an employee of Al-Ihsan Foundation, of where a report
                    involves a <strong>personal work-related grievance</strong>{" "}
                    as defined in paragraph 6 b (iii).
                  </li>
                  <li>
                    All <strong>employees</strong> of Al-Ihsan Foundation are
                    required, and all other persons eligible to make disclosures
                    under this whistleblower policy are strongly encouraged to
                    report under this whistleblower policy if they reasonably
                    suspect that conduct, or a state of affairs exists, in
                    relation to Al-Ihsan Foundation that is a Disclosable
                    Matter, as defined in paragraph 5, whether engaged in by
                    themselves or others.{" "}
                  </li>
                  <li>
                    All employees of Al-Ihsan Foundation, and persons providing
                    services as an independent contractor or labour hire worker
                    to Al-Ihsan Foundation, are required to:
                    <ol class="p-5 m-0 list-decimal">
                      <li>
                        subject to a claim of privilege or self-incrimination,
                        cooperate with an Investigator, including by providing
                        relevant documents and information, or answering
                        questions during the conduct of any investigation under
                        this whistleblower policy;
                      </li>
                      <li>
                        strictly maintain the confidentiality of a
                        whistleblower's identity, whether they obtain that
                        information directly or indirectly; and
                      </li>
                      <li>
                        refrain from committing, or threating to commit, any act
                        of detrimental conduct to a whistleblower, or any other
                        person, because they believe or suspect that a
                        whistleblower, or another person, has made, may have
                        made, proposes to make or could make a disclosure that
                        qualifies for protection under the Corporations Law or
                        Tax Act.
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li className="mb-4">
                <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">
                  5. What can be reported under this whistleblower policy?
                </h2>
                <p className="mb-2">
                  Eligible whistleblowers should make a disclosure under this
                  whistleblower policy if they reasonably suspect that conduct,
                  or a state of affairs exists, in relation to Al-Ihsan
                  Foundation that is any of the following:
                </p>
                <ol class="p-5 m-0 list-roman">
                  <li>
                    Serious misconduct, or an improper state of affairs or
                    circumstances, in relation to:
                    <ol class="p-5 m-0 list-decimal">
                      <li>Al-Ihsan Foundation; or</li>
                      <li>
                        the tax affairs of Al-Ihsan Foundation, and where they
                        consider the information may assist the recipient to
                        perform functions and duties in relation to the tax
                        affairs of Al-Ihsan Foundation;
                      </li>
                    </ol>
                  </li>
                  <li>
                    in contravention of any law administered by the Australian
                    Securities and Investments Commission (<strong>ASIC</strong>
                    ) or Australian Prudential Regulation Authority (
                    <strong>APRA</strong>) (see Schedule 2 for a list of these
                    laws);
                  </li>
                  <li>
                    conduct that represents a danger to the public or the
                    financial system (even if this conduct does not involve a
                    breach of a particular law);
                  </li>
                  <li>
                    conduct that is an offence against any law of the
                    Commonwealth, where the offence is punishable by
                    imprisonment for a period of 12 months or more,
                  </li>
                </ol>
                <p className="mb-2">
                  (collectively referred to as{" "}
                  <strong>Disclosable Matters</strong> ).
                </p>
              </li>
              <li className="mb-4">
                <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">
                  6. What should not be reported under this whistleblower
                  policy?
                </h2>
                <ol class="p-5 m-0 list-roman">
                  <li>
                    Subject to a handful of exceptions, a Disclosable Matter
                    does not include a{" "}
                    <strong>personal work-related grievance</strong> , which
                    concerns a grievance in relation to a whistleblower's
                    employment, or former employment, with Al-Ihsan Foundation
                    that has implications for the whistleblower personally.
                  </li>
                  <li>
                    Examples of a personal work-related grievance include
                    complaints an employee, or former employee, may hold
                    concerning:
                    <ol class="p-5 m-0 list-decimal">
                      <li>the terms and conditions of their employment;</li>
                      <li>an interpersonal conflict with another employee;</li>
                      <li>
                        any disciplinary or performance management process; and
                      </li>
                      <li>the termination of their employment.</li>
                    </ol>
                  </li>
                  <li>
                    A personal work-related grievance will be a Disclosable
                    Matter if it:
                    <ol class="p-5 m-0 list-decimal">
                      <li>
                        has significant implications for Al-Ihsan Foundation,
                        and wider ramifications than for the whistleblower
                        personally; and
                      </li>
                      <li>
                        relates to detrimental conduct suffered by the
                        whistleblower because of making a previous disclosure,
                        or seeking legal advice about whistleblower protections.
                      </li>
                    </ol>
                  </li>
                  <li>
                    Further information about Al-Ihsan Foundation International
                    's workplace policies can be obtained from the Compliance
                    Officer. If unsure whether a grievance is a Disclosable
                    Matter under this whistleblower policy, or a personal
                    work-related grievance that is more appropriately managed
                    through a relevant workplace policy of Al-Ihsan Foundation
                    International, seek guidance from the Whistleblower Officer
                    or an independent legal adviser.
                  </li>
                </ol>
              </li>
              <li className="mb-4">
                <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">
                  7. To whom, and how should, disclosures under this
                  whistleblower policy be made?
                </h2>
                <ol class="p-5 m-0 list-roman">
                  <li>
                    Disclosures under this whistleblower policy should be made
                    to one of the following{" "}
                    <strong>Designated Disclosure Officers</strong> :
                    <p className="inline-block bg-accent-300">
                      [list names, positions and contact details]
                    </p>
                  </li>
                  <li>
                    Wherever possible, to assist Al-Ihsan Foundation
                    International handle a disclosure appropriately, the
                    following information about a Disclosable Matter should be
                    provided to the Designated Disclosure Officer in a clear and
                    factual way:
                    <ol class="p-5 m-0 list-decimal">
                      <li>
                        the whistleblower's full name, address and preferred
                        contact details, noting there is no requirement for a
                        whistleblower to provide these details as disclosures
                        may be made anonymously;
                      </li>
                      <li>
                        the division or department which the Disclosable Matter
                        relates to;
                      </li>
                      <li>
                        the nature of the alleged wrongdoing including, where
                        relevant, details of the person believed to have
                        committed the wrongdoing, or is aware of, or involved
                        in, the wrongdoing;
                      </li>
                      <li>when and where the wrongdoing occurred;</li>
                      <li>
                        anyone else who may verify the claim, or possible
                        witnesses;
                      </li>
                      <li>
                        if the whistleblower is concerned about any possible
                        victimisation or acts of reprisal for disclosing the
                        matter, or have been subject to detrimental conduct for
                        a previous report of a Disclosable Matter, and any
                        assistance or support sought from Al-Ihsan Foundation
                        International; and
                      </li>
                      <li>
                        any support information (for instance, emails,
                        documents, text messages, file notes and photos).
                      </li>
                    </ol>
                  </li>
                  <li>
                    Whistleblowers can also report Disclosable Matters by:
                    <ol class="p-5 m-0 list-decimal">
                      <li>
                        writing a report, preferably addressing the matters
                        raised in paragraph ii, and mailing it to 176 Waldron
                        Road, Chester Hill NSW 2162 where it will be received by
                        the Whistleblower Officer;
                      </li>
                      <li>
                        where the matter does not involve the tax affairs of
                        Al-Ihsan Foundation International, raising it with:
                        <ol class="p-5 m-0 list-alpha">
                          <li>
                            any officer or senior manager of Al-Ihsan Foundation
                            International;
                          </li>
                          <li>
                            ASIC or APRA (see Schedule 3 for contact details);
                          </li>
                          <li>
                            in limited circumstances involving an emergency or
                            public interest disclosure, to the media or a Member
                            of Parliament;
                          </li>
                        </ol>
                      </li>
                      <li>
                        where the matter involves the tax affairs of Al-Ihsan
                        Foundation International, raising it with:
                        <ol class="p-5 m-0 list-alpha">
                          <li>
                            a director, secretary or senior manager of Al-Ihsan
                            Foundation International;
                          </li>
                          <li>
                            employees or officers of Al-Ihsan Foundation
                            International who have functions or duties that
                            relate to the tax affairs of Al-Ihsan Foundation
                            International; or
                          </li>
                          <li>
                            The Commissioner of Taxation (see Schedule 4 for
                            contact details).
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                  <li>
                    Disclosures of Disclosable Matters can be made anonymously,
                    and a whistleblower may choose to remain anonymous,
                    including during any investigation into the disclosure. If
                    the disclosure is not made anonymously, or an anonymous
                    whistleblower consents to limited disclosure of their
                    identity (for instance to the Whistleblower Officer or
                    Investigator), Al-Ihsan Foundation International will take
                    reasonable steps to ensure that the whistleblower's identity
                    remains confidential.
                  </li>
                </ol>
              </li>
              <li className="mb-4">
                <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">
                  8. Protections where a disclosure is a qualifying disclosure
                  under the Corporations Law or Tax Act
                </h2>
                <ol class="p-5 m-0 list-roman">
                  <li>
                    Where a disclosure received under this whistleblower policy
                    is a protected disclosure under the Corporations Law or the
                    Tax Act (see Schedule 1):
                    <ol class="p-5 m-0 list-decimal">
                      <li>
                        subject to a handful of exceptions to facilitate
                        investigation of disclosures, a whistleblower's identity
                        cannot be disclosed, or any information that is likely
                        to lead to their identity, without the whistleblower's
                        consent;
                      </li>
                      <li>
                        except where necessary to give effect to the
                        whistleblower regime's in the Corporations Law and Tax
                        Act, a person cannot be required to disclose to a court
                        or tribunal, or produce a document containing the
                        identity of a whistleblower, or any information that is
                        likely to lead to their identity;
                      </li>
                      <li>
                        the whistleblower, and other persons, are protected from
                        a range of detrimental conduct (including threats of
                        detrimental conduct) because a person believes or
                        suspects that a qualifying disclosure has been made, may
                        be made, is proposed to be made or could be made.
                        Detrimental conduct includes injury in employment,
                        dismissal, harassment or intimidation, harm or injury to
                        a person, their property, their reputation or business;
                        and
                      </li>
                      <li>
                        the whistleblower is provided with a range of legal
                        immunities for making the qualifying disclosure,
                        including:
                        <ol class="p-5 m-0 list-alpha">
                          <li>
                            immunity from civil, criminal or administrative
                            liability;
                          </li>
                          <li>
                            no contractual, or other remedy, can be enforced
                            against the whistleblower; and
                          </li>
                          <li>
                            inadmissibility or information disclosed by the
                            whistleblower in proceedings against them (other
                            than in proceedings concerning the falsity of the
                            information).
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                  <li>
                    Remedies and penalties may be imposed against any person who
                    contravenes the protections where a qualifying disclosure
                    under the Corporations Law or Tax Act has been made.
                  </li>
                </ol>
              </li>
              <li className="mb-4">
                <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">
                  9. Handling and investigating a disclosure
                </h2>
                <ol class="p-5 m-0 list-roman">
                  <li>
                    Where a whistleblower does not give their permission to
                    share their identity, or share their identity with
                    particular persons involved in managing or investigating the
                    disclosure, a person receiving a disclosure under this
                    whistleblower policy will disclose the information contained
                    in the disclosure only if:
                    <ol class="p-5 m-0 list-decimal">
                      <li>
                        the information does not disclose the whistleblower's
                        identity;
                      </li>
                      <li>
                        they have taken all reasonable steps to reduce the risk
                        that the whistleblower will be identified from the
                        information; and
                      </li>
                      <li>
                        it is reasonably necessary for investigating the issues
                        raised in the disclosure.
                      </li>
                    </ol>
                  </li>
                  <li>
                    Information relating to the disclosure will be stored
                    confidentially and securely in Al-Ihsan Foundation
                    International 's whistleblower reporting system and
                    database.
                  </li>
                  <li>
                    All persons receiving, handling and investigating a
                    disclosure under this whistleblower policy will receive
                    appropriate training in their obligations in respect of the
                    confidentiality of a whistleblower's identity, and how to
                    ensure the security of information and communications in
                    respect of a disclosure.
                  </li>
                  <li>
                    Whistleblowers should be aware that people may be able to
                    guess their identity where they:
                    <ol class="p-5 m-0 list-decimal">
                      <li>
                        have mentioned to other people they are considering
                        making a disclosure;
                      </li>
                      <li>
                        have complained or raised concerns with other people
                        about the subject matter of the disclosure;
                      </li>
                      <li>
                        are one of a very small number of people with access to
                        the information the subject of the disclosure; and
                      </li>
                      <li>
                        are disclosing information that has been told to them
                        privately and in confidence.
                      </li>
                    </ol>
                  </li>
                  <li>
                    After receiving a disclosure under this whistleblower
                    policy, a recipient of a disclosure will notify the
                    Whistleblower Officer or the Board of Directors of the
                    disclosure, having regard to their obligations in paragraph
                    (i), and the Whistleblower Officer or the Board of Directors
                    will, as soon as practicable, assess:
                    <ol class="p-5 m-0 list-decimal">
                      <li>
                        the disclosure and determine whether it:
                        <ol class="p-5 m-0 list-alpha">
                          <li>
                            falls within the scope of this whistleblower policy,
                            or whether it is more appropriately managed under
                            another workplace policy of Al-Ihsan Foundation
                            International;
                          </li>
                          <li>
                            triggers a requirement for Al-Ihsan Foundation
                            International to seek legal advice in respect of its
                            legal obligations, including the conduct of a
                            factual investigation into the disclosure to assist
                            in the provision of that advice; or
                          </li>
                          <li>should be investigated, and by whom; and</li>
                        </ol>
                      </li>
                      <li>
                        the risk of detriment to the whistleblower, or another
                        person, arising from the disclosure, and where
                        appropriate develop and implement strategies to
                        eliminate, or where that is not reasonably practicable,
                        minimise the risk of detriment to the whistleblower, or
                        another person, arising from the disclosure.
                      </li>
                    </ol>
                  </li>
                  <li>
                    In certain situations, it will be appropriate for the
                    recipient of a disclosure to report a disclosure directly to
                    the Board of Directors, and for the assessment detailed in
                    paragraph (v) to be performed by the Board of Directors.
                  </li>
                  <li>
                    Where it is determined that a disclosure should be
                    investigated:
                    <ol class="p-5 m-0 list-decimal">
                      <li>
                        the investigation will be through, objective, fair,
                        preserve the confidentiality of the whistleblower's
                        identity, and be conducted independent of:
                        <ol class="p-5 m-0 list-alpha">
                          <li>the whistleblower;</li>
                          <li>any person the subject of the disclosure; and</li>
                          <li>
                            any parts of Al-Ihsan Foundation International's
                            business concerned; and
                          </li>
                        </ol>
                      </li>
                      <li>
                        the Investigator will document the nature and scope of
                        the investigation and findings in a report that will be
                        provided to the Whistleblower Officer and/or the Board
                        of Directors, who will provide feedback, where
                        appropriate, to the whistleblower regarding the progress
                        and outcome of, and actions arising from, the
                        investigation.
                      </li>
                    </ol>
                  </li>
                  <li>
                    If the disclosure was made anonymously, the determination of
                    whether to investigate the disclosure, or the conduct of any
                    investigation, will be based on the information provided by
                    the whistleblower.
                  </li>
                </ol>
              </li>
              <li className="mb-4">
                <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">
                  10. Breaches of the whistleblower policy
                </h2>
                <ol class="p-5 m-0 list-roman">
                  <li>
                    An employee who breaches this whistleblower policy,
                    including breaching an obligation to keep a whistleblower's
                    identity confidential, refusing to participate or cooperate
                    with an investigation into a disclosure, or engaging in
                    detrimental conduct against a whistleblower or another
                    person because a disclosure has been made under this
                    whistleblower policy, will face a disciplinary process in
                    accordance with Al-Ihsan Foundation International's
                    misconduct policy, which could result in the termination of
                    their employment.
                  </li>
                  <li>
                    Al-Ihsan Foundation International may terminate its
                    relationship with other individuals and entities providing
                    goods or services to Al-Ihsan Foundation International if
                    they breach this whistleblower policy.
                  </li>
                </ol>
              </li>
            </ol>
            <h2 className="inline-block mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">
              Schedule 1 - When does a disclosure qualify for protection under
              the Corporations Law or Tax Act?
            </h2>
            <ul class="p-5 m-0 list-roman">
              <li>
                <strong>Overview of this Schedule</strong>
                <ol class="p-5 m-0">
                  <li className="mb-2">
                    1.1 Eligible whistleblowers, and others, may be able to
                    obtain certain statutory protections where a disclosure
                    qualifying for protection is made under Part 9.4AAA of the
                    Corporations Law or Part IVD of the Tax Act.
                  </li>
                  <li className="mb-2">
                    1.2 This Schedule provides an overview of the key conditions
                    that must be met for a disclosure of information to qualify
                    for protection under the Corporations Law and the Tax Act.
                  </li>
                  <li className="mb-2">
                    1.3 This Schedule is intended for information purposes only
                    and should not be taken as the provision of legal advice in
                    respect of the operation and application of the
                    whistleblower regimes in either the Corporations Law or the
                    Tax Act. Legal advice should be obtained from an independent
                    legal practitioner.
                  </li>
                </ol>
              </li>
              <li>
                <strong>
                  Key conditions for a disclosure under the Corporations Law to
                  qualify for protection
                </strong>
                <ol class="p-5 m-0">
                  <li className="mb-2">
                    2.1 To qualify for protection under the Corporations Law, a
                    disclosure can be either a:
                    <p className="pt-2">(a) qualifying disclosure; or</p>
                    <p>(b) protected disclosure.</p>
                  </li>
                  <li className="mb-2">
                    2.2 To be a <strong>qualifying disclosure</strong> under the
                    Corporations Law, the following conditions must be met.
                    <table class="table-auto w-full shadow-lg bg-white border-collapse mt-2">
                      <thead>
                        <tr>
                          <th class="bg-neutral-800 text-white p-2">
                            Condition
                          </th>
                          <th class="bg-neutral-800 text-white p-2">
                            Consideration
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="">
                          <td class="p-2 border align-top md:align-middle">
                            The information disclosed relates to a regulated
                            entity.
                          </td>
                          <td class="p-2 border align-top md:align-middle">
                            The information disclosed must relate to a regulated
                            entity, a term that includes a company such as
                            Al-Ihsan Foundation International.
                          </td>
                        </tr>
                        <tr class="">
                          <td class="p-2 border align-top md:align-middle">
                            The individual making the disclosure is an eligible
                            whistleblower in relation to the regulated entity.
                          </td>
                          <td class="p-2 border align-top md:align-middle">
                            <p className="mb-2">
                              The person making the disclosure must be an
                              eligible whistleblower, a term broadly defined by
                              the Corporations Law to include an individual who
                              is, or has been, any of the following in relation
                              to the regulated entity:
                            </p>
                            <ul>
                              <li>- an officer or employee;</li>
                              <li>
                                - an individual supplying services or goods, or
                                an employee of a person supplying services or
                                goods;
                              </li>
                              <li>
                                - an associate (such as a director or related
                                entity); and
                              </li>
                              <li>
                                - a relative, dependent or spouse of an
                                individual referred to above.
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr class="">
                          <td class="p-2 border align-top md:align-middle">
                            The disclosure must be made to a person who is
                            eligible to receive a disclosure.
                          </td>
                          <td class="p-2 border align-top md:align-middle">
                            <p>
                              The disclosure must be made to a person or body
                              prescribed under Part 9.4AAA of the Corporations
                              Law as eligible to receive a protected disclosure,
                              which includes:
                            </p>
                            <ul>
                              <li>
                                - <strong>Officers</strong> and senior managers
                                of the regulated entity;
                              </li>
                              <li>
                                - persons authorised by the regulated entity to
                                receive qualifying disclosures, which could
                                include an independent external hotline service,
                                as well as senior leaders;
                              </li>
                              <li>
                                - Auditors and actuaries of the regulated
                                entity;
                              </li>
                              <li>
                                - the{" "}
                                <strong>
                                  Australian Securities and Investment
                                  Commission (ASIC)
                                </strong>{" "}
                                ; and
                              </li>
                              <li>
                                - the{" "}
                                <strong>
                                  Australian Prudential Regulation Authority
                                  (APRA)
                                </strong>{" "}
                                .
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr class="">
                          <td class="p-2 border align-top md:align-middle">
                            The disclosure is about matters the eligible
                            whistleblower has reasonable grounds to suspect may
                            concern prescribed conduct in respect of the
                            regulated entity, or a related body corporate of the
                            regulated entity.
                          </td>
                          <td class="p-2 border align-top md:align-middle">
                            <p className="mb-2">
                              A qualifying disclosure must be about a
                              Disclosable Matter.
                            </p>
                            <p className="mb-2">
                              A disclosure relates to a Disclosable Matter if an
                              eligible whistleblower has reasonable grounds to
                              suspect that the information they are disclosing
                              concerns or indicates:
                            </p>
                            <ul>
                              <li>
                                - misconduct or an improper state of affairs or
                                circumstances in relation to the regulated
                                entity or a related body corporate of the
                                regulated entity;
                              </li>
                              <li>
                                - the regulated entity, or an officer of the
                                regulated entity, or a related body corporate of
                                the regulated entity, has engaged in disclosable
                                conduct, being conduct that:
                              </li>
                              <li>
                                - breaches legislation administered by ASIC or
                                APRA, including the Corporations Law;
                              </li>
                              <li>
                                - constitutes an offence against any other
                                Commonwealth Law that is punishable by
                                imprisonment for a period of 12 months or more;
                                or
                              </li>
                              <li>
                                - represents a danger to the public or financial
                                system.
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td class="p-2 border align-top md:align-middle">
                            A disclosure will not be a qualifying disclosure if
                            it relates to a personal work-related grievance of
                            the whistleblower, unless an exception applies.
                          </td>
                          <td class="p-2 border align-top md:align-middle">
                            <p className="mb-2">
                              A personal work-related grievance is broadly a
                              disclosure of information concerning a matter in
                              relation to the whistleblower's employment, or
                              former employment, and having (or tending to have)
                              implications for the whistleblower personally,
                              such as in respect of:
                            </p>
                            <ul className="mb-2">
                              <li>
                                - their engagement, transfer or promotion;
                              </li>
                              <li>- terms and conditions of employment;</li>
                              <li>
                                - interpersonal conflict with an employee;
                              </li>
                              <li>- discipline or suspension; and</li>
                              <li>- termination of employment.</li>
                            </ul>
                            <p className="mb-2">
                              However, a personal work-related grievance will be
                              a qualifying disclosure it:
                            </p>
                            <ul>
                              <li>
                                - has significant implications for Al-Ihsan
                                Foundation International, and wider
                                ramifications than for just the whistleblower
                                (such as a personal grievance that identifies
                                wider systematic failures by the regulated
                                entity); and
                              </li>
                              <li>
                                - telates to detrimental treatment suffered by,
                                or threatened to, the whistleblower because of
                                making an earlier qualifying or protected
                                disclosure.
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                  <li>
                    2.3 To be a <strong>protected</strong> disclosure under the
                    Corporations Law, <strong>either</strong> of the following
                    conditions must be met:
                    <table class="table-auto w-full shadow-lg bg-white border-collapse mt-2">
                      <thead>
                        <tr>
                          <th class="bg-neutral-800 text-white p-2">
                            Condition
                          </th>
                          <th class="bg-neutral-800 text-white p-2">
                            Consideration
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="">
                          <td class="p-2 border align-top md:align-middle">
                            In extreme cases, where an eligible whistleblower
                            makes a disclosure to the media or a Member of
                            Parliament in relation to a regulated entity.
                          </td>
                          <td class="p-2 border align-top md:align-middle">
                            <p className="mb-2">
                              For a disclosure to the media or a Member of
                              Parliament to qualify for protection under Part
                              9.4AAA, the eligible whistleblower must:
                            </p>
                            <ul>
                              <li>
                                - already have made a{" "}
                                <strong>qualifying disclosure</strong> ;
                              </li>
                              <li>
                                - already have met certain prescribed written
                                notification requirements in respect of that
                                qualifying disclosure to the person or body that
                                received the disclosure, and either:
                              </li>
                              <li>
                                - the disclosure is in respect of a substantial
                                and imminent danger to someone's health and
                                safety, or the natural environment; or
                              </li>
                              <li>
                                - disclosing the information is in the public
                                interest.
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr class="">
                          <td class="p-2 border align-top md:align-middle">
                            A disclosure of information is made to a legal
                            practitioner for the purpose of obtaining legal
                            advice or representation in relation to the
                            operation of Part 9.4AAA of the Corporations Law.
                          </td>
                          <td class="p-2 border align-top md:align-middle">
                            <p className="mb-2">
                              This condition for a disclosure to be a protected
                              disclosure does not carry any of the requirements
                              for the disclosure to also be a qualifying
                              disclosure, including no requirement that:
                            </p>
                            <ul>
                              <li>
                                - the person be an eligible whistleblower; and
                              </li>
                              <li>
                                - the disclosure be about a Disclosable Matter.
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                  <li className="mt-2">
                    3. Key conditions for a qualifying disclosure under the Tax
                    Act
                    <p className="mb-2">
                      To qualify for protection under the Tax Act, the following
                      conditions must be met:
                    </p>
                    <table class="table-auto w-full shadow-lg bg-white border-collapse mt-2">
                      <thead>
                        <tr>
                          <th class="bg-neutral-800 text-white p-2">
                            Condition
                          </th>
                          <th class="bg-neutral-800 text-white p-2">
                            Consideration
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="">
                          <td class="p-2 border align-top md:align-middle">
                            The information disclosed relates to an entity
                            within the meaning of the Income Tax Assessment Act
                            1997 (Cth) (ITAA 1997).
                          </td>
                          <td class="p-2 border align-top md:align-middle">
                            <p className="mb-2">
                              The information disclosed must relate to an
                              entity, a term that includes:
                            </p>
                            <ul>
                              <li>- individuals; and</li>
                              <li>
                                - a company such as Al-Ihsan Foundation
                                International.
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr class="">
                          <td class="p-2 border align-top md:align-middle">
                            The individual making the disclosure is an eligible
                            whistleblower in relation to the entity.
                          </td>
                          <td class="p-2 border align-top md:align-middle">
                            <p className="mb-2">
                              The person making the disclosure must be an
                              eligible whistleblower, a term broadly defined by
                              the Tax Act to include an individual who is, or
                              has been, any of the following in relation to the
                              entity:
                            </p>
                            <ul>
                              <li>
                                - an <strong>officer</strong> or employee;
                              </li>
                              <li>
                                - an individual supplying services or goods, or
                                an employee of a person supplying services or
                                goods;
                              </li>
                              <li>
                                - an individual who is an associate of the
                                entity within the meaning of the ITAA 1997; and
                              </li>
                              <li>
                                - a relative, dependent or spouse of an
                                individual referred to above.
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr class="">
                          <td class="p-2 border align-top md:align-middle">
                            The disclosure must be made to an eligible
                            recipient.
                          </td>
                          <td class="p-2 border align-top md:align-middle">
                            <p className="mb-2">
                              The disclosure must be made to a person or body
                              prescribed under Part IXD of the Tax Act as
                              eligible to receive a protected disclosure, which
                              includes:
                            </p>
                            <ul>
                              <li>
                                - directors, secretaries or senior managers;
                              </li>
                              <li>
                                - persons authorised by the entity to receive
                                qualifying disclosures, which could include an
                                independent external hotline service, as well as
                                senior leaders;
                              </li>
                              <li>
                                - employees or officers who have functions or
                                duties that relate to the tax affairs of
                                Al-Ihsan Foundation International;
                              </li>
                              <li>
                                - auditors, members of an audit team conducting
                                an audit, registered tax agents or business
                                activity statement (BAS) agents to the entity;
                                and
                              </li>
                              <li>- the Commissioner of Taxation.</li>
                            </ul>
                          </td>
                        </tr>
                        <tr class="">
                          <td class="p-2 border align-top md:align-middle">
                            The disclosure is about matters the eligible
                            whistleblower has reasonable grounds to suspect may
                            concern prescribed conduct in respect of the entity,
                            or an associated of the entity.
                          </td>
                          <td class="p-2 border align-top md:align-middle">
                            <p className="mb-2">
                              A qualifying disclosure must be about a
                              Disclosable Matter.
                            </p>
                            <p className="mb-2">
                              A disclosure relates to a Disclosable Matter if an
                              eligible whistleblower both:
                            </p>
                            <ul>
                              <li>
                                - has reasonable grounds to suspect that the
                                information concerns or indicates misconduct or
                                an improper state of affairs or circumstances in
                                relation to the tax affairs of the entity or an
                                associated; and
                              </li>
                              <li>
                                - considers that the information may assist the
                                eligible recipient to perform functions or
                                duties in relation to the tax affairs of the
                                entity or an associate.
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                </ol>
              </li>
            </ul>
            <h2 className="mb-2 text-heading-6">
              Schedule 2 - Statutes a whistleblower may suspect have been
              contravened for the purpose of a Disclosable Matter
            </h2>
            <p className="mb-2">
              For the purpose of paragraph (b), the laws are the:
            </p>
            <ol className="p-5 mb-4 list-decimal">
              <li>Corporations Law;</li>
              <li>
                Australian Securities and Investments Commission Act 2001 (Cth);
              </li>
              <li>Banking Act 1959 (Cth);</li>
              <li>Financial Sector (Collection of Data) Act 2001 (Cth);</li>
              <li>Insurance Act 1973 (Cth);</li>
              <li>Life Insurance Act 1995 (Cth);</li>
              <li>National Consumer Credit Protection Act 2009 (Cth);</li>
              <li>Superannuation Industry (Supervision) Act 1993 (Cth); and</li>
              <li>
                an instrument made under any of the Acts in this Schedule 2.
              </li>
            </ol>
            <h2 className="mb-2 text-heading-6">
              Schedule 3 - Contact details for external recipients of
              disclosures that do not relate to the tax affairs of Al-Ihsan
              Foundation International
            </h2>
            <ol className="p-5 mb-4 list-decimal">
              <li className="mb-2">
                Australian Securities and Investment Commission (ASIC)
              </li>
              <p className="my-2">1.1 ASIC Office of the Whistleblower</p>
              <ol className="ml-8 list-alpha ">
                <li>Address: GPO BOX 9827, Brisbane QLD 4001.</li>
                <li>Website: https://asic.gov.au</li>
                <li>Telephone: 1300 300 630</li>
              </ol>
              <li>
                Australian Prudential Regulation Authority (APRA)
                <p className="my-2">2.1 APRA contact</p>
                <ol className="ml-8 list-alpha ">
                  <li>Address: GPO Box 9836, SYDNEY NSW 2001.</li>
                  <li>Website: https://apra.gov.au</li>
                  <li>Telephone: 1300 558 849</li>
                </ol>
              </li>
            </ol>
            <h2 className="mb-2 text-heading-6">
              Schedule 4 - Contact details for external recipients of disclosure
              that relate to the tax affairs of Al-Ihsan Foundation
              International
            </h2>
            <p className="mb-2">1. The Commissioner of Taxation</p>
            <div className="ml-8">
              <p className="mb-0">Commissioner of Taxation</p>
              <ol className="p-5 mb-4 list-decimal">
                <li>Address: PO Box 900, Civic Square ACT 2608.</li>
                <li>Website: https://ato.gov.au</li>
                <li>Telephone: 13 28 69.</li>
              </ol>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WhistleblowerComponent;