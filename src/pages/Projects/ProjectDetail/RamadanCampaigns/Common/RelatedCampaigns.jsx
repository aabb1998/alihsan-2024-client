
import React  from 'react'
import { ArrowRightIcon } from '../../../../../theme/svg-icons'
import Img from '../../../../../components/Image'

export const RelatedCampaignsHotMeals = () => {
return (
    <RelatedCampaignsSection>
        <RelatedCampaignsCard Image="30.jpg" Title="Food Packs" />
        <RelatedCampaignsCard Image="27.jpg" Title="Eid Gifs" />
        <RelatedCampaignsCard Image="28.jpg" Title="Zakat Al-Fitr" />
        <RelatedCampaignsCard Image="29.jpg" Title="Zakat Al-Maal" />
    </RelatedCampaignsSection>
)
}

export const RelatedCampaignsFoodPacks= () => {
    return (
    <RelatedCampaignsSection>
        <RelatedCampaignsCard Image="26.jpg" Title="Hot Meals" />
        <RelatedCampaignsCard Image="27.jpg" Title="Eid Gifs" />
        <RelatedCampaignsCard Image="28.jpg" Title="Zakat Al-Fitr" />
        <RelatedCampaignsCard Image="29.jpg" Title="Zakat Al-Maal" />
    </RelatedCampaignsSection>
    )
}

export const RelatedCampaignsEidGifts= () => {
    return (
        <RelatedCampaignsSection>
            <RelatedCampaignsCard Image="26.jpg" Title="Hot Meals" />
            <RelatedCampaignsCard Image="30.jpg" Title="Food Packs" />
            <RelatedCampaignsCard Image="28.jpg" Title="Zakat Al-Fitr" />
            <RelatedCampaignsCard Image="29.jpg" Title="Zakat Al-Maal" />
        </RelatedCampaignsSection>
    )
}

export const RelatedCampaignsAlFitr= () => {
    return (
        <RelatedCampaignsSection>
            <RelatedCampaignsCard Image="26.jpg" Title="Hot Meals" />
            <RelatedCampaignsCard Image="30.jpg" Title="Food Packs" />
            <RelatedCampaignsCard Image="27.jpg" Title="Eid Gifs" />
            <RelatedCampaignsCard Image="29.jpg" Title="Zakat Al-Maal" />
        </RelatedCampaignsSection>
    )
}

export const RelatedCampaignsAlMaal= () => {
    return (
        <RelatedCampaignsSection>
            <RelatedCampaignsCard Image="26.jpg" Title="Hot Meals" />
            <RelatedCampaignsCard Image="30.jpg" Title="Food Packs" />
            <RelatedCampaignsCard Image="27.jpg" Title="Eid Gifs" />
            <RelatedCampaignsCard Image="28.jpg" Title="Zakat Al-Fitr" />
        </RelatedCampaignsSection>
    )
}

// card structure
export const RelatedCampaignsCard = ({ Image = '', Title = '', Description = 'Lorem ipsum dolor sit amet, nsectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet'  }) => {
    return (
        <div className="transition-all ease-in border rounded-xl bg-neutral-100 border-neutral-300 hover:border-neutral-100 focus:border-primary-300 hover:shadow-card">
            <div className="flex flex-col gap-5 p-5">
                <Img
                    src={`/images/banner/projects/${Image}`}
                    alt={`${Title}`}
                    className="rounded-xl"
                />
                <div>
                    <h3 className="mb-3 text-heading-7 sm:heading-6 line-clamp-1 text-neutral-800">{Title}</h3>
                    <p className="text-sm font-normal line-clamp-2">{Description}</p>
                </div>
                <button className="btn btn-primary filled">Donate Now</button>
            </div>
        </div>

    );
};


// Template Strauctre
export const RelatedCampaignsSection = ({ children }) => {
    return (
      <section aria-label="Related Campaigns">
        <div className="container">
          <h6 className="my-4 text-heading-7 md:mt-0">Related Campaigns</h6>
          <div className="grid gap-x-5 gap-y-7.5 sm:grid-cols-2 md:grid-cols-4">
            {children}
          </div>
          <div className="mt-5 sm:hidden">
            <button className="mx-auto btn btn-secondary-text">
              See All
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </section>
    );
  }