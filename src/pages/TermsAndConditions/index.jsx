import React, { useEffect } from "react";
import Img from "../../components/Image";
import PageHead from "../../components/PageHead";

export const TermsAndConditionsComponent = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <PageHead title={'Terms and conditions'}/>
      <div className="pt:0 sm:py-7.5 md:py-15">
        <section aria-label="Terms and Conditions">
          <div className="mb-5 md:mb-10 banner-container">
            <div className="h-[160px] mb-5 overflow-hidden sm:h-64 md:h-[368px] md:mb-10 rounded-none sm:rounded-2xl md:rounded-4xl">
              <Img
                src={"/images/banner/terms-and-conditions.jpg"}
                alt=""
                className="object-cover w-full h-full transition duration-500 hover:scale-110"
              />
            </div>
          </div>
          <div className="container">
            <h1 className="mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">
              Terms and Conditions
            </h1>
            <p className="mb-8 text-sm md:text-lg text-neutral-800 md:mb-15">
              Use of this site is provided by Al-Ihsan Foundation International
              Limited is subject to the following Terms and Conditions. Your use
              constitutes acceptance of these Terms and Conditions as at the
              date of your first use of the site.
            </p>
            <h2 className="mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-5">
              What Information Do We Collect?
            </h2>
            <ul className="flex flex-col gap-3 mb-8 ml-4 text-sm leading-6 list-disc md:mb-15 md:gap-5 md:text-lg text-neutral-800">
              <li>
                Al-Ihsan Foundation reserves the right to change these Terms and
                Conditions at any time by posting changes online. Your continued
                use of this site after changes are posted constitutes your
                acceptance of this agreement as modified.{" "}
              </li>
              <li>
                You agree to use this site only for lawful purposes, and in a
                manner that does not infringe the rights, or restrict, or
                inhibit the use and enjoyment of the site by any third party.
              </li>
              <li>
                Al-Ihsan Foundation does not warrant that the functions
                contained in the material in this site will be uninterrupted or
                error-free, that defects will be corrected, or that this site
                and the server that makes it available are free of viruses, bugs
                or represents the full functionality, accuracy and reliability
                of the materials. Content
              </li>
              <li>
                Material on this site comes from a variety of sources and
                authors including staff members, volunteers, and supporters.
              </li>
              <li>
                This site and information, names, images, pictures, logos
                regarding or relating to Al-Ihsan Foundation are provided “as
                is”, without any representation or endorsement made and without
                warranty of any kind whether expressed or implied. To the
                maximum extent permitted by law Al-Ihsan Foundation will not be
                liable for any damages including, without limitation, indirect
                or consequential damages, or any damages whatsoever arising from
                the use or in connection with such use or loss of use of the
                site, whether in contract or in negligence or otherwise.
              </li>
              <li>
                Al-Ihsan Foundation strives to keep the information stored on
                this site up to date, but cannot guarantee that the information
                provided is completely accurate. Any mistakes that are brought
                to our attention will be corrected as soon as possible.{" "}
              </li>
              <li>
                Use of the material on this site for educational purposes is
                encouraged. Al-Ihsan Foundation gives permission for articles,
                illustrations and other materials to be reproduced for
                educational use and fundraising purposes or personal use,
                provided the information is not changed, and that the source is
                acknowledged appropriately. Use of material on this website for
                purposes other than educational or personal use must have prior
                authorization by Al-Ihsan Foundation.
              </li>
              <li>
                In some cases the copyright for text or images on this site may
                be held by someone other than Al-Ihsan Foundation. All rights
                are reserved on such material and permission to use them must be
                requested from the copyright owner. The source of any such
                material will be indicated on the relevant sections of the site,
                along with a more restrictive copyright notice.
              </li>
              <li>
                Commercial use or publication of all or any item displayed is
                strictly prohibited without prior authorization from Al-Ihsan
                Foundation. Nothing contained herein shall be construed as
                conferring any licensee by Al-Ihsan Foundation to use any item
                displayed. Links
              </li>
              <li>
                This site contains links to external web sites. Al-Ihsan
                Foundation takes no responsibility for the content of external
                internet sites, nor do links to such sites imply endorsement of
                the views expressed by the organizations or individuals
                responsible for them. External links are provided for
                sponsorship and informational purposes only.{" "}
              </li>
              <li>
                Al-Ihsan Foundation’s logo must not be downloaded, copied and/or
                used for any purpose without the permission of Al-Ihsan
                Foundation. Your information
              </li>
              <li>
                Please see the Privacy statement about how the information you
                provide will be used and stored.
              </li>
              <li>
                Any communication or material that you transmit to, or post on,
                any public area of the site including any data, questions,
                comments, suggestions, or the like, is, and will be treated as,
                non-confidential and non-proprietary information. General
              </li>
              <li>
                If there is any conflict between these Terms and Conditions and
                rules and/or specific terms of use appearing on this site
                relating to specific material then the latter shall prevail.
              </li>
              <li>
                These terms and conditions shall be governed and construed in
                accordance with the laws of New South Wales. Any disputes shall
                be subject to the exclusive jurisdiction of the Courts of New
                South Wales.
              </li>
              <li>
                Excess target funds received for campaigns will be forwarded to
                similar relief projects.
              </li>
              <li>
                If these Terms and Conditions are not accepted in full, the use
                of this site must be terminated immediately.
              </li>
            </ul>
            <h2 className="mb-3 text-heading-6 text-neutral-1000 md:text-heading-3 md:mb-4">
              Refund Policy
            </h2>
            <ul className="flex flex-col gap-3 mb-8 ml-4 text-sm leading-6 list-disc md:mb-15 md:gap-5 md:text-lg text-neutral-800">
              <li>
                As all contributions are in form of a donation, we are not
                usually able to give refunds for donations made through this
                site.{" "}
              </li>
              <li>
                Should a refund be issued, it is at Al-Ihsan Foundation’s
                discretion, and queries must be raised within 28 days of
                payment.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};
